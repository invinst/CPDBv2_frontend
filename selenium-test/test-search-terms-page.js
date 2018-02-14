'use strict';

var should = require('should');

import searchTermsPage from './page-objects/search-terms-page';


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
    firstCategoryHeader.getAttribute('class').should.containEql('focused');
    firstTerm.getAttribute('class').should.not.containEql('focused');
    secondTerm.getAttribute('class').should.not.containEql('focused');

    browser.keys('ArrowDown');
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

  it('should show PreviewPane when navigation to SearchTerms items', function () {
    searchTermsPage.previewPane.title.getText().should.eql('Geography');

    browser.keys('ArrowDown');
    browser.keys('ArrowDown');

    searchTermsPage.previewPane.title.getText().should.not.eql('Geography');
    searchTermsPage.previewPane.title.getText().should.not.eql('');
  });

  it('should show callToAction bar when it is available', function () {
    searchTermsPage.previewPane.callToAction.waitForVisible(2000, true);

    browser.keys('ArrowDown');
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

  it('should show PreviewPane when a SearchTerms item is clicked', function () {
    browser.keys('ArrowDown');
    browser.keys('ArrowDown');

    searchTermsPage.previewPane.descriptionLink.click();

    browser.getUrl().should.containEql('http://www.somelink.cpdp.com');
  });
});
