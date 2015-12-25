'use strict';

var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  args = require('yargs').argv,
  gutil = require('gulp-util'),
  conf = require('./config'),

 $ = require('gulp-load-plugins')();

function checkScripts(files, shouldFail) {
  return gulp.src(files)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
    .pipe($.if(shouldFail, $.jshint.reporter('fail')))
    .pipe(browserSync.reload({
      stream: true 
    }))
    .pipe($.size());
}

function checkHtml(files, htmlhintrc, shouldFail) {
  return gulp.src(files)
    .pipe($.htmlhint(htmlhintrc))
    .pipe(shouldFail ? $.htmlhint.failReporter() : $.htmlhint.reporter())
    .pipe(browserSync.reload({
      stream: true 
    }))
    .pipe($.size());
}

// get proxy target using env arg, e.g. `gulp --env=qa serve` for QA
function getProxyTarget() {
  if (args.env === 'prod') {
    return 'https://developer.aptimus.com';
  } else {
    return 'https://careerguidance.' + (args.env || 'devint') + '.aptimus.net';
  }
}

// get proxy target using env arg, e.g. `gulp --env=qa serve` for QA
function getWarName() {
  var tenant = args.tenant || conf.tenant;
  switch (tenant) {
    case 'cgsdemo':
      return 'guidance-ui.war';
    case 'west':
      return 'west-careers-v3.war';
    default:
      return tenant + '-ui.war';
  }
}

// get source stream from string
function getSrcFromString(filename, string) {
  var src = require('stream').Readable({
    objectMode: true
  });
  src._read = function() {
    this.push(new gutil.File({
      cwd: '',
      base: '',
      path: filename,
      contents: new Buffer(string)
    }));
    this.push(null);
  };
  return src;
}

module.exports = {
  checkScripts: checkScripts,
  checkHtml: checkHtml,
  getProxyTarget: getProxyTarget,
  getSrcFromString: getSrcFromString,
  getWarName: getWarName
};
