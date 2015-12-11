var gulp = require('gulp');
var markupconfig = require('../config').markup;
var vendorconfig = require('../config').vendor;
var modelconfig = require('../config').model;
var assetsconfig = require('../config').assets;
var apiconfig = require('../config').api;
var htaccess = require('../config').htaccess;

gulp.task('markup', function() {
  return gulp.src(markupconfig.src)
    .pipe(gulp.dest(markupconfig.dest));
});

gulp.task('vendor', function() {
  console.log('vendor', vendorconfig.src, vendorconfig.dest);
  return gulp.src(vendorconfig.src)
      .pipe(gulp.dest(vendorconfig.dest));
});

gulp.task('api', function() {
  console.log('api', apiconfig.src, apiconfig.dest);
  return gulp.src(apiconfig.src)
      .pipe(gulp.dest(apiconfig.dest));
});

gulp.task('model', function() {
  console.log('models', modelconfig.src, modelconfig.dest);
  return gulp.src(modelconfig.src + '/*.json')
      .pipe(gulp.dest(modelconfig.dest));
});


gulp.task('assets', function() {
  console.log('assets', assetsconfig.src, assetsconfig.dest);
  return gulp.src(assetsconfig.src + '/*.*')
      .pipe(gulp.dest(assetsconfig.dest));
});

gulp.task('htaccess', function() {
  console.log('htaccess', htaccess.src, htaccess.dest);
  return gulp.src(htaccess.src + '/.htaccess')
      .pipe(gulp.dest(htaccess.dest));
});
