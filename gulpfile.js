var browserify  = require('gulp-browserify');
var browserSync = require('browser-sync').create();
var concat      = require('gulp-concat');
var del         = require('del');
var gulp        = require('gulp');
var jshint      = require('gulp-jshint');
var reload      = browserSync.reload;
var sass        = require('gulp-ruby-sass');
var scsslint    = require('gulp-scss-lint');
var stylish     = require('jshint-stylish');
var uglify      = require('gulp-uglify');

var source = {
    controllers: 'src/js/app/controllers/*.js',
    scssMain:  'src/css/main.scss',
    scssLint:  'src/css//*.scss',
    root:      'src/',
    scss:      'src/css/**/*.scss',
    libs:      'src/js/vendor/*.js',
    js:        'src/js/app/app.js'
};

var build = {
    clean:  'build/**/*',
    root:   'build/',
    css:    'build/css/',
    js:     'build/js/'
};

gulp.task('clean', function() {
  del(build.root);
})

.task('server', function() {
  browserSync.init({
    server: {
     baseDir: './' 
    }
  });
})

.task('browserify', function() {
  return gulp.src('src/js/app/app.js')
    .pipe(browserify({
      insertGlobals: true,
      debug: true
    }))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('build/js'));
})

.task('js', function() {
  return gulp.src([source.js, source.controllers])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(build.js));
})

.task('js:min', function() {
  return gulp.src([source.js, source.controllers])
    .pipe(uglify())
    .pipe(concat("app.js"))
    .pipe(gulp.dest(build.js));
})

.task('js:vendor', function() {
  return gulp.src(source.libs)
    .pipe(concat("vendor.js"))
    .pipe(gulp.dest(build.js));
})

.task('js:lint', function() {
  return gulp.src([source.js, source.controllers])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
})

.task('sass', function() {
  return sass(source.scssMain) 
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(gulp.dest(build.css));
})

.task('sass:lint', function() {
  return gulp.src('src/css/*.scss')
    .pipe(scsslint(
        {
        'config': 'lint.yml'
        }
    ));
})

.task('serve', ['clean', 'js:lint', 'js:vendor', 'js', 'sass:lint', 'sass', 'server'], function() {
  return gulp.watch(
    [source.js, source.scss], 
    ['js:lint', 'js', 'sass:lint', 'sass', reload]
  );
});

gulp.task('default', ['build-dev', 'watch']);