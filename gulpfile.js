'use strict';

const gulp        = require('gulp');

[ 'assets', 'build', 'sass', 'css', 'template', 'watch', 'zip' ]
  .forEach( task => require(`./tasks/${ task }`)() );

gulp.task( 'default', [ 'build', 'sass', 'css', 'template', 'assets', 'zip', 'report' ] );
