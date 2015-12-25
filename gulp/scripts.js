'use strict';

var gulp = require('gulp'),
  path = require('path'),
  taskUtils = require('./_task-utils.js'),
  conf = require('./config');


gulp.task('scripts', function() {
  return taskUtils.checkScripts(path.join(conf.paths.src, '/app/**/*.js'));
});

gulp.task('scripts:failOnError', function() {
  return taskUtils.checkScripts(path.join(conf.paths.src, '/app/**/*.js'), true);
});
