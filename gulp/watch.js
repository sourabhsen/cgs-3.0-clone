'use strict';

var gulp = require('gulp'),
  // path = require('path'),
  taskUtils = require('./_task-utils.js'),
  conf = require('./config');

function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('watch', ['inject'], function() {

  gulp.watch([conf.paths.src + '/*.html', 'bower.json'], {
    interval: 2000,
    name: 'main-html'
  }, ['inject']);

  gulp.watch(conf.paths.src + '/app/**/*.scss', {
    interval: 500,
    name: 'styles'
  }, function(event) {
    if (isOnlyChange(event)) {
      gulp.start('styles:watch');
    } else {
      gulp.start('inject');
    }
  });

  gulp.watch(conf.paths.src + '/app/**/!(*.spec)*.js', {
    interval: 500,
    name: 'scripts'
  }, function(event) {
    if (isOnlyChange(event)) {
      taskUtils.checkScripts(event.path);
    } else {
      gulp.start('inject');
    }
  });

  gulp.watch(conf.paths.src + '/app/**/*.spec.js', {
    interval: 500,
    name: 'test'
  }, ['test:watch']);

  gulp.watch(conf.paths.src + '/app/**/*.html', {
    interval: 500,
    name: 'html'
  }, function(event) {
    taskUtils.checkHtml(event.path, conf.htmlhintrc);
  });

  // let karma handle watching unit tests (refer to unit-tests.js)
  // gulp.watch does not play nicely with karma
  // gulp.start('test:watch');
});
