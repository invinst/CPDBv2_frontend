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
    searchTermsPage.bottomLinks.backToSearchPageLink.should.ok();
  });

  it('should navigate to Homepage when clicking on backToFrontPageLink', function () {
    searchTermsPage.bottomLinks.backToFrontPageLink.click();
    browser.getUrl().should.match(/\/$/);
  });

  it('should navigate to Search page when clicking on backToSearchPageLink', function () {
    searchTermsPage.bottomLinks.backToSearchPageLink.click();
    browser.getUrl().should.match(/\/search\/$/);
  });

  it('should navigate to Search page when user type in something in search box', function () {
    searchPage.input.waitForDisplayed();
    searchPage.input.setValue('Ke');
    browser.getUrl().should.match(/\/search\/$/);
  });

  it('should navigates between the result when user press the navigation keys', function () {
    const focusedBackground = 'background: rgb(197, 218, 253)';
    const firstCategoryHeader = searchTermsPage.categoryMainPanel.getCategoryHeader(0);
    const firstTerm = searchTermsPage.categoryMainPanel.getItemInColumn(0, 0);
    const secondTerm = searchTermsPage.categoryMainPanel.getItemInColumn(0, 1);
    firstCategoryHeader.getAttribute('style').should.not.containEql(focusedBackground);
    firstTerm.getAttribute('style').should.not.containEql(focusedBackground);
    secondTerm.getAttribute('style').should.not.containEql(focusedBackground);

    browser.keys('ArrowDown');

    firstCategoryHeader.getAttribute('style').should.not.containEql(focusedBackground);
    firstTerm.getAttribute('style').should.containEql(focusedBackground);
    secondTerm.getAttribute('style').should.not.containEql(focusedBackground);

    browser.keys('ArrowDown');

    firstTerm.getAttribute('style').should.not.containEql(focusedBackground);
    secondTerm.getAttribute('style').should.containEql(focusedBackground);
  });

  it('should hide PreviewPane when no item is focused', function () {
    browser.keys('ArrowDown');
    browser.keys('ArrowUp');

    searchTermsPage.previewPane.title.waitForDisplayed(1000, true);
  });

  it('should show PreviewPane when navigating to SearchTerms items', function () {
    browser.keys('ArrowDown');

    searchTermsPage.previewPane.title.getText().should.not.eql('Geography');
    searchTermsPage.previewPane.title.getText().should.not.eql('');
  });

  it('should show callToAction bar when it is available', function () {
    browser.keys('ArrowDown');
    searchTermsPage.previewPane.callToAction.getText().should.containEql('View ALL');
    searchTermsPage.previewPane.callToAction.click();
    browser.getUrl().should.match(/\/search\/\?terms=community&type=COMMUNITY$/);
  });

  it('should show PreviewPane when a SearchTerms item is clicked', function () {
    searchTermsPage.categoryMainPanel.firstCategoryItem.click();

    searchTermsPage.previewPane.title.getText().should.eql('Communities');
  });

  it('should show PreviewPane in the viewport when scroll to bottom', function () {
    browser.keys('ArrowDown');
    browser.scroll(0, 9999);

    searchTermsPage.previewPane.title.isVisibleWithinViewport().should.be.true();
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

  it('should focus back to search box when go to search page', function () {
    searchTermsPage.input.waitForDisplayed();

    browser.keys('ArrowDown');

    searchTermsPage.searchTermsToggle.click();

    browser.getUrl().should.match(/\/search\/$/);

    searchPage.input.setValue('Ke');
    searchPage.suggestionGroup.waitForDisplayed();

    browser.keys('ArrowDown');
    browser.keys('ArrowDown');

    searchPage.clearSearchButton.click();
    searchTermsPage.searchTermsToggle.waitForVisible();
    searchTermsPage.searchTermsToggle.click();

    browser.getUrl().should.match(/\/search\/terms\/$/);

    searchTermsPage.input.waitForVisible();
    searchPage.input.setValue('Some other ');
    browser.keys('T');

    searchTermsPage.input.getValue().should.eql('Some other T');
  });

  it('should show PreviewPane with markdown', function () {
    browser.keys('ArrowDown');

    searchTermsPage.previewPane.descriptionLink.click();

    browser.getUrl().should.containEql('http://www.somelink.lvh.me');
  });
});
