var del        = require('del');
var browserify = require('browserify');
var gulp       = require('gulp');
var jshint     = require('gulp-jshint');
var sass       = require('gulp-ruby-sass');
var scsslint   = require('gulp-scss-lint');
var source     = require('vinyl-source-stream');
var watchify   = require('watchify');

var src = {
      css: './src/css/**/*',
  cssMain: './src/css/main.scss',
       js: './src/js/app/app.js'
};

var build = {
   css: './build/css/',
    js: './build/js/',
  root: './build/'
};

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('clean', function() {
  del(build.root);
});

function browserifyHelper(watch) {
  var bundler = browserify('./src/js/app/app.js', watchify.args);

  if(watch) {
    bundler = watchify(bundler);
  }

  rebundle = function() {
    var stream = bundler.bundle();
    //stream.on('error', handleError('Browserify'));
    stream = stream.pipe(source('bundle.js'));
    return stream.pipe(gulp.dest(build.js));
  };

  bundler.on('update', rebundle);
  return rebundle();
}

gulp.task('browserify:build', function() {
  return browserifyHelper(false);
});

gulp.task('browserify:serve', function() {
  return browserifyHelper(true);
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

gulp.task('serve', ['clean', 'browserify:serve', 'lint:css', 'css'], function() {
  gulp.watch(src.css, ['lint:css', 'css']);
});

gulp.task('build', ['clean', 'lint:js', 'browserify', 'lint:css', 'css']);

gulp.task('default', function() {
    console.log("gulped");
});
