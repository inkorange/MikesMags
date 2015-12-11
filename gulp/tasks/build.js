var gulp = require('gulp');

gulp.task('build', ['sass', 'browserify', 'markup', 'model', 'api', 'assets', 'vendor', 'htaccess']);
