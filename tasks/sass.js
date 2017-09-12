const gulp        = require('gulp');
const concat      = require('gulp-concat-css');
const clean       = require('gulp-clean-css');
const livereload  = require('gulp-livereload');

const sass = require('gulp-sass');

module.exports = () => {
	gulp.task('sass', function () {
	  return gulp.src('src/sass/**/*.scss')
	    .pipe(sass.sync().on('error', sass.logError))
	    .pipe(gulp.dest('./src/css/scss'));
	});
};
