import del from 'del';
//import browserSyncSetup from 'browser-sync';
import gulp from 'gulp';
import plugin from 'gulp-load-plugins';

var browserSync = require('browser-sync').create();

const plugins = plugin();

const src = {
      css: './src/css/**/*',
  cssMain: './src/css/main.scss',
       js: './src/js/app/app.js'
};

const appSrc = [
	'./src/js/app/app.js',
	'./src/js/app/components/**/*Component.js',
	'./src/js/app/services/**/*Service.js',
	'./src/js/app/views/**/*View.js'
];

const build = {
   css: './build/css/',
    js: './build/js/',
  root: './build/'
};

const vendor = [
	'./node_modules/angular/angular.min.js',
	'./node_modules/angular-ui-router/build/angular-ui-router.min.js'
];

const watch = [
	appSrc,
	src.css
];

gulp.task('clean', () => {
  return del(build.root);
});

gulp.task('webserver', () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('js:vendor', ['clean'], () => {
	return gulp.src(vendor)
		.pipe(plugins.concat('vendor.js'))
		.pipe(gulp.dest(build.js));
});

gulp.task('js', ['clean'], () => {
	return gulp.src(appSrc)
		.pipe(plugins.sourcemaps.init())
			.pipe(plugins.babel())
			.pipe(plugins.concat('main.js'))
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest(build.js));
		//.pipe(browserSync.stream());
});

gulp.task('css', ['clean'], () => {
	return gulp.src('./src/css/main.scss')
		.pipe(plugins.sourcemaps.init())
			.pipe(plugins.sass())
		.pipe(plugins.sourcemaps.write({sourceRoot: './src/css'}))
    .pipe(gulp.dest('./build/css'));
		//.pipe(browserSync.stream());
});

gulp.task('build', ['js:vendor', 'js', 'css']);

gulp.task('serve', ['build', 'webserver'], () => {
  gulp.watch(watch, ['build']);
});
