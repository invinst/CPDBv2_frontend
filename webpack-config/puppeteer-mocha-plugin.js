const fs = require('fs');
const path = require('path');

const puppeteer = require('puppeteer');
const WebpackLog = require('webpack-log');
const arg = require('arg');

const log = WebpackLog({ name: 'pm' });

const args = arg({
  '--pm-watch': Boolean,
  '--pm-grep': String
});

function PuppeteerMochaPlugin(options = {}) {
  const { port, viewportHeight, viewportWidth } = options;
  this.port = port !== undefined ? port : '9977';
  this.viewportHeight = viewportHeight !== undefined ? viewportHeight : 2000;
  this.viewportWidth = viewportWidth !== undefined ? viewportWidth : 2000;

  this.watchTest = false;
  if (args['--pm-watch']) {
    this.watchTest = true;
  }

  this.mochaOpts = {};
  if (args['--pm-grep']) {
    this.mochaOpts['grep'] = args['--pm-grep'];
  }
}

PuppeteerMochaPlugin.prototype.ready = function () {
  return puppeteer.launch({
    defaultViewport: {
      width: this.viewportWidth,
      height: this.viewportHeight
    }
  }).then(browser => {
    log.info('Launched browser');
    this.browser = browser;
    return this.browser.newPage();
  }).then(page => {
    log.info('Created page');
    this.page = page;
    this.page.on('console', this.logToStdout);
    return this.page.exposeFunction('endTest', this.endTest.bind(this));
  });
};

PuppeteerMochaPlugin.prototype.endTest = function (testsPassed, coverage) {
  if (!this.watchTest) {
    this.coverageReport(coverage);
    this.quit(testsPassed);
  } else {
    this.page.goto('http://lvh.me');
  }
};

PuppeteerMochaPlugin.prototype.coverageReport = function (coverage) {
  try {
    fs.mkdirSync(path.join(__dirname, '../.nyc_output'));
  } catch (e) {}
  fs.writeFileSync(path.join(__dirname, '../.nyc_output/coverage.json'), JSON.stringify(coverage));
};

PuppeteerMochaPlugin.prototype.quit = function (testsPassed) {
  this.browser.close().then(() => {
    if (testsPassed) {
      process.exit();
    } else {
      process.exit(1);
    }
  });
};

function substituteString(msg, ...subs) {
  const stringParts = [];
  let i = 0;
  let tempStr = '';
  while (i < msg.length) {
    const nextTwoChars = msg.slice(i, i+2);
    if (nextTwoChars === '%s' || nextTwoChars === '%d') {
      stringParts.push(tempStr);
      stringParts.push(subs.shift());
      tempStr = '';
      i = i + 2;
    } else {
      tempStr += msg[i];
      i++;
    }
  }
  stringParts.push(tempStr);
  return stringParts.join('');
}

PuppeteerMochaPlugin.prototype.logToStdout = function (msg) {
  const type = msg.type();
  Promise.all(msg.args().map(arg => arg.jsonValue())).then(args => {
    const text = substituteString(...args);
    if (type === 'log') {
      log.info(text);
    } else if (type === 'error') {
      log.error(text);
    } else if (type === 'warning') {
      log.warn(text);
    }
  });
};

PuppeteerMochaPlugin.prototype.apply = function (compiler) {
  const browserReady = this.ready();
  compiler.hooks.done.tap('PuppeteerMochaPlugin', context => {
    process.nextTick(() => {
      return browserReady.then(() => {
        const mochaOpts = encodeURI(JSON.stringify(this.mochaOpts));
        const url = `http://localhost:${this.port}#${mochaOpts}`;
        log.info(`Visit url ${url}`);
        this.page.goto(url);
      });
    });
  });
};

module.exports = PuppeteerMochaPlugin;
