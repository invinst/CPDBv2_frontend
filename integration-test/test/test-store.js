'use strict';

const should = require('should');

import landingPage from '../page-objects/landing-page';


describe('localStorage', function () {
  beforeEach(function () {
    landingPage.open();
    browser.pause(500);
  });

  it('should be cleared when local version does not match', function () {
    browser.setLocalStorage('CPDB_LOCALSTORAGE_VERSION', '1'); //default is 0
    browser.setLocalStorage('FOO', 'BAR');

    browser.refresh();
    $('body').waitForDisplayed();

    browser.getLocalStorage('CPDB_LOCALSTORAGE_VERSION').should.eql('0');
    should(browser.getLocalStorage('FOO')).eql(null);
  });

  it('should not be cleared when local version matches', function () {
    browser.setLocalStorage('CPDB_LOCALSTORAGE_VERSION', '0'); //default is 0
    browser.setLocalStorage('FOO', 'BAR');

    browser.refresh();
    $('body').waitForDisplayed();

    browser.getLocalStorage('CPDB_LOCALSTORAGE_VERSION').should.eql('0');
    browser.getLocalStorage('FOO').should.eql('BAR');
  });
});
