# Nightwatch Testing Guide

We use [nightwatch](http://nightwatchjs.org/) + [browser-sync](https://www.browsersync.io/) + selenium to do end to end testing.

## Configuration

Base configuration is in `nightwatch.json`:

- `src_folders` -> define root directory path which contains test suites.
- `globals_path` -> define global module path, global module contains all global variables and define following hooks `after[Each]`, 'before[Each]', works like mocha hooks. We use global module to start our test server and close it automatically after test finished:

```javascript
var browserSync = require('browser-sync').create();
var gulp = require('gulp');
require('./gulpfile.js');


module.exports = {
  before: function (done) {
    gulp.start('build-js-test', function () {
      browserSync.init({
        notify: false,
        port: 9100,
        open: false,
        server: { baseDir: ['./'] },
        snippetOptions: { blacklist: ['/'] },
        ui: false
      }, done);
    });
  },

  after: function (done) {
    browserSync.exit();
  }
};
```

- `selenium` -> define selenium stand alone server configuration.
- `test_workers` -> run tests in parallel if set to true.
- `test_settings` -> contains all test related options, we can define `test_runner` in this. For example: 

```json
"test_settings" : {
    "default" : {
      "test_runner" : {
        "type" : "mocha",
        "options" : {
          "ui" : "bdd",
          "reporter" : "spec"
        }
      },
      "launch_url" : "http://localhost:9100",
      "selenium_port"  : 4444,
      "selenium_host"  : "localhost",
      "silent": true,
      "screenshots" : {
        "enabled" : false,
        "path" : ""
      },
      "desiredCapabilities": {
        "browserName": "firefox",
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    }
  }
```

If we need to use some dynamic config then create `nightwatch.conf.js` is a good choice, this always taking precedence if both are found. In our case we use `selenium-server-standalone-jar` package to download selenium standalone jar file and pass the file path into setting, we use it like this:

```javascript
var standaloneSelenium = require('selenium-server-standalone-jar');

module.exports = (function (settings) {
  settings.selenium['server_path'] = standaloneSelenium.path;
  return settings;
})(require('./nightwatch.json'));
```

## Parallel Running Or Reuse Browser Session

Since nightwatch didn't support reuse browser session, for every test suites we must close the selenium client in after hook. We write a root test suite which will wrapped all test suite inside and we can reuse the browser session to reduce testing time. This is the solution we end up with `live-test-setup.js`:

```javascript
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
```

So we only need to run test on this file by set the `src_folders` to `live-tests/live-test-setup.js` and it will automatically run all other test suite within `live-tests/test/`. If you choose parallel running test suites over this one, just need to set the `src_folders` to `live-tests/test/` and add the hook `afterEach` which close selenium client into global module, `nightwatch.global.js`:

```javascript
module.exports = {
  afterEach: function (client, done) {
    client.end(function () {
      done();  
    });
  }
};
```
Note: don't pass the done into `client.end` directly because it won't work. After add global hook, change `test_workers` to `true` and nightwatch will run it in parallel mode.

## How to write a test suite

We just need to add Mocha test suite in to `live-tests/test`. The different with normal mocha test suite is we already have selenium client built-in test suite. Example:

```javascript
describe('bottom-sheet', function () {

  it('should open and close bottom-sheet', function (client) {
    // browse landing-page should see body
    client
      .url('http://localhost:9100')
      .expect.element('body').to.be.present.before(1000);

    // click on story-medium should open bottom-sheet and body element should has noscroll class
    client.click('.story-medium').expect.element('.story-full').to.be.present;
    client.expect.element('.overlay').to.be.present;
    client.expect.element('body').to.have.attribute('class').which.contains('noscroll');

    // click on dismiss should close bottom-sheet and body element shouldn't has noscroll class
    client.click('button.dismiss')
      .expect.element('.story-full').to.not.be.present.after(2000);
    client.expect.element('.overlay').to.not.be.present;
    client.expect.element('body').to.have.attribute('class').which.not.contains('noscroll');
  });
});
```

For more assertions visit [nightwatch/api](http://nightwatchjs.org/api).

## Running tests

We can run it by:

`./node_modules/.bin/nightwatch [source] [options]`

or:

`node nightwatch.js [source] [options]`
