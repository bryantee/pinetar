// Pinetar Gulpfile

var gulp = require('gulp');

var sass          = require('gulp-sass'),
    nano          = require('gulp-cssnano'),
    autoprefixer  = require('gulp-autoprefixer'),
    notify        = require('gulp-notify'),
    rename        = require('gulp-rename');

// File Paths
var sassFiles   = ['./assets/scss/pinetar.scss'],
    cssFiles    = ['./assets/css/*.css', '!./assets/css/*.min.css'];

// Compile Sass
gulp.task('sass', function() {
  return gulp.src( sassFiles )
      .pipe(sass({
        includePaths: ['./node_modules/ginger-grid/']
      })
        .on('error', sass.logError))
        .on('error', notify.onError("Error compiling SASS!")
      )
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
    .pipe(gulp.dest( './assets/css' ))
});

// Minimize CSS
gulp.task('minify-css', ['sass'], function() {
	return gulp.src( cssFiles )
  	.pipe(rename({
      suffix: '.min'
    }))
    .pipe(nano({
      discardComments: {removeAll: true},
      autoprefixer: false
    }))
    .pipe(gulp.dest( './assets/css' ))
});

gulp.task('styles', ['minify-css']);

gulp.task('default', ['styles']);
