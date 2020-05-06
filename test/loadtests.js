import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './setup';
import 'mocha/browser-entry';
import 'mocha/mocha.css';
import sinon from 'sinon';

const mochaOpts = JSON.parse(decodeURI(location.hash.substring(1)));

mocha.setup({
  ui: 'bdd',
  reporter: 'spec',
  ...mochaOpts,
});

// Add support for all files in the test directory
const testsContext = require.context('.', true, /\.js$/);
testsContext.keys().forEach(testsContext);

const runner = mocha.run();
let testsPassed = true;

mocha.suite.afterEach(function () {
  sinon.restore();
});

runner.once('fail', () => {
  testsPassed = false;
});

runner.once('end', () => global.endTest(testsPassed, global.__coverage__));
