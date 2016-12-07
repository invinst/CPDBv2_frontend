var browserSync = require('browser-sync').create();
var gulp = require('gulp');
require('./gulpfile.js');


module.exports = {
  before: function (done) {
    gulp.start('build-live-test', function () {
      browserSync.init({
        notify: false,
        port: 9100,
        open: false,
        middleware: function (req, res, next) {
          if (req.url.match(/^[\w\d\/]+$/)) {
            req.url = '/index.html';
          }
          return next();
        },
        server: {
          baseDir: ['./live-test-build']
          // routes: {
          //   '/reporting/\d+/': './live-test-build',
          //   '/reporting/': './live-test-build',
          //   '/faq/': './live-test-build'
          // }
        },
        snippetOptions: { blacklist: ['/'] },
        ui: false
      }, done);
    });
  },

  after: function (done) {
    browserSync.exit();
  }
};
