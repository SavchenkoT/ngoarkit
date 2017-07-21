(function() {
    'use strict';
    var gulp = require('gulp');
    var page=require('gulp-gh-pages');

    gulp.task('deploy', function() {
      return gulp.src('./dist/**/*')
      .pipe(ghPages());
});
    })()
