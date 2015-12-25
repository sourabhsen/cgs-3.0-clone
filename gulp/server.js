'use strict';

var gulp = require('gulp'),
  path = require('path'),

  $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'browser-sync', 'browser-sync-spa', 'http-proxy-middleware']
  }),

  args = require('yargs').argv,

  util = require('util'),
  gutil = require('gulp-util'),
  taskUtils = require('./_task-utils.js'),

  conf = require('./config');


function browserSyncInit(baseDir, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if(baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    };
  }

  var server = {
    baseDir: baseDir,
    routes: routes
  };

  var middlwareOpts = {target: taskUtils.getProxyTarget(), changeOrigin: true, secure: false};
   if (args.verbose) {
     middlwareOpts.onProxyRes = function(proxyRes/*, req, res*/) {
      // gutil.log(gutil.colors.magenta('Request'), req);
       gutil.log(gutil.colors.magenta('Response headers'), JSON.stringify(proxyRes.headers, true, 2));
     };
   }
  server.middleware = $.httpProxyMiddleware('/api', middlwareOpts);

  $.browserSync.use($.browserSyncSpa({
    selector: '[ng-app]'// Only needed for angular apps
  }));

  $.browserSync.instance = $.browserSync.init({
    startPath: '/',
    server: server,
    browser: browser
  });
}

gulp.task('serve', ['watch'], function () {
  browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
});

gulp.task('serve:dist', ['build'], function () {
  browserSyncInit(conf.paths.dist);
});

gulp.task('serve:e2e', ['inject'], function () {
  browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src], []);
});

gulp.task('serve:e2e-dist', ['build'], function () {
  browserSyncInit(conf.paths.dist, []);
});

