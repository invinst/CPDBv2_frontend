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
    searchPage.rootElement.waitForVisible();
    searchPage.contentWrapper.waitForVisible();

    const suggestionItems = browser.elements('.suggestion-column span:first-child .suggestion-item').value;
    suggestionItems[0].getAttribute('class').should.containEql('focused');
    suggestionItems[1].getAttribute('class').should.not.containEql('focused');

    browser.keys('ArrowDown'); // unfocus
    browser.keys('ArrowRight');

    suggestionItems[0].getAttribute('class').should.not.containEql('focused');
    suggestionItems[1].getAttribute('class').should.containEql('focused');
  });
});
