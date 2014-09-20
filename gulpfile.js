var gulp = require('gulp');
var inject = require("gulp-inject");
var compass = require('gulp-compass');

// Compile scss files using compass.
gulp.task('compass', function() {
  gulp.src('./_scss/*.scss')
      .pipe(compass({
        css: 'public/css',
        sass: '_scss',
        comments: false
      }))
      .pipe(gulp.dest('public/css'));
});

// Connect live reload.
var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(4002);
});

// Express.
gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({port: 4002}));
  app.use(express.static(__dirname + '/public'));
  app.listen(4000);
});

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);

  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

// Watch files.
gulp.task('watch', function() {
  gulp.watch('_scss/*.scss', ['compass']);
  gulp.watch('public/*.html', notifyLiveReload);
  gulp.watch('public/css/*.css', notifyLiveReload);
  gulp.watch('public/js/*.js', notifyLiveReload);
});

gulp.task('serve', ['express', 'livereload', 'watch'], function() {

});