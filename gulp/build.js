'use strict';

var path = require('path'),
  gulp = require('gulp'),
  args = require('yargs').argv,

  $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del', 'run-sequence', 'lazypipe']
  }),

  packageObj = require('../package.json'),
  taskUtils = require('./_task-utils.js'),

  glob = require('glob'),
  conf = require('./config');


function createPartials(srcFiles, destFileName, title, destDir) {
    return gulp.src(srcFiles)
    .pipe($.size({ title: 'createPartials:' + title, showFiles: true }))
    .pipe($.htmlhint(conf.htmlhintrc))
    .pipe($.htmlhint.failReporter())
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache(destFileName, {
      module: 'careers',
      root: 'app'
    }))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/partials/', (destDir || ''))));
}
gulp.task('partials', function() {
  var merged = require('merge-stream')(),

    // unique list of tenants with html templates
    tenants = glob.sync(path.join(conf.paths.src, '/app/**/tenant/*'))
      .map(function(val) { return path.basename(val); })
      .sort().filter(function(el,i,a){ return i===a.indexOf(el); });

  // add all templates (except tenant specific) to template cache
  merged.add(createPartials([
      path.join(conf.paths.src, '/app/**/*.html'),
      path.join('!'+ conf.paths.src, '/app/**/tenant/*/*.html'),
      path.join(conf.paths.tmp, '/serve/app/**/*.html')
    ], 'templateCacheHtml.js', 'app'));

  // create tenant specific template cache file
  tenants.forEach(function(tenant) {
    merged.add(createPartials([path.join(conf.paths.src, '/app/**/tenant', tenant, '/*.html')],
      'tenantTemplateCache.js', tenant, '/tenant/' + tenant + '/js'));
  });

  return merged;
});

gulp.task('html', ['inject:dist', 'partials'], function() {
  var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), { read: false }),
    partialsInjectOptions = {
      starttag: '<!-- inject:partials -->',
      ignorePath: conf.paths.tmp + '/partials',
      addRootSlash: false
    },
    htmlFilter = $.filter('*.html'),
    jsFilter = $.filter('**/*.js'),
    cssFilter = $.filter('**/*.css'),

    merged = require('merge-stream')(),

    // css channel is re-used, leverage lazypipe
    cssChannel = $.lazypipe()
    .pipe($.replace, 'fonts/videogular', '../fonts/videogular') // fix videogular font paths
    .pipe($.sourcemaps.init)
    .pipe($.minifyCss, {processImport: false}) // do not handle @import's (renames fonts.googleapis.com to something else)
    .pipe($.sourcemaps.write, './')
    .pipe($.size, { title: 'css', showFiles: true }),

    assets;

  // handle index and all its assets
  merged.add(gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe(assets = $.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'))
    .pipe($.sourcemaps.init())
    .pipe($.ngAnnotate())
    .pipe($.uglify({
      preserveComments: $.uglifySaveLicense,
      mangle: false // disable manging for better UIError messaging until stacktrace-gps can guess function name better
    })).on('error', conf.errorHandler('Uglify'))
    .pipe($.sourcemaps.write('./'))
    .pipe($.size({ title: 'uglify', showFiles: true }))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe(cssChannel())
    .pipe(cssFilter.restore())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.minifyHtml({
          empty: true,
          spare: true,
          quotes: true,
          conditionals: true,
          ssi: true
        }))
    .pipe($.replace(/<link rel="stylesheet" href="styles\/app-\w+\.css">/, '<!--#include CONFIG-FILTER-REPLACE-TENANT-CSS-->'))
    ////TODO rename to app.css instead of index.css
    .pipe(htmlFilter.restore())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({ title: conf.paths.dist + '/', showFiles: true })));

  merged.add(gulp.src(path.join(conf.paths.tmp, '/serve/app/tenant/**/*.css'))
    .pipe(cssChannel())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/tenant/')))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/content/tenant/')))
    .pipe($.size({ title: conf.paths.dist + '/tenant/', showFiles: true })));

  return merged;
});

// Only applies for fonts from bower dependencies
// (manual inclusion of bootstrap since it's a bower dev dependency)
// Custom fonts are handled by the "other" task
gulp.task('copy:fonts', function() {
  return gulp.src($.mainBowerFiles())
    .pipe($.if('**/*.{eot,svg,ttf,woff,woff2}', gulp.dest(path.join(conf.paths.dist,'/fonts/'))))
    .pipe($.if('**/*.{eot,svg,ttf,woff,woff2}', gulp.dest(path.join(conf.paths.dist,'/content/fonts/'))));
});

gulp.task('copy:tenant-js', function() {
  return gulp.src(path.join(conf.paths.tmp, '/partials/tenant/**/*.js'))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/tenant/')))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/content/tenant/')))
    .pipe($.size({ title: 'tenant-js', showFiles: true }));
});

