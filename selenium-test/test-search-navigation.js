'use strict';

require('should');

import searchPage from './page-objects/search-page';

describe('Search Page', function () {
  beforeEach(function () {
    searchPage.open();
  });

  it('navigates between the result when user press the navigation keys', function () {
    searchPage.input.waitForVisible();
    searchPage.input.setValue('Ke');

    searchPage.suggestionGroup.waitForVisible();
    searchPage.contentWrapper.waitForVisible();

    searchPage.firstOfficerResult.getAttribute('class').should.containEql('test--focused');
    searchPage.secondOfficerResult.getAttribute('class').should.not.containEql('test--focused');

    browser.keys('ArrowDown'); // unfocus
    browser.keys('ArrowDown');

    searchPage.firstOfficerResult.getAttribute('class').should.not.containEql('test--focused');
    searchPage.secondOfficerResult.getAttribute('class').should.containEql('test--focused');
  });
});
