'use strict';

const gulp      = require('gulp');
const zip       = require('gulp-zip');
const rename    = require('gulp-rename');
const util      = require('gulp-util');
const htmlmin   = require('gulp-htmlmin');
const fs        = require('fs');
const filter    = require('gulp-filter');

module.exports = () => {
  gulp.task( 'zip', [ 'build', 'template' ], () => {
    const htmlFilter = filter('**/*.html', {restore: true});

    return gulp.src(['./dist/index.min.html', './dist/assets', , './dist/assets/*'])
      .pipe( htmlFilter )
      .pipe( htmlmin({ collapseWhitespace: true }) )
      .pipe( rename('index.html') )
      .pipe( htmlFilter.restore )
      .pipe( zip('game.zip') )
      .pipe( gulp.dest('dist') );
  });

  gulp.task( 'report', [ 'zip' ], done => {
    fs.stat( './dist/game.zip', ( err, data ) => {
      if ( err ) {
        util.beep();
        return done( err );
      }
      util.log(
        util.colors.yellow.bold(`Current game size: ${ data.size } bytes`)
      );
      let percent = parseInt( ( data.size / 13312 ) * 100, 10 );
      util.log(
        util.colors.yellow.bold(`${ percent }% of total game size used`)
      );
      done();
    });
  });
};
