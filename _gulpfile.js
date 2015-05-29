var browserify  = require('browserify');
//var browserSync = require('browser-sync').create();
//var concat      = require('gulp-concat');
//var del         = require('del');
var gulp        = require('gulp');
//var jshint      = require('gulp-jshint');
//var reload      = browserSync.reload;
//var sass        = require('gulp-ruby-sass');
//var scsslint    = require('gulp-scss-lint');
var source      = require('vinyl-source-stream');
//var stylish     = require('jshint-stylish');
//var uglify      = require('gulp-uglify');
//var watchify    = require('watchify');

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
});

gulp.task('server', function() {
  browserSync.init({
    server: {
     baseDir: './' 
    }
  });
});

gulp.task('browserify', function() {
  return browserify('./src/js/app/app.js')
    .bundle()
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('bundle.js'))
    // Start piping stream to tasks!
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('js', function() {
  return gulp.src([source.js, source.controllers])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(build.js));
});

gulp.task('js:min', function() {
  return gulp.src([source.js, source.controllers])
    .pipe(uglify())
    .pipe(concat("app.js"))
    .pipe(gulp.dest(build.js));
});

gulp.task('js:vendor', function() {
  return gulp.src(source.libs)
    .pipe(concat("vendor.js"))
    .pipe(gulp.dest(build.js));
});

gulp.task('js:lint', function() {
  return gulp.src([source.js, source.controllers])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('sass', function() {
  return sass(source.scssMain) 
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(gulp.dest(build.css));
});

gulp.task('sass:lint', function() {
  return gulp.src('src/css/*.scss')
    .pipe(scsslint(
        {
        'config': 'lint.yml'
        }
    ));
});

gulp.task('serve', ['clean', 'js:lint', 'sass:lint', 'sass', 'server'], function() {
  return gulp.watch(
    [source.js, source.scss], 
    ['js:lint', 'sass:lint', 'sass', reload]
  );
});

gulp.task('default', function() {
  console.log('gulped');
});