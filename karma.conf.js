'use strict';

var path = require('path'),
  conf = require('./gulp/config'),
  wiredep = require('wiredep');


function listFiles() {
  var wiredepOptions = Object.assign({}, conf.wiredep, {
    dependencies: true,
    devDependencies: true
  });

  return wiredep(wiredepOptions).js
    .concat([
      path.join(conf.paths.src, '/app/**/*.js'),
      path.join(conf.paths.tmp, '/serve/app/**/*.js'),
      path.join(conf.paths.src, '/**/*.spec.js'),
      // path.join(conf.paths.src, '/**/*.mock.js'),
      path.join(conf.paths.src, '/**/*.html'),
      path.join(conf.paths.src, '/assets/json/**/*.json')
    ]);
}

module.exports = function(config) {

  var configuration = {
    files: listFiles(),

    singleRun: true,

    autoWatch: false,

    frameworks: ['jasmine', 'angular-filesort'],

    angularFilesort: {
      whitelist: [path.join(conf.paths.src, '/**/!(*.html|*.spec|*.mock).js')]
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/',
      // moduleName: 'careers',
      // cacheIdFromPath: function(filepath) {
      //   var newPath = filepath.replace('src/', '');
      //   console.log('html2JS', newPath);
      //   return newPath;
      // }
    },

    ngJson2JsPreprocessor: {
      // strip this from the file path
      // stripPrefix: 'src/assets/json/',
      // prepend this to the
      // prependPrefix: 'assets/',

      // or define a custom transform function
      cacheIdFromPath: function(filepath) {
        // console.log('json2js', filepath);
        return filepath;
      },
    },

    browsers : ['PhantomJS'],

    // plugins : [
    //   'karma-phantomjs-launcher',
    //   'karma-angular-filesort',
    //   'karma-jasmine',
    //   'karma-ng-html2js-preprocessor'
    // ],

    preprocessors: {
      'src/**/*.html': 'ng-html2js',
      'src/assets/**/*.json': 'ng-json2js',

      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'src/**/!(*.spec.js|*.html)': 'coverage'
    },

    // failure after no activity in browser
    browserNoActivityTimeout: 30000,

    // Report test that are slower than timeout period (60000)
    reportSlowerThan: 500,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // coverage reporter generates the coverage
    reporters: [ /*'progress',*/ 'spec', 'coverage'],

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
      }, {
        type: 'cobertura',
        dir: './coverage/',
        file: 'coverage.xml'
      }]
    }
  };

  // This block is needed to execute Chrome on Travis
  // If you ever plan to use Chrome and Travis, you can keep it
  // If not, you can safely remove it
  // https://github.com/karma-runner/karma/issues/1144#issuecomment-53633076
  if(configuration.browsers[0] === 'Chrome' && process.env.TRAVIS) {
    configuration.customLaunchers = {
      'chrome-travis-ci': {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    };
    configuration.browsers = ['chrome-travis-ci'];
  }

  config.set(configuration);
};
