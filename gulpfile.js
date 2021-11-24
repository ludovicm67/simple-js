// Load all components needed
const gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename');


//
// Tasks
//

// Concat all source files
const compileTask = (cb) => {
  gulp.src(['./js/support/**/*.js', './js/components/**/*.js'])
    .pipe(concat('simpleJS.js'))
    .pipe(gulp.dest('./js'));

  cb();
};

// Concat all source files without support (polyfill)
const compileSupportless = (cb) => {
  gulp.src(['./js/components/**/*.js'])
    .pipe(concat('simpleJS.supportless.js'))
    .pipe(gulp.dest('./js'));

  cb();
};

// Minify JavaScript
const minifyJavaScript = (cb) => {
  gulp.src(['./js/simpleJS.js', './js/simpleJS.supportless.js'])
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('./js'));

  cb();
};

// Copy to docs directory
const docsTask = (cb) => {
  gulp.src(['./js/simpleJS.min.js'])
    .pipe(gulp.dest('./docs/js'));

  cb();
}

// Default task
gulp.task('default', gulp.series(
  gulp.parallel(compileTask, compileSupportless),
  minifyJavaScript,
  docsTask,
));
