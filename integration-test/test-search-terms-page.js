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
    searchPage.input.waitForDisplayed();
    searchPage.input.setValue('Ke');
    browser.getUrl().should.match(/\/search\/$/);
  });

  it('should focus on the search box by default', function () {
    searchTermsPage.input.waitForDisplayed();

    browser.keys('A');

    searchTermsPage.input.getValue().should.eql('A');
  });

  it('should focus on nothing after unfocused the input', function () {
    searchTermsPage.input.waitForDisplayed();
    searchTermsPage.title.click();

    searchTermsPage.categoryMainPanel.focusedItem.waitForDisplayed(2000, true);
  });

  it('should navigates between the result when user press the navigation keys', function () {
    const focusedColor = 'color: rgb(0, 94, 244)';
    const firstCategoryHeader = searchTermsPage.categoryMainPanel.getCategoryHeader(0);
    const firstTerm = searchTermsPage.categoryMainPanel.getItemInColumn(0, 0);
    const secondTerm = searchTermsPage.categoryMainPanel.getItemInColumn(0, 1);
    firstCategoryHeader.getAttribute('style').should.not.containEql(focusedColor);
    firstTerm.getAttribute('style').should.not.containEql(focusedColor);
    secondTerm.getAttribute('style').should.not.containEql(focusedColor);

    browser.keys('ArrowDown');

    firstCategoryHeader.getAttribute('style').should.not.containEql(focusedColor);
    firstTerm.getAttribute('style').should.containEql(focusedColor);
    secondTerm.getAttribute('style').should.not.containEql(focusedColor);

    browser.keys('ArrowDown');

    firstTerm.getAttribute('style').should.not.containEql(focusedColor);
    secondTerm.getAttribute('style').should.containEql(focusedColor);
  });

  it('should search for terms when user press Enter', function () {
    const focusedColor = 'color: rgb(0, 94, 244)';
    const firstCategoryHeader = searchTermsPage.categoryMainPanel.getCategoryHeader(0);
    const firstTerm = searchTermsPage.categoryMainPanel.getItemInColumn(0, 0);
    const secondTerm = searchTermsPage.categoryMainPanel.getItemInColumn(0, 1);
    firstCategoryHeader.getAttribute('style').should.not.containEql(focusedColor);
    firstTerm.getAttribute('style').should.not.containEql(focusedColor);
    secondTerm.getAttribute('style').should.not.containEql(focusedColor);

    browser.keys('ArrowDown');

    firstCategoryHeader.getAttribute('style').should.not.containEql(focusedColor);
    firstTerm.getAttribute('style').should.containEql(focusedColor);
    secondTerm.getAttribute('style').should.not.containEql(focusedColor);

    browser.keys('Enter');
    browser.getUrl().should.match(/\/search\/\?q=community&type=COMMUNITY$/);
  });
});
