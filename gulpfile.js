var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    watch = require('gulp-watch');

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

gulp.task('sass', function() {
    return sass('source/css/main.scss')
    .pipe(gulp.dest('dist/css/'))
});

gulp.task('watch', function() {
    // watch scss files
    gulp.watch('source/css/main.scss', function() {
        gulp.run('sass');
    });

    //watch js files
    gulp.watch('source/js/*.js', function() {
        gulp.run('js');
    });
});

gulp.task('default', ['js', 'sass', 'watch']);