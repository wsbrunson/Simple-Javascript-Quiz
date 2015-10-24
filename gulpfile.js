var browserSync = require('browser-sync').create();
var del = require('del');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var src = {
      css: './src/css/**/*',
  cssMain: './src/css/main.scss',
       js: './src/js/app/app.js'
};

var appSrc = [
	'./src/js/app/app.js',
	'./src/js/app/components/**/*Component.js',
	'./src/js/app/services/**/*Service.js',
	'./src/js/app/views/**/*View.js'
];

var build = {
   css: './build/css/',
    js: './build/js/',
  root: './build/'
};

var vendor = [
	'./node_modules/angular/angular.min.js',
	'./node_modules/angular-ui-router/build/angular-ui-router.min.js'
];

var watch = [
	appSrc,
	src.css
];

gulp.task('clean', function() {
  return del(build.root);
});

gulp.task('webserver', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('js:vendor', ['clean'], function() {
	return gulp.src(vendor)
		.pipe(plugins.concat('vendor.js'))
		.pipe(gulp.dest(build.js));
});

gulp.task('js', ['clean'], function() {
	return gulp.src(appSrc)
		.pipe(plugins.sourcemaps.init())
			.pipe(plugins.babel())
			.pipe(plugins.concat('main.js'))
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest(build.js));
		//.pipe(browserSync.stream());
});

gulp.task('css', ['clean'], function() {
	return gulp.src('./src/css/main.scss')
		.pipe(plugins.sourcemaps.init())
			.pipe(plugins.sass())
		.pipe(plugins.sourcemaps.write({sourceRoot: './src/css'}))
    .pipe(gulp.dest(build.css));
		//.pipe(browserSync.stream());
});

gulp.task('build', ['js:vendor', 'js', 'css']);

gulp.task('serve', ['build', 'webserver'], function() {
  gulp.watch(watch, ['build']);
});
