'use strict';

const should = require('should');

import landingPage from './page-objects/landing-page';


describe('localStorage', function () {

  beforeEach(function () {
    landingPage.open();
    browser.pause(500);
  });

  it('should be cleared when local version does not match', function () {
    browser.localStorage('POST', { key: 'CPDB_LOCALSTORAGE_VERSION', value: '1' }); //default is 0
    browser.localStorage('POST', { key: 'FOO', value: 'BAR' });

    browser.refresh();
    browser.element('body').waitForVisible();

    browser.localStorage('GET', 'CPDB_LOCALSTORAGE_VERSION').value.should.eql('0');
    should(browser.localStorage('GET', 'FOO').value).eql(null);
  });

  it('should not be cleared when local version matches', function () {
    browser.localStorage('POST', { key: 'CPDB_LOCALSTORAGE_VERSION', value: '0' }); //default is 0
    browser.localStorage('POST', { key: 'FOO', value: 'BAR' });

    browser.refresh();
    browser.element('body').waitForVisible();

    browser.localStorage('GET', 'CPDB_LOCALSTORAGE_VERSION').value.should.eql('0');
    should(browser.localStorage('GET', 'FOO').value).eql('BAR');
  });
});