gulp.task('copy:other', function() {
  return gulp.src([
      path.join(conf.paths.src, '/**/*'),
      path.join('!' + conf.paths.src , '/**/*.{html,css,js,scss}')
    ])
    .pipe($.if({isFile:true}, gulp.dest(path.join(conf.paths.dist, '/'))))
    .pipe($.if({isFile:true}, gulp.dest(path.join(conf.paths.dist, '/content/'))));
});

// generate apti status
gulp.task('apti-status', function() {
  // token values to be used for replacements
  var tokenVals = {
    appVersion: packageObj.version,
    appArtifact: taskUtils.getWarName(),
    appDisplayName: conf.build.displayName
  };
  // add select values from the environment
  Object.keys(process.env).filter(function(k) {
    return /^(SVN|JENKINS|BUILD|GIT|git)/.test(k);
  }).forEach(function(k) {
    tokenVals[k] = process.env[k];
  });

  // function that will replace tokens using tokenVals
  function replaceTokens(val) {
    var token = val.replace(/^@@(.*)@@$/, '$1');
    if (tokenVals[token] !== undefined) {
      // console.log('token match', token, tokenVals[token]);
      return tokenVals[token];
    } else {
      // console.log('token not found', token);
      return val;
    }
  }

  $.util.log('apti-status - replacement data', JSON.stringify(tokenVals));

  return gulp.src(path.join(conf.paths.src, '/apti/status'), { base: conf.paths.src })
    .pipe($.replace(/@@[\w\-]+@@/g, replaceTokens))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({ title: 'template', showFiles: true }));
});

gulp.task('copy:sprite', function() {
  return gulp.src(path.join(conf.paths.tmp, '/serve/assets/**/*'), { base: conf.paths.tmp + '/serve' })
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({ title: 'copy:sprite', showFiles: true }));
});

// copy java libraries from assembled war in configServletFilter
// used later in war step
gulp.task('copy:libs', function() {
  return gulp.src([
      path.join(conf.build.copyLibsBase, '/WEB-INF/lib/*'),
      path.join(conf.build.copyLibsBase, '/WEB-INF/classes/logback.xml')
    ], { base: conf.build.copyLibsBase })
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({ title: 'copy:libs', showFiles: true }));
});

gulp.task('clean:dist', $.del.bind(null, [path.join(conf.paths.dist, '/')]));

gulp.task('clean:tmp', $.del.bind(null, [path.join(conf.paths.tmp, '/')]));

gulp.task('clean', ['clean:tmp', 'clean:dist']);

// create jsp by copying index.html
gulp.task('create:jsp', function() {
  return gulp.src(path.join(conf.paths.dist, '/index.html'))
    .pipe($.replace('<!doctype html>', '<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>\n<!doctype html>'))
    .pipe($.rename('index.jsp'))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({ title: 'create:jsp', showFiles: true }));
});

// assemble war, enabling ConfigFilter in configServletFilter
gulp.task('war', function() {
  var tenant = args.tenant || conf.tenant;

  return gulp.src(path.join(conf.paths.dist, '/**/*'))
    .pipe($.war({
      welcome: 'index.jsp',
      displayName: conf.build.displayName,
      webappExtras: [
        function() {
          return '<filter>\n' +
            '<filter-name>ConfigFilter</filter-name>\n' +
            '<filter-class>com.aptimus.careers.filters.ConfigFilter</filter-class>\n' +
            '<init-param>\n' +
            '  <param-name>tenantId</param-name>\n' +
            '  <param-value>' + tenant + '</param-value>\n' +
            '</init-param>\n' +
            // '<init-param>\n' +
            // '  <param-name>configServiceBaseUrlOverride</param-name>\n' +
            // '  <param-value>https://careerguidance.devint.aptimus.net</param-value>\n' +
            // '</init-param>\n' +
            '</filter>\n' +
            '<filter-mapping>\n' +
            '  <filter-name>ConfigFilter</filter-name>\n' +
            '  <url-pattern>/index.jsp</url-pattern>\n' +
            '</filter-mapping>\n'
            ;
        }
      ]
    }))
    .pipe($.size({ title: 'zip', showFiles: true }))
    .pipe($.zip(taskUtils.getWarName()))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({ title: 'war', showFiles: true }));
});

gulp.task('build', function() {
  return $.runSequence(
    'clean',
    ['html', 'copy:fonts', 'copy:other'],
    ['apti-status', 'copy:tenant-js', 'copy:sprite', 'copy:libs', 'create:jsp']
  );
});

gulp.task('testAndBuild', function() {
  return $.runSequence(
    ['clean', 'scripts:failOnError'],
    'test', ['html', 'copy:fonts', 'copy:other'],
    ['apti-status', 'copy:tenant-js', 'copy:sprite', 'copy:libs', 'create:jsp'],
    'war'
  );
});
