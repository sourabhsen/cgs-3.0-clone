'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['karma']
});

function runTests(singleRun, done) {
  new $.karma.Server({
    configFile: __dirname + '/../karma.conf.js',
    singleRun: singleRun,
    autoWatch: !singleRun
  }, done).start();
}

// do not run scripts dependency
gulp.task('test', ['config:tenant', 'config:uiTenant'], function(done) {
  runTests(true, done);
});
gulp.task('test:watch', ['scripts'], function(done) {
  runTests(true, done);
});
gulp.task('test:auto', ['watch'], function(done) {
  runTests(false, done);
});
