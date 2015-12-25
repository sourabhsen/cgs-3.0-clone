'use strict';

var path = require('path'),
  wiredep = require('wiredep'),
  deps = {
    exclude: [/bootstrap-sass-official\/.*\.js/, /bootstrap\.css/],
    directory: 'bower_components'
  };

function listFiles() {
  var wiredepOptions = Object.assign({}, deps, {
    dependencies: true,
    devDependencies: true
  });

  return wiredep(wiredepOptions).js
    .concat([
      'dist/apollo-angular-resume-builder.js',
      'dist/resume-builder-tpls.js',
      'src/**/*.spec.js',
      'test/**/*.js'
    ]);
}


module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'angular-filesort'],

    // list of files / patterns to load in the browser
    files: listFiles(),

    angularFilesort: {
      whitelist: [path.join('src', '/**/!(*.html|*.spec|*.mock).js')]
    },

    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // eg. usage for converting typescript files to js files for testing.
      // '**/*.ts': 'typescript'
      //'src/**/!(*.spec.js|*.html)': 'coverage',
      'dist/**/!(*.spec.js|*.html|*.min.js)': 'coverage'
    },


    // failure after no activity in browser
    browserNoActivityTimeout: 30000,

    // Report test that are slower than timeout period (60000)
    reportSlowerThan: 500,


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [/*'progress', */'spec', 'coverage'],


    // optionally, configure the reporter
    coverageReporter: {
      // Reports are available in the following formats:
      // html - produces a bunch of HTML files with annotated source code
      // cobertura - produces a cobertura-coverage.xml file for easy Hudson integration
      // text-summary - produces a compact text summary of coverage, typically to console
      // text - produces a detailed text table with coverage for all files
      // teamcity - produces service messages to report code coverage to TeamCity
      // clover - produces a clover.xml file to integrate with Atlassian Clover
      reporters: [{
        type: 'html',
        dir: './coverage/'
      }, {
        type: 'text',
        dir: './coverage/'
      }],
      includeAllSources: true
      //watermarks: {
      //  statements: [ 50, 75 ],
      //  functions: [ 50, 75 ],
      //  branches: [ 50, 75 ],
      //  lines: [ 50, 75 ]
      //}
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      'PhantomJS'
      //, 'Chrome'
    ],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
