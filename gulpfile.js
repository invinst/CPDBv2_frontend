'use strict';

const spawn = require('child_process').spawn;
const gulp = require('gulp');
const env = require('gulp-env');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const gutil = require('gulp-util');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const concatCss = require('gulp-concat-css');
const htmlreplace = require('gulp-html-replace');
const babelify = require('babelify');
const gulpif = require('gulp-if');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');


const buildHTML = (varBlock, destination, revFilePath) => () => {
  gulp.src('index.html')
    .pipe(htmlreplace({
      css: ['/dist/bundle.css'],
      var: varBlock
    }))
    .pipe(revReplace({ manifest: gulp.src(revFilePath) }))
    .pipe(gulp.dest(destination));
};

const copyStatic = (destination) => () => {
  gulp.src(['src/**/*', '!src/js', '!src/js/**', '!src/css', '!src/css/**'])
    .pipe(gulp.dest(destination));
};

const buildCss = (output) => (() => {
  return gulp.src('src/css/**/*.css')
    .pipe(concatCss('bundle.css'))
    .pipe(rev())
    .pipe(gulp.dest(output))
    .pipe(rev.manifest('rev-css-manifest.json'))
    .pipe(gulp.dest(output));
});

const buildJs = (output, produceSourceMap) => (() => {
  const envs = env.set({
    'NODE_PATH': 'src/js',
    'NODE_ENV': 'production'
  });
  const b = browserify({
    entries: 'src/js/index.prod.js',
    transform: [
      babelify.configure({ presets: ['es2015', 'react'] })
    ]
  });

  return b.bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(gulpif(produceSourceMap, sourcemaps.init({ loadMaps: true })))
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(envs.reset)
    .pipe(rename('bundle.js'))
    .pipe(rev())
    .pipe(gulpif(produceSourceMap, sourcemaps.write('./')))
    .pipe(gulp.dest(output))
    .pipe(rev.manifest('rev-js-manifest.json'))
    .pipe(gulp.dest(output));
});

const ROOT = '/www/static/';

let globalVariableBlock = '<script type="text/javascript">'
  + 'var GA_TRACKING_ID = "UA-63671047-3";'
  + 'var INTERCOM_ID = "gbsby1ik";'
  + '</script>';
if (process.env.NODE_ENV === 'production') {
  globalVariableBlock = '<script type="text/javascript">'
    + 'var GA_TRACKING_ID = "UA-63671047-2";'
    + 'var INTERCOM_ID = "p51vy1rb";'
    + '</script>';
}

gulp.task('build-js', buildJs(`${ROOT}dist/`));
gulp.task('build-css', buildCss(`${ROOT}dist/`));
gulp.task('copy-static', copyStatic(`${ROOT}dist/`));
gulp.task(
  'build-html',
  ['build-js', 'build-css'],
  buildHTML(globalVariableBlock, `${ROOT}templates/`, `${ROOT}dist/*-manifest.json`)
);

gulp.task('build', ['build-html', 'copy-static']);

const liveTestDir = 'live-test-build';
const testBlock = '<script type="text/javascript">' +
  'var LIVE_TEST=true; var GA_TRACKING_ID = "UA-XXXXX-Y";</script>';

gulp.task('build-js-live-test', buildJs(`${liveTestDir}/dist/`, true));
gulp.task('build-css-live-test', buildCss(`${liveTestDir}/dist/`));
gulp.task('copy-static-live-test', copyStatic(`${liveTestDir}/dist/`));
gulp.task(
  'build-html-live-test',
  ['build-js-live-test', 'build-css-live-test'],
  buildHTML(testBlock, liveTestDir, `${liveTestDir}/dist/*-manifest.json`)
);

gulp.task('build-live-test', ['build-html-live-test', 'copy-static-live-test']);


gulp.task('run-live-test', function (cb) {
  const testServer = spawn('node', ['test-server.js']);
  const wdio = spawn('yarn', ['wdio'], { stdio: 'inherit' });
  wdio.on('exit', function (exitCode) {
    testServer.kill();
    cb(exitCode);
  });
});
