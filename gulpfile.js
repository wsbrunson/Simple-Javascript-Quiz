var browserSync = require('browser-sync').create();
var del = require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');
var plugins = require('gulp-load-plugins')();
var webpack = require('webpack');
var webpackProdConfig = require('./webpack.config.prod.js');
var webpackDevConfig = require('./webpack.config.dev.js');

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

var vendor = [
	'./node_modules/angular/angular.min.js',
	'./node_modules/angular-ui-router/build/angular-ui-router.min.js'
];

var watch = [
	src.js,
	src.css
];

gulp.task('clean', function() {
	return del(build.root);
});

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('webpack:prod', ['clean'], function(callback) {
	webpack(webpackProdConfig, function(err, stats) {
        if(err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            // output options
				}));

        callback();
    });
});

gulp.task('webpack:dev', ['clean'], function(callback) {
	webpack(webpackDevConfig, function(err, stats) {
        if(err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            // output options
				}));

        callback();
    });
});

gulp.task('css:prod', ['clean'], function() {
	return gulp.src(src.cssMain)
		.pipe(plugins.sass())
		.pipe(plugins.concat('main.css'))
		.pipe(plugins.autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(plugins.cssnano())
		.pipe(gulp.dest(build.css));
});

gulp.task('css:dev', ['clean'], function() {
	return gulp.src(src.cssMain)
		.pipe(plugins.sourcemaps.init())
			.pipe(plugins.sass())
			.pipe(plugins.concat('main.css'))
			.pipe(plugins.autoprefixer({
				browsers: ['last 2 versions']
			}))
		.pipe(plugins.sourcemaps.write({sourceRoot: '/src/css'}))
		.pipe(gulp.dest(build.css))
		.pipe(browserSync.stream());
});

gulp.task('build:prod', ['webpack:prod', 'css:prod']);

gulp.task('build:dev', ['webpack:dev', 'css:dev']);
gulp.task('serve', ['build:dev', 'server'], function() {
	gulp.watch(watch, ['build:dev']);
});
