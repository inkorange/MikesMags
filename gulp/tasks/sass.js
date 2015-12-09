var gulp = require('gulp');
var sass = require('gulp-sass');
var input = './src/app/stylesheets/main.scss';
var output = './build/css';
var sassOptions = require('../config').sass;

gulp.task('sass', function () {
  return gulp
    // Find all `.scss` files from the `input` folder
    .src(input)
    // Run Sass on those files
    .pipe(sass(sassOptions))
    // Write the resulting CSS in the output folder
    .pipe(gulp.dest(output))
});