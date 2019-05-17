'use strict';

import should from 'should';

import searchTermsPage from './page-objects/search-terms-page';
import searchPage from './page-objects/search-page';


should.config.checkProtoEql = false;

describe('Search terms page', function () {
  beforeEach(function () {
    searchTermsPage.open();
  });

  it('should render bottom links', function () {
    searchTermsPage.bottomLinks.backToFrontPageLink.should.ok();
  });

  it('should navigate to Homepage when clicking on backToFrontPageLink', function () {
    searchTermsPage.bottomLinks.backToFrontPageLink.click();
    browser.getUrl().should.match(/\/$/);
  });

  it('should navigate to Search page when user type in something in search box', function () {
    searchPage.input.waitForVisible();
    searchPage.input.setValue('Ke');
    browser.getUrl().should.match(/\/search\/$/);
  });

  it('should focus on the search box by default', function () {
    searchTermsPage.input.waitForVisible();

    browser.keys('A');

    searchTermsPage.input.getValue().should.eql('A');
  });

  it('should focus on nothing after unfocused the input', function () {
    searchTermsPage.input.waitForVisible();
    searchTermsPage.title.click();

    searchTermsPage.categoryMainPanel.focusedItem.waitForVisible(2000, true);
  });
});
