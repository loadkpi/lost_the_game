'use strict';

const gulp        = require('gulp');

[ 'build', 'sass', 'css', 'template', 'watch', 'zip' ]
  .forEach( task => require(`./tasks/${ task }`)() );

gulp.task( 'default', [ 'build', 'sass', 'css', 'template', 'zip', 'report' ] );
