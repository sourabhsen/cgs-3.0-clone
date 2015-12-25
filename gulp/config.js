/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

var gutil = require('gulp-util');

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e',
  report: 'report'
};

/**
 *  Default tenant (service tenant) and ui tenant (ui only)
 */
exports.tenant = 'cgsdemo';
exports.uiTenant = 'cgsdemo';

/**
 *  Options for CSS autoprefixer - controls which browsers
 *  to add compatibility prefixers for
 */
exports.autoprefixer = ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'ie >= 9'];

/**
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */
exports.wiredep = {
  exclude: [/bootstrap-sass-official\/.*\.js/, /\/bootstrap\.js/, /bootstrap\.css/],
  directory: 'bower_components'
};

/**
 *  Build options used in build task
 */
exports.build = {
  displayName: 'Career Guidance System',
  copyLibsBase: 'configServletFilter/war/target/configServletFilterWar-1.0-SNAPSHOT'
};


/**
 *  The htmlhint recipe file used with htmlhint
 */
exports.htmlhintrc = '.htmlhintrc';

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
  'use strict';

  return function(err) {
    var pluginErr = new gutil.PluginError(title, err, {showStack: true});
    gutil.log(pluginErr.toString());
    this.emit('end');
  };
};
