'use strict';

const gulp = require('gulp');
const env = require('gulp-env');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const gutil = require('gulp-util');
const htmlreplace = require('gulp-html-replace');
const babelify = require('babelify');
const rename = require('gulp-rename');


const buildHTML = (varBlock, destination) => () => {
  gulp.src('index.html')
    .pipe(htmlreplace({
      css: [
        '/dist/css/grid.css', '/dist/css/font.css', '/dist/css/base.css',
        '/dist/css/react-datepicker.css', '/dist/css/draft.css'],
      var: varBlock
    }))
    .pipe(gulp.dest(destination));
};

const copyStatic = (destination) => () => {
  gulp.src(['src/**/*', '!src/js', '!src/js/**'])
    .pipe(gulp.dest(destination));
};

const buildJs = (output) => (() => {
  const envs = env.set({
    'NODE_PATH': 'src/js',
    'NODE_ENV': 'production'
  });
  const b = browserify({
    entries: 'src/js/index.js',
    transform: [
      babelify.configure({ presets: ['es2015', 'react'] })
    ]
  });

  return b.bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(envs.reset)
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest(output));
});

const ROOT = '/www/static/';

let globalVariableBlock = '<script type="text/javascript">'
  + 'var GA_TRACKING_ID = "UA-63671047-3";'
  + '</script>';
if (process.env.NODE_ENV === 'production') {
  globalVariableBlock = '<script type="text/javascript">'
    + 'var GA_TRACKING_ID = "UA-63671047-2";'
    + '</script>';
}

gulp.task('build-html', buildHTML(globalVariableBlock, `${ROOT}templates/`));
gulp.task('build-js', buildJs(`${ROOT}dist/`));
gulp.task('copy-static', copyStatic(`${ROOT}dist/`));

gulp.task('build', ['build-html', 'build-js', 'copy-static']);

const liveTestDir = 'live-test-build';
const testBlock = '<script type="text/javascript">' +
  'var LIVE_TEST=true; var GA_TRACKING_ID = "UA-XXXXX-Y";</script>';

gulp.task('build-html-live-test', buildHTML(testBlock, liveTestDir));
gulp.task('build-js-live-test', buildJs(`${liveTestDir}/dist/`));
gulp.task('copy-static-live-test', copyStatic(`${liveTestDir}/dist/`));

gulp.task('build-live-test', ['build-html-live-test', 'build-js-live-test', 'copy-static-live-test']);
