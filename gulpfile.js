// Load all components needed
var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename');


//
// Tasks
//

// Concat all source files
gulp.task('compile', function () {
  return gulp.src(['./js/support/**/*.js', './js/components/**/*.js'])
    .pipe(concat('simpleJS.js'))
    .pipe(gulp.dest('./js'));
});

// Concat all source files without support (polyfill)
gulp.task('compile-supportless', function () {
  return gulp.src(['./js/components/**/*.js'])
    .pipe(concat('simpleJS.supportless.js'))
    .pipe(gulp.dest('./js'));
});

// Minify JavaScript
gulp.task('min', ['compile', 'compile-supportless'], function () {
  return gulp.src(['./js/simpleJS.js', './js/simpleJS.supportless.js'])
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('./js'));

});


// Default task
gulp.task('default', ['min']);
