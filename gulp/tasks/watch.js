
/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/
var gulp   = require('gulp');
var config = require('../config');

gulp.task('watch', ['setWatch', 'build'], function() {
  gulp.watch(config.markup.src, ['markup']);
  gulp.watch('./src/app/stylesheets/**/*.scss', ['sass']);
  gulp.watch('./src/app/images/**/*.*', ['assets']);
});
