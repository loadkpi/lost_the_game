'use strict';

const gulp        = require('gulp');
const imagemin = require('gulp-imagemin');


module.exports = () => {
  gulp.task('assets', function() {
    gulp.src('src/assets/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/assets'))
  });
}