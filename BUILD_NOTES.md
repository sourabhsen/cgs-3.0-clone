
# Build Notes

`cgs-angular` uses [gulp](http://gulpjs.com/) for its for its task/workflow runner. The gulp files are based on the yeoman [generator-gulp-webapp](https://github.com/Swiip/generator-gulp-angular).  Consult the documentation there for a general overview, especially:
* [User Guide](https://github.com/Swiip/generator-gulp-angular/blob/master/docs/user-guide.md)
* [How It Works](https://github.com/Swiip/generator-gulp-angular/blob/master/docs/how-it-works.md)


## Jenkins Build Procedure
The devint Jenkins instance builds the .war that is used all deployment tiers. Notable tasks in the Jenkins pipeline are:

* [guidance-ui-git-angular-build](https://jenkins-devint.corp-or.aptimus.net:8443/view/guidance-ui/job/guidance-ui-git-angular-build/) - This task checks out the latest code from git and the latest deployment WAR by running the following commands: 
```sh
npm install
gulp testAndBuild
```
The gulp task `testAndBuild` runs the unit tests and assembles the war asset.  During this war assembly, it performs multiple [optimizations](https://github.com/Swiip/generator-gulp-angular/blob/master/docs/user-guide.md#optimization-process) to the webapp, such as: minifying the javascript using [Uglify](https://github.com/mishoo/UglifyJS2), minifying the CSS using [clean-css](https://github.com/jakubpawlowicz/clean-css), and minifying all HTML partials and putting them pro-actively in Javascript using [gulp-angular-templatecache](https://github.com/miickel/gulp-angular-templatecache).  

* [guidance-ui-git-angular-nexus-upload](https://jenkins-devint.corp-or.aptimus.net:8443/view/guidance-ui/job/guidance-ui-git-angular-nexus-upload/) - Uploads the war asset assembled by guidance-ui-git-angular-build to the [Nexus Repository (aptimus-ci-commit)](https://nexus.corp.aptimus.net/content/repositories/aptimus-ci-commit/com/aptimus/careers/guidance-ui/)

* [guidance-ui-devint-git-angular-deploy-v1](https://jenkins-devint.corp-or.aptimus.net:8443/view/guidance-ui/job/guidance-ui-devint-git-angular-deploy-v1/) - Deploys the latest WAR to the deployment nodes.  The deployment process will deploy the WAR on each instance of tomcat (e.g. guidance01.devint.aptimus.net and guidance02.devint.aptimus.net), restart tomcat, and then pull the /apti/status page (e.g [guidance01.devint.aptimus.net status](http://guidance01.devint.aptimus.net:8080/guidance-ui/1/apti/status)) to verify the deployed asset is deployed and current.

* [guidance-ui-devint-git-angular-acceptance](https://jenkins-devint.corp-or.aptimus.net:8443/view/guidance-ui/job/guidance-ui-devint-git-angular-acceptance/) - runs the acceptance tests in the selenium directory.

* [guidance-ui-certify](https://jenkins-devint.corp-or.aptimus.net:8443/view/guidance-ui/job/guidance-ui-certify/) - Certifies the build if all previous steps succeeded.

All additional environments (QA, pre-prod, prod) simply take the latest certified build asset from the prior tier and deploy it. So if guidance-ui version 0.0.1-3297 is the latest certified in devint, QA will take that and deploy it.

## Deployment Architecture

The assembled WAR is simple web app (bundled HTML, CSS, javascript, fonts, images, etc) enhanced by the `configServletFilter` Java Servlet Filter. The `configServletFilter` intercepts requests to index.jsp (simply a copy of index.html) and makes replacements for dynamic tenants.

## Dynamic Tenants

The `cgs-angular` webapp is architected to support multiple tenants in a single webapp.  For example, [UOPX](https://uopx.careerguidance.devint.aptimus.net/) or our default [cgs-demo](careerguidance.devint.aptimus.net) tenants.  Most of this work is done by the `configServletFilter`.  When assembling the war, the following tenant directories are included:
* `tenant` - this contains the tenant specific HTML templates (any file with the path tenant/[tenant]/*.html) compiled into javascript via [gulp-angular-templatecache](https://github.com/miickel/gulp-angular-templatecache), and the compiled CSS for that tenant.
A sample of the directory listing is:
```
tenant/uopx/js/tenantTemplateCache.js
tenant/uopx/styles/index.css
tenant/uopx/styles/index.css.map
```
* `content` - this contains all of the tenant code, such as tenant CSS, compiled HTML templates, and all fonts and images. This content folder is only used when the tenant content is deployed to S3.

### configServletFilter
The `configServletFilter` Java Servlet Filter performs dynamic replacements in the index.jsp based upon the request hostname or the tenant query parameter. It performs the following:

1. On startup, retrieves the tenant configuration at https://developer.devint.aptimus.net/api/utility/2/apti/config/app/cgs/module/domains. One sample entry is:
```
"uopx": {
    "domain": "uopx.careerguidance.devint.aptimus.net",
    "tenant": "uopx",
    "uiTenant": "uopx"
  },
```
    * The key for this domain is `uopx`, which means you could obtain this tenant by using the `tenant` query parameter, e.g. https://careerguidance.devint.aptimus.net/?tenant=uopx#/.  
    * The domain specifies which request domain this should resolve to, in this case https://uopx.careerguidance.devint.aptimus.net/.  
    * The tenant is the service tenant, that is used in all calls to services.  For example, `uopx` is the tenant for the url `/api/authentication-service/2/uopx/user/info?createAnonymousProfile=true`.
    * The uiTenant is the UI tenant, which is where the UI pulls its dynamic header, footers, etc.
2. For each tenant in the tenant configureation, the configuration is retrieved and cached from /api/utility/TENANT_KEY/config/app/cgs/module/main (e.g. for uopx https://developer.devint.aptimus.net/api/utility/2/uopx/config/app/cgs/module/main)
3. When an incoming request comes in, the configuration is obtained based upon the query parameter tenant or the domain name.  With this new configuration, the following replacements are made in the index.jsp:
    * The string `<!--#include CONFIG-FILTER-REPLACE-TENANT-CSS-->` is replaced with `<link rel=\"stylesheet\" href=\"[CDN]/tenant/[TENANT]/styles/index.css\">`, where `[CDN]` is replaced by `CONFIG.tenantCdnUrl` in the tenant configuration, and `[TENANT]` with the tenant.  The net result is the tenant CSS will be included.  If no `CONFIG.tenantCdnUrl` is specified, it will be pulled from the WAR, otherwise it will be pulled from the CDN (in our case S3).
    * The string `<!--#include CONFIG-FILTER-REPLACE-TENANT-JS-->"` is replaced with `<script src=\"[CDN]/tenant/[TENANT]/js/tenantTemplateCache.js\"></script>`, where `[CDN]` is replaced by `CONFIG.tenantCdnUrl` in the tenant configuration, and `[TENANT]` with the tenant.  The net result is the tenant HTML templates (in compiled javascript) will be included.  If no `CONFIG.tenantCdnUrl` is specified, it will be pulled from the WAR, otherwise it will be pulled from the CDN (in our case S3).
    * The code between `/* BEGIN-CONFIG-FILTER-REPLACE */` and `/* END-CONFIG-FILTER-REPLACE */` is replaced with `['$q', function($q) { return $q.when([CONFIG]);}]`, where `[CONFIG]` is replaced by the JSON configuration object previously cached.  The net result is that the Angular value `CONFIG` is available to the app with the complete configuration from the config service.  This allows the developer to use configuration values such as `CONFIG.config.savedGoalLimit` throughout the app.  The CONFIG object is created by leveraging the [angular-deferred-bootstrap](https://github.com/philippd/angular-deferred-bootstrap) package.
    * The tokens `@@tenant@@` and `@@uiTenant@@` are replaced. The net result is that the Angular constants are updated:
    ```javascript
    angular.module('config.tenant', []).constant('uiTenant', '@@uiTenant@@');
    angular.module('config.uiTenant', []).constant('tenant', '@@tenant@@');
    ```
    * The string `<!--#include CONFIG-FILTER-REPLACE-TRACKING-URL-->` is replaced with `<script src=\"[URL]\"></script>` where `[URL]` is `CONFIG.tracking.url` from the tenant configuration. This replacement only happens if the configuration token is defined.  The provides the Analytics javascript include.
    * The string `<script type=\"text/javascript\">[CODE]</script>` is replaced with `<script src=\"[URL]\"></script>` where `[CODE]` is `CONFIG.tracking.inline` from the tenant configuration. This replacement only happens if the configuration token is defined.  The provides the Analytics javascript inline script executation capability that starts Analytics.
  
The tenant configuration is cached for 60 minutes.  To refresh it on request, add the `refreshConfig=true` query parameters.

### Updating Tenant Code
The dynamic tennat architecture allows create a new tenant or update existing tenant code without performing a full code deployment. This is done by a enabling the tenant CDN in your configuration and deploying the content to the CDN (S3).

To enable the tenant CDN, simply update the token `CONFIG.tenantCdnUrl` in the tenant configuration at https://developer.devint.aptimus.net/api/utility/2/TENANT/config/app/cgs/module/main.

To upload to S3, perform the following procedure:
1. `ssh subversion01.corp.aptimus.net`
2. Execute `gendeploy`
3. Select option 3, careersguidances3
4. Follow the steps in the menu.  You’ll need the version guidance-ui build, which is shown throughout the pipeline.  The console logs show it in the build step (e.g.  0.0.1-2960 from guidance-ui-0.0.1-2960.war).  You can find the build version in the console log in the build (e.g. https://jenkins-devint.corp-or.aptimus.net:8443/view/guidance-ui/job/guidance-ui-git-angular-build/1732/console).  Another spot to easily see the version is the Build Parameters of any step after the build (e.g. https://jenkins-devint.corp-or.aptimus.net:8443/view/guidance-ui/job/guidance-ui-git-angular-nexus-upload/340/parameters/?).


