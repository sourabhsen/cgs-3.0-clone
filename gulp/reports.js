'use strict';

var gulp = require('gulp');

  /**
   * Start Plato inspector and visualizer
   */
  function startPlatoVisualizer(done) {
  var path = require('path'),
    glob = require('glob'),
    gutil = require('gulp-util'),
    conf = require('./config');

    var files = glob.sync(path.join(conf.paths.src, '/app/**/*.js')),
      excludeFiles = /.*\.spec\.js/,
      plato = require('plato');

    var platoOptions = {
      title: 'Plato Inspections Report',
      exclude: excludeFiles
    };
    var outputDir = path.join(conf.paths.report, '/plato');

    gutil.log('input files', files);

    function platoCompleted(report) {
      var overview = plato.getOverviewReport(report);
      // if (args.verbose) {
      //   log(overview.summary);
      // }
      gutil.log(overview.summary);
      if (done) {
        done();
      }
    }

    plato.inspect(files, outputDir, platoOptions, platoCompleted);
  }

  gulp.task('plato', function(done) {
    startPlatoVisualizer(done);
  });

