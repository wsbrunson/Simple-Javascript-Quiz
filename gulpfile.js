/* Install Command

npm install --save-dev gulp-concat gulp-uglify gulp-sass gulp-jshint jshint-stylish gulp-scss-lint del gulp-shell gulp-filter

*/

var scsslint = require('gulp-scss-lint'),
    stylish  = require('jshint-stylish'),
    concat   = require('gulp-concat'),
    uglify   = require('gulp-uglify'),
    jshint   = require('gulp-jshint'),
    filter   = require('gulp-filter'),
    shell    = require('gulp-shell'),
    gulp     = require('gulp'),
    sass     = require('gulp-sass'),
    del      = require('del');

var source = {
    scssReset: 'src/css/_reset.scss',
    scssMain:  'src/css/main.scss',
    extras:    ['crossdomain.xml', 'humans.txt', 'robots.txt', 'favicon.ico'],
    images:    'img/**/*.*',
    fonts:     'lib/fonts/*.*',
    views:     'src/html/ng-views/*.html',
    root:      'src/',
    html:      'src/html/index.html',
    scss:      'src/css/**/*.scss',
    libs:      'src/js/vendor/*.js',
    js:        'src/js/app/**/*.js'
};

var build = {
    images: 'build/img/',
    fonts:  'build/lib/fonts/',
    views:  'build/views/',
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
});

gulp.task('copy', function() {
    gulp.src(source.extras)
        .pipe(gulp.dest(build.root));
        
    gulp.src(source.images)
        .pipe(gulp.dest(build.images));

    gulp.src(source.fonts)
        .pipe(gulp.dest(build.fonts));
});

gulp.task('ng-views', function() {
    gulp.src(source.views)
        .pipe(gulp.dest(build.views));
});

gulp.task('html', function() {
    gulp.src(source.html)
        .pipe(gulp.dest(build.root));
});

gulp.task('js-min', function() {
    gulp.src(source.js)
        .pipe(uglify())
        .pipe(concat("main.js"))
        .pipe(gulp.dest(build.js));
});

gulp.task('js-vendor', function() {
    gulp.src(source.libs)
        .pipe(uglify())
        .pipe(concat("vendor.js"))
        .pipe(gulp.dest(build.js));
});

gulp.task('js-lint', function() {
    gulp.src(source.js)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
});

gulp.task('js-copy', function() {
    gulp.src(source.js)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(build.js));
});

gulp.task('sass', function() {
    gulp.src(source.scssMain)
        .pipe(sass())
        .pipe(gulp.dest(build.css));
});

gulp.task('scss-lint', function() {
    var scssFilter = filter(source.scssReset);
    
    gulp.src(source.scss)
        .pipe(scssFilter)
        .pipe(scsslint({'config': 'lint.yml'}));
});

gulp.task('watch', function() {
    gulp.watch(source.scss, ['scss-lint', 'sass']);

    gulp.watch(source.js, ['js-lint', 'js-copy']);

    gulp.watch(source.html, ['html']);
    
    gulp.watch(source.views, ['ng-views']);
    
});

gulp.task('surge', shell.task([
    'surge ' + surge.assets + ' ' + surge.domain
]));

gulp.task('build-dev', ['clean', 'copy', 'html', 'ng-views', 'js-lint', 'js-copy', 'js-vendor', 'scss-lint', 'sass']);
gulp.task('build', ['clean', 'copy', 'html', 'ng-views', 'js-lint', 'js-min', 'js-vendor', 'scss-lint', 'sass']);
gulp.task('default', ['build-dev', 'watch']);