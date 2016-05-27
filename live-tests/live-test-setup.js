var recursiveReadSync = require('recursive-readdir-sync'),
  files = recursiveReadSync('./live-tests/test');

var path = require('path');

function importTest(name, path) {
  describe(name, function () {
    require(path);
  });
}

describe('', function () {
  after(function (client, done) {
    client.end(function () {
      done();
    });
  });

  files.forEach(function (file) {
    importTest(file, path.resolve(file));
  });
});
