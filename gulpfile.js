/* Install Command

npm install --save-dev browser-sync del run-sequence gulp gulp-concat gulp-uglify gulp-ruby-sass gulp-jshint jshint-stylish gulp-scss-lint gulp-shell gulp-filter

*/

var runSequence = require('run-sequence');
    browserSync = require('browser-sync').create();
    scsslint    = require('gulp-scss-lint'),
    stylish     = require('jshint-stylish'),
    concat      = require('gulp-concat'),
    reload      = browserSync.reload,
    uglify      = require('gulp-uglify'),
    jshint      = require('gulp-jshint'),
    filter      = require('gulp-filter'),
    shell       = require('gulp-shell'),
    gulp        = require('gulp'),
    sass        = require('gulp-ruby-sass'),
    del         = require('del');

var source = {
    controllers: 'src/js/app/controllers/*.js',
    scssReset: 'src/css/_reset.scss',
    scssMain:  'src/css/main.scss',
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

var surge = {
    assets: './build',
    domain: 'shanelovesmaria.com'
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
  var scssFilter = filter(source.scssReset);
    
  return gulp.src(source.scss)
    .pipe(scssFilter)
    .pipe(scsslint({'config': 'lint.yml'}));
})

.task('serve', ['clean', 'js:lint', 'js:vendor', 'js', 'sass:lint', 'sass', 'server'], function() {
  return gulp.watch(
    [source.js, source.scss], 
    ['js:lint', 'js', 'sass:lint', 'sass', reload]
  );
});

gulp.task('surge', shell.task([
    'surge ' + surge.assets + ' ' + surge.domain
]));

gulp.task('build', function(callback) {
  runSequence('clean', 
              ['js:lint', 'js:vendor', 'js:min', 'sass:lint', 'sass'],
              'surge',
              callback);
});

gulp.task('default', ['build-dev', 'watch']);