'use strict';

var gulp = require('gulp'),
  path = require('path'),
  args = require('yargs').argv,

  $ = require('gulp-load-plugins')({
    pattern: ['gulp*', 'main-bower-files', 'browser-sync', 'lazypipe']
  }),

  glob = require('glob'),
  conf = require('./config'),
  wiredep = require('wiredep').stream;


gulp.task('sprite', function() {
  var spriteData = gulp.src(path.join(conf.paths.src, '/assets/images/to-sprite/icons-all/*.{png,jpg,jpeg,gif}'))
    .pipe($.newer(path.join(conf.paths.tmp, '/serve/assets/images/sprites/sprite.png'))) // checks if src is newer (at least one src file) than generated spritesheet
    .pipe($.spritesmith({
      imgPath: '/assets/images/sprites/sprite.png',
      imgName: 'sprite.png',
      retinaSrcFilter: [conf.paths.src + '/assets/images/to-sprite/icons-all/*-ret.{png,jpg,jpeg,gif}'],
      retinaImgName: 'sprite-2x.png',
      cssName: '_sprite-generated.scss',
      cssFormat: 'css',
      padding: 2
    }));

  // Pipe image stream through image optimizer and onto disk
  spriteData.img
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/assets/images/sprites/')));

  // Pipe CSS stream through CSS optimizer and onto disk
  return spriteData.css
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/styles/')));
});

gulp.task('tenant-sprite', function() {
  var spriteData = gulp.src(path.join(conf.paths.src, '/assets/images/to-sprite/tenant/*.{png,jpg,jpeg,gif}'))
    .pipe($.newer(path.join(conf.paths.tmp, '/serve/assets/images/sprites/tenant-sprite.png'))) // checks if src is newer (at least one src file) than generated spritesheet
    .pipe($.spritesmith({
      imgPath: '/assets/images/sprites/tenant-sprite.png',
      imgName: 'tenant-sprite.png',
      // retinaSrcFilter: [conf.paths.src + '/assets/images/to-sprite/tenant/*-ret.{png,jpg,jpeg,gif}'],
      // retinaImgName: 'tenant-sprite-2x.png',
      cssName: '_tenant-sprite-generated.scss',
      cssFormat: 'css',
      padding: 2
    }));

  // Pipe image stream through image optimizer and onto disk
  spriteData.img
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/assets/images/sprites/')));

  // Pipe CSS stream through CSS optimizer and onto disk
  return spriteData.css
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/styles/')));
});


gulp.task('copy-fonts', function() {
  var fontFiles = $.mainBowerFiles().filter(function(f) {
    return /\.(eot|svg|ttf|woff|woff2)$/.test(f);
  });
  return gulp.src(fontFiles)
    .pipe($.newer(path.join(conf.paths.tmp, '/serve/fonts/'))) // checks if src is newer
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/fonts/')))
    .pipe($.size({
      title: 'copy-fonts',
      showFiles: true
    }));
});


function processStyles(uiTenant, tenantDest) {
  uiTenant = uiTenant || args.uiTenant || args.tenant || conf.uiTenant;

  var sassOptions = {
    outputStyle: 'expanded',
    sourceComments: true,
    includePaths: [path.join(conf.paths.src, '/app/styles/tenant/', uiTenant, '/')]
  };

  // inject all .scss files that start with underscore (_)
  // excluding all tenant _.scss files except current tenant
  var injectFiles = gulp.src([
    conf.paths.src + '/app/**/_*.scss',
    '!' + conf.paths.src + '/app/index.scss',
    '!' + conf.paths.src + '/app/**/tenant/!(' + uiTenant + ')/_*.scss',
    conf.paths.tmp + '/serve/app/**/_*.scss',
  ], {
    read: false
  });


  var injectOptions = {
    transform: function(filePath) {
      filePath = filePath.replace(conf.paths.src + '/app/', '');
      if (args.verbose) {
        $.util.log('injecting ', filePath);
      }
      return '@import \'' + filePath + '\';';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };


  return gulp.src([path.join(conf.paths.src, '/app/index.scss')])
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(wiredep(Object.assign({}, conf.wiredep)))
    .pipe($.sourcemaps.init())
    .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
    .pipe($.autoprefixer(conf.autoprefixer)).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')))
    .pipe($.if(tenantDest, gulp.dest(path.join(conf.paths.tmp, '/serve/app/tenant/', uiTenant, '/styles/'))))
    .pipe($.size({
      title: 'styles:' + uiTenant,
      showFiles: true
    }))
    .pipe($.browserSync.reload({
      stream: true 
    }));
}

gulp.task('styles', ['sprite', 'tenant-sprite', 'copy-fonts'], function() {
  return processStyles();
});
// styles without sprites (launch from sprite)
gulp.task('styles:watch', function() {
  return processStyles();
});
// compile styles for all tenants
gulp.task('styles:dist', ['sprite', 'tenant-sprite', 'copy-fonts'], function() {
  var merged = require('merge-stream')(),
    tenants = glob.sync('*', { cwd: path.join(conf.paths.src, '/app/styles/tenant')});
  tenants.forEach(function(tenant) {
    $.util.log('Creating ' + $.util.colors.magenta(tenant) + ' tenant styles');
    merged.add(processStyles(tenant, true));
  });
  return merged.isEmpty() ? null : merged;
});
