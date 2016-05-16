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


const ROOT = '/www/static/';

gulp.task('build-html', () => {
  gulp.src('index.html')
    .pipe(htmlreplace({
      css: ['/dist/css/grid.css', '/dist/css/font.css'],
      var: ''
    }))
    .pipe(gulp.dest(ROOT));
});

gulp.task('build-js', () => {
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
    .pipe(gulp.dest(`${ROOT}dist/`));
});

gulp.task('copy-static', () => {
  gulp.src('src/**/*')
    .pipe(gulp.dest(`${ROOT}dist/`));
});

gulp.task('build', ['build-html', 'build-js', 'build-images']);
