import 'babel-polyfill';
import 'core-js/fn/object/assign';
import './setup';
import 'mocha/browser-entry';
import 'mocha/mocha.css';
import sinon from 'sinon';

import appConfig from 'utils/app-config';
import { greyColor, softBlackColor } from 'utils/styles';


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

mocha.suite.beforeEach(function () {
  appConfig.set({
    visualTokenColors: [
      { lower: 0, upper: 5, backgroundColor: '#F5F4F4', textColor: softBlackColor },
      { lower: 5, upper: 30, backgroundColor: '#F9D3C3', textColor: softBlackColor },
      { lower: 30, upper: 50, backgroundColor: '#F4A298', textColor: softBlackColor },
      { lower: 50, upper: 70, backgroundColor: '#FF6453', textColor: softBlackColor },
      { lower: 70, upper: 90, backgroundColor: '#FF412C', textColor: softBlackColor },
      { lower: 90, upper: 100, backgroundColor: '#F52524', textColor: greyColor },
    ],
  });
});

mocha.suite.afterEach(function () {
  sinon.restore();
});

runner.once('fail', () => {
  testsPassed = false;
});

runner.once('end', () => global.endTest(testsPassed, global.__coverage__));
