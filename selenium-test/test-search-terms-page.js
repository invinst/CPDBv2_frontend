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

  it('should navigates between the result when user press the navigation keys', function () {
    const firstCategoryHeader = searchTermsPage.categoryMainPanel.getCategoryHeader(0);
    const firstTerm = searchTermsPage.categoryMainPanel.getItemInColumn(0, 0);
    const secondTerm = searchTermsPage.categoryMainPanel.getItemInColumn(0, 1);
    firstCategoryHeader.getAttribute('class').should.not.containEql('focused');
    firstTerm.getAttribute('class').should.not.containEql('focused');
    secondTerm.getAttribute('class').should.not.containEql('focused');

    browser.keys('ArrowDown');

    firstCategoryHeader.getAttribute('class').should.containEql('focused');
    firstTerm.getAttribute('class').should.not.containEql('focused');
    secondTerm.getAttribute('class').should.not.containEql('focused');

    browser.keys('ArrowDown');

    firstCategoryHeader.getAttribute('class').should.not.containEql('focused');
    firstTerm.getAttribute('class').should.containEql('focused');
    secondTerm.getAttribute('class').should.not.containEql('focused');

    browser.keys('ArrowDown');

    firstCategoryHeader.getAttribute('class').should.not.containEql('focused');
    firstTerm.getAttribute('class').should.not.containEql('focused');
    secondTerm.getAttribute('class').should.containEql('focused');
  });

  it('should hide PreviewPane when no item is focused', function () {
    browser.keys('ArrowDown');
    browser.keys('ArrowUp');

    should(searchTermsPage.previewPane).be.eql({});
  });

  it('should show PreviewPane when navigating to SearchTerms items', function () {
    browser.keys('ArrowDown');

    searchTermsPage.previewPane.title.getText().should.eql('Geography');

    browser.keys('ArrowDown');

    searchTermsPage.previewPane.title.getText().should.not.eql('Geography');
    searchTermsPage.previewPane.title.getText().should.not.eql('');
  });

  it('should show callToAction bar when it is available', function () {
    browser.keys('ArrowDown');

    searchTermsPage.previewPane.title.getText().should.eql('Geography');
    searchTermsPage.previewPane.callToAction.waitForVisible(2000, true);

    browser.keys('ArrowDown');
    searchTermsPage.previewPane.callToAction.getText().should.containEql('View ALL');
  });

  it('should show PreviewPane when a SearchTerms category is clicked', function () {
    searchTermsPage.categoryMainPanel.firstCategoryHeader.click();

    searchTermsPage.previewPane.title.getText().should.eql('Geography');
  });

  it('should show PreviewPane when a SearchTerms item is clicked', function () {
    searchTermsPage.categoryMainPanel.firstCategoryItem.click();

    searchTermsPage.previewPane.title.getText().should.eql('Communities');
  });

  it('should show PreviewPane in the viewport when scroll to bottom', function () {
    browser.keys('ArrowDown');
    browser.scroll(0, 9999999);

    searchTermsPage.previewPane.title.isVisibleWithinViewport().should.be.true();
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

  it('should focus back to search box when go to search page', function () {
    searchTermsPage.input.waitForVisible();
    const firstCategoryHeader = searchTermsPage.categoryMainPanel.getCategoryHeader(0);

    browser.keys('ArrowDown');

    firstCategoryHeader.getAttribute('class').should.containEql('focused');

    searchTermsPage.searchTermToggle.click();

    browser.getUrl().should.match(/\/search\/$/);

    searchPage.input.setValue('Ke');
    searchPage.suggestionGroup.waitForVisible();

    browser.keys('ArrowDown');
    browser.keys('ArrowDown');

    searchPage.clearSearchButton.click();
    searchTermsPage.searchTermToggle.waitForVisible();
    searchTermsPage.searchTermToggle.click();

    browser.getUrl().should.match(/\/search\/terms\/$/);

    searchTermsPage.input.waitForVisible();
    searchPage.input.setValue('Some other ');
    browser.keys('T');

    searchTermsPage.input.getValue().should.eql('Some other T');
  });

  it('should show PreviewPane when a SearchTerms category is clicked', function () {
    searchTermsPage.categoryMainPanel.firstCategoryHeader.click();

    searchTermsPage.previewPane.title.getText().should.eql('Geography');
  });

  it('should show PreviewPane when a SearchTerms item is clicked', function () {
    searchTermsPage.categoryMainPanel.firstCategoryItem.click();

    searchTermsPage.previewPane.title.getText().should.eql('Communities');
  });

  it('should show PreviewPane with markdown', function () {
    browser.keys('ArrowDown');
    browser.keys('ArrowDown');

    searchTermsPage.previewPane.descriptionLink.click();

    browser.getUrl().should.containEql('http://www.somelink.cpdp.com');
  });
});
