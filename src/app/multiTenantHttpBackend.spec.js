/**
 * @name multiTenantHttpBackend
 *
 * @description
 * Monkey-patched multi-tenant mock $httpBackend.
 *
 * If your input url for $htppBackend.when/$httpBackend.get is a string and
 * contains the default tenant (e.g. uopx) or the string [TENANT], it will be replaced
 * with the current tenant configured in the tenant constant (generated at runtime).
 *
 * If your input url is a regexp, a warning will output if the default tenatn is found
 *
 * Simply include this module in your test specification to handle handle URLs in a multi-tenant manner, e.g.
 *   beforeEach(function() {
 *     module('multiTenantHttpBackend');
 *     module('YOUR_TEST_MODULE');
 *   });
 *
 */

(function() {
  'use strict';

  var defaultTenant = 'cgsdemo',
    defaultTenantPathRE = new RegExp('\\/' + defaultTenant + '\\/'),
    tenantTokenRE = new RegExp(/\[TENANT\]/, 'g'),
    tenant,
    tenantPath;

  // for any URL spec (e.g. $httpBackend.whenGET(URL), replace default tenant
  // with the config tenant for any strings
  // for any regexp, warn the user if the default tenant is found
  function replaceTenantInUrl(url) {
    var newUrl;
    if (angular.isString(url)) {
      newUrl = url.replace(defaultTenantPathRE, tenantPath).replace(tenantTokenRE, tenant);
      // console.debug('url replaced, old', url, 'new', newUrl, 'tenant', tenant);
    } else if (angular.isRegExp(url)) {
      if (defaultTenantPathRE.test(url.toString())) {
        console.warn('$httpBackend URL specification RegExp contains hardcoded tenant', defaultTenant, '-- be sure to change for multi-tenant tests: ', url.toString());
      }
      newUrl = url;
    } else {
      newUrl = url;
    }
    return newUrl;

  }

  function multiTenantBackendDecorator($delegate, $injector) {
    tenant = tenant || $injector.get('tenant');
    tenantPath = tenantPath || '/' + tenant + '/';

    var $mockBackend = $delegate;


    // monkey patch when
    $mockBackend._when = $mockBackend.when;
    $mockBackend.when = function(method, url, data, headers) {
      var newUrl = replaceTenantInUrl(url);

      // console.log('multiTenantTest when', $mockBackend.when);
      return $mockBackend._when(method, newUrl, data, headers);
    };

    // monkey patch expect
    $mockBackend._expect = $mockBackend.expect;
    $mockBackend.expect = function(method, url, data, headers) {
      var newUrl = replaceTenantInUrl(url);

      // console.log('in monkey patched expect', tenant);
      return $mockBackend._expect(method, newUrl, data, headers);
    };
    return $delegate;
  }

  // we want to use $httpBackend mock
  angular.module('multiTenantHttpBackend', [
    'config.tenant',
    'config.constants',
    'apolloAngularResumeServices.config',
    'apolloJobServices.config',
    'labormarketServices.config',
    'apolloSurveyServices.config'
  ])

  // monkey-patch $httpBackend when/get methods to use multiTenantBackendDecorator
  .config(['$provide',
    'tenant',
    'CONSTANTSProvider',
    function($provide, tenant, CONSTANTSProvider) {
      $provide.decorator('$httpBackend', ['$delegate', '$injector', multiTenantBackendDecorator]);

      // set the tenant constant from config.tenant
      CONSTANTSProvider.setConstant('tenant', tenant);
    }
  ])


  // change tenant on all services
  .run(['tenant',
    'apolloAngularResumeServices.config',
    'apolloJobServices.config',
    'labormarketServices.config',
    'apolloSurveyServices.config',
    function(tenant, resumeServicesConfig, jobServicesConfig, labormarketServicesConfig, apolloSurveyServicesConfig) {
      // console.debug('changing services tenant to', tenant);
      // set tenant on services
      resumeServicesConfig.tenant = jobServicesConfig.tenant = labormarketServicesConfig.tenant = apolloSurveyServicesConfig.tenant = tenant;

    }
  ]);

})();
