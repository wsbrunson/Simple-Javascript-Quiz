var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    watch = require('gulp-watch'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    scsslint = require('gulp-scss-lint');

gulp.task('js', function(){
    // main app js file
    gulp.src('source/js/app.js')
    .pipe(uglify())
    .pipe(concat("app.min.js"))
    .pipe(gulp.dest('dist/js/'))

    // create 1 vendor.js file from all vendor plugin code
    gulp.src('lib/js/*.js')
    .pipe(uglify())
    .pipe(concat("vendor.js"))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('js-lint', function() {
    gulp.src('source/js/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
});

gulp.task('sass', function() {
    return sass('source/css/main.scss')
    .pipe(gulp.dest('dist/css/'))
});

gulp.task('scss-lint', function() {
    gulp.src('/scss/*.scss')
        .pipe(scsslint())
        .pipe(scsslint.failReporter());
});

gulp.task('watch', function() {
    // watch scss files
    gulp.watch('source/css/main.scss', ['scss-lint', 'sass']);

    //watch js files
    gulp.watch('source/js/*.js', ['js-lint', 'js']);
});

gulp.task('default', ['js-lint', 'js', 'scss-lint', 'sass', 'watch']);