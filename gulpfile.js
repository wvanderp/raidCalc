var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var jade = require('gulp-jade');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./dist/"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('images', function(){
  gulp.src('images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images/'));
});

gulp.task('styles', function(){
  gulp.src(['sass/**/*.sass'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass({indentedSyntax: true}))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('dist/sass/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('jade',function(){
	gulp.src(['//**/*.jade'])
		.pipe(plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(jade())
		.pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js',function(){
	gulp.src(['js/**/*.js'])
		.pipe(plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('default', ['browser-sync', 'styles', 'images', 'js', 'jade'], function(){
  // gulp.watch('js/**/*.js',['js']);
  // gulp.watch('//**/*.jade',['jade']);
  // gulp.watch("sass/**/*.sass", ['styles']);
  // gulp.watch("images/**/*.*", ['images']);
});
