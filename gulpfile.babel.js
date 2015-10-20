import assign from 'lodash.assign';
import babelify from 'babelify';
import buffer from 'vinyl-buffer';
import del from 'del';
import browserify from 'browserify';
import browserSyncSetup from 'browser-sync';
import gulp from 'gulp';
import plugin from 'gulp-load-plugins';
import source from 'vinyl-source-stream';
import watchify from 'watchify';

const plugins = plugin();
const browserSync = browserSyncSetup.create();

const src = {
      css: './src/css/**/*',
  cssMain: './src/css/main.scss',
       js: './src/js/app/app.js'
};

const build = {
   css: './build/css/',
    js: './build/js/',
  root: './build/'
};

gulp.task('clean', () => {
  return del(build.root);
});

const customOpts = {
  entries: [src.js],
  debug: true
};

const opts = assign({}, watchify.args, customOpts);
let b = watchify(browserify(opts));

// add transformations here
b.transform(babelify);

gulp.task('js', ['clean'], bundle); // so you can run `gulp js` to build the file

function bundle() {
  return b.bundle()
    // log errors if they happen
    .pipe(source('bundle.js'))
		.pipe(buffer())
    .pipe(plugins.sourcemaps.init({loadMaps: true}))
			.pipe(plugins.uglify({mangle: false}))
    .pipe(plugins.sourcemaps.write({sourceRoot: './src/js'}))
    .pipe(gulp.dest(build.js));
}

gulp.task('css', ['clean'], () => {
	return gulp.src('./src/css/main.scss')
		.pipe(plugins.sourcemaps.init())
			.pipe(plugins.sass())
		.pipe(plugins.sourcemaps.write({sourceRoot: './src/css'}))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('webserver', () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('build', ['js', 'css']);

gulp.task('serve', ['build', 'webserver'], () => {
  gulp.watch(src.css, ['build']);
	b.on('update', bundle); // on any dep update, runs the bundler
});
