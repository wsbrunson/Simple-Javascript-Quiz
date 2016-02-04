var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var notify = require('gulp-notify');

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
// var uglify = require('gulp-uglify');
// var rename = require('gulp-rename');
// var buffer = require('vinyl-buffer');

var browserSync = require('browser-sync');
var reload = browserSync.reload;
var historyApiFallback = require('connect-history-api-fallback');

var src = {
	css: './src/css/**/*.scss',
	cssMain: './src/css/main.scss',
	js: './src/js/app/app.js'
};

var build = {
	css: './build/css/',
	js: './build/js/',
	root: './build/'
};

/*
  CSS Task
*/

gulp.task('css', function() {
	return gulp.src(src.cssMain)
		.pipe(sourcemaps.init())
			.pipe(sass())
			.pipe(concat('main.css'))
			.pipe(autoprefixer({
				browsers: ['last 2 versions']
			}))
		.pipe(sourcemaps.write({sourceRoot: '/src/css'}))
		.pipe(gulp.dest(build.css))
		.pipe(browserSync.stream());
});

/*
  Images
*/
gulp.task('images', function() {
	gulp.src('css/images/**')
    .pipe(gulp.dest('./build/css/images'));
});

/*
  Browser Sync
*/
gulp.task('browser-sync', function() {
	browserSync({
		// we need to disable clicks and forms for when we test multiple rooms
		server: {},
		middleware: [ historyApiFallback() ],
		ghostMode: false,
		browser: 'google chrome'
	});
});

function handleErrors() {
	var args = Array.prototype.slice.call(arguments);
	notify.onError({
		title: 'Compile Error',
		message: '<%= error.message %>'
	}).apply(this, args);
	this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(file, watch) {
	var props = {
		entries: ['./src/js/' + file],
		debug: true,
		cache: {},
		packageCache: {},
		transform: [babelify.configure({stage: 0})]
	};

  // watchify() if watch requested, otherwise run browserify() once
	var bundler = watch ? watchify(browserify(props)) : browserify(props);

	function rebundle() {
		var stream = bundler.bundle();
		return stream
      .on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulp.dest('./build/js/'))
      // If you also want to uglify it
      // .pipe(buffer())
      // .pipe(uglify())
      // .pipe(rename('app.min.js'))
      // .pipe(gulp.dest('./build'))
			.pipe(reload({stream: true}));
	}

  // listen for an update and run rebundle
	bundler.on('update', function() {
		rebundle();
		gutil.log('Rebundle...');
	});

  // run it once the first time buildScript is called
	return rebundle();
}

gulp.task('scripts', function() {
	return buildScript('main.js', false); // this will run once because we set watch to false
});

// run 'scripts' task first, then watch for future changes
gulp.task('default', ['images', 'css', 'scripts', 'browser-sync'], function() {
	gulp.watch(src.css, ['css']); // gulp watch for stylus changes
	return buildScript('main.js', true); // browserify watch for JS changes
});
