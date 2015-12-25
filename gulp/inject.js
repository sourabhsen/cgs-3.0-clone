'use strict';

var path = require('path'),
  gulp = require('gulp'),

  $ = require('gulp-load-plugins')(),
  wiredep = require('wiredep').stream,

  args = require('yargs').argv,
  taskUtils = require('./_task-utils.js'),

  conf = require('./config');

gulp.task('config:uiTenant', function() {
  var uiTenant = args.uiTenant || args.tenant || conf.uiTenant,
    moduleStr = 'angular.module(\'config.uiTenant\', []).constant(\'uiTenant\', \'' +
    uiTenant + '\');';
  $.util.log('UI Tenant', $.util.colors.magenta(uiTenant));
  return taskUtils.getSrcFromString('config-uiTenant.spec.js', moduleStr)
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/components/config')));
});

gulp.task('config:tenant', function() {
  var tenant = args.tenant || conf.tenant,
    moduleStr = 'angular.module(\'config.tenant\', []).constant(\'tenant\', \'' +
    tenant + '\');';
  $.util.log('Tenant', $.util.colors.magenta(tenant));
  return taskUtils.getSrcFromString('config-tenant.spec.js', moduleStr)
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/components/config')));
});

function injectFiles(replaceTenantTokens) {
  var tenant = args.tenant || conf.tenant,
     uiTenant = args.uiTenant || args.tenant || conf.uiTenant,
    injectStyles = gulp.src([
      path.join(conf.paths.tmp, '/serve/app/*.css'),
      path.join('!' + conf.paths.tmp, '/serve/app/vendor.css')
    ], {
      read: false
    });

  var injectScripts = gulp.src([
      path.join(conf.paths.src, '/app/**/*.js'),
      path.join(conf.paths.tmp, '/serve/app/**/*.js'),
      path.join('!' + conf.paths.src, '/app/**/*.spec.js'),
      path.join('!' + conf.paths.src, '/app/**/*.mock.js')
    ])
    .pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

  var injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false
  };

  return gulp.src(conf.paths.src + '/index.html')
    .pipe($.if(replaceTenantTokens, $.replace('@@tenant@@', tenant)))
    .pipe($.if(replaceTenantTokens, $.replace('@@uiTenant@@', uiTenant)))
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(Object.assign({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
}

gulp.task('inject', ['scripts', 'styles', 'config:tenant', 'config:uiTenant'], function() { return injectFiles(true); });
gulp.task('inject:dist', ['scripts', 'styles:dist'], function() { return injectFiles(); });
