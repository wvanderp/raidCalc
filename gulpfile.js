var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var autoPrefixer = require('gulp-autoprefixer');
var jade = require('gulp-jade');
var imageMin = require('gulp-imagemin');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('sass', function() {
  gulp.src(['css/*.sass'])
    .pipe(plumber({
      handleError: function(err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(sass({
      indentedSyntax: true
    }))
    .pipe(autoPrefixer())
    .pipe(gulp.dest('dist/css'));
});



gulp.task('browserify', function() {
  try {
    return browserify('js/main.js')
      .bundle()
      //Pass desired output filename to vinyl-source-stream
      .pipe(source('bundle.js'))
      // Start piping stream to tasks!
      .pipe(gulp.dest('./dist/js/'));
  } catch (e) {
    console.log(e);
  }
});

gulp.task('jade', function() {
  gulp.src(['*.jade'])
    .pipe(plumber({
      handleError: function(err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(jade())
    .pipe(gulp.dest('dist/'));
});


gulp.task('image', function() {
  gulp.src(['images/*'])
    .pipe(plumber({
      handleError: function(err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(imageMin())
    .pipe(gulp.dest('dist/images'));
});

gulp.task('cssLib', function() {
  gulp.src(['css/lib/*.css'])
    .pipe(plumber({
      handleError: function(err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(gulp.dest('dist/css/lib/'));
});

gulp.task('jsLib', function() {
  gulp.src(['js/lib/*.js'])
    .pipe(plumber({
      handleError: function(err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(gulp.dest('dist/js/lib/'));
});


gulp.task('default', ['sass', 'jade', 'image', 'cssLib', 'jsLib', 'browserify'], function() {
  browserSync.init({
    server: "dist/",
    reloadDelay: 30,
    notify: false
  });

  gulp.watch('css/*.sass', ['sass', browserSync.reload]);
  gulp.watch('*.jade', ['jade', browserSync.reload]);
  gulp.watch('images/*', ['image', browserSync.reload]);

  //lib
  gulp.watch('css/lib/*', ['cssLib', browserSync.reload]);
  gulp.watch('js/lib/*', ['jsLib', browserSync.reload]);
  gulp.watch('js/*', ['browserify', browserSync.reload]);

});
