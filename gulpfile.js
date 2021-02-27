const gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer');

// Static Server & watching scss/html files
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: "./"
  });
  gulp.watch("./scss/*.scss", ['sass']).on('change', browserSync.reload);
  gulp.watch("./*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
  return gulp.src("./scss/*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 8 version', {cascade: false}))
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);