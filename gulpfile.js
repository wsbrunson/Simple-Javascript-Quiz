var del        = require('del');
var browserify = require('browserify');
var gulp       = require('gulp');
var jshint     = require('gulp-jshint');
var sass       = require('gulp-ruby-sass');
var scsslint   = require('gulp-scss-lint');
var source     = require('vinyl-source-stream');
var watchify   = require('watchify');

gulp.task('clean', function() {
  del('./build/');
})
 
gulp.task('browserify:build', function() {
  return browserify('./src/js/app/app.js')
    .bundle()
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('bundle.js'))
    // Start piping stream to tasks!
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('browserify:serve', function() {
  function serveBundle() {
    return
  }
  return watchify(browserify('./src/js/app/app.js'))
    .bundle()
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('bundle.js'))
    // Start piping stream to tasks!
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('lint:js', function() {
  return gulp.src(['./src/js/app/app.js', './src/js/app/controllers/*.js', './src/js/app/services/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
});

gulp.task('css', function() {
  return sass('./src/css/main.scss')
    .on('error', function(err) {
      console.error('Error!', err.message);
    })
    .pipe(gulp.dest('./build/css'));
});

gulp.task('lint:css', function() {
  return gulp.src('./src/css/*.scss')
    .pipe(scsslint({'config': 'lint.yml'}));
});

gulp.task('serve', ['browserify:serve'], function() {
  gulp.watch('./src/css/main.scss', ['lint:css', 'css']);
});

gulp.task('build', ['clean', 'lint:js', 'browserify', 'lint:css', 'css']);

gulp.task('default', function() {
    console.log("gulped");
});