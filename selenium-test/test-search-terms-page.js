'use strict';

require('should');

import searchTermsPage from './page-objects/search-terms-page';


describe('Search terms page', function () {
  beforeEach(function () {
    searchTermsPage.open();
  });

  it('should reveal category item description when click on a category item', function () {
    const firstCategoryItem = searchTermsPage.categoryMainPanel.firstCategoryItem;
    firstCategoryItem.getText().should.containEql('Police District');
    firstCategoryItem.element('.link--transition').click();
    browser.pause(300);
    firstCategoryItem.element('.test--category-item-description')
      .getText().should.containEql('Whatever');
  });

  it('should expand one category item at a time', function () {
    searchTermsPage.categoryMainPanel.getCategoryNameAtItem(1).click();
    searchTermsPage.categoryMainPanel.getCategoryDescriptionAtItem(1).isExisting().should.be.true();
    searchTermsPage.categoryMainPanel.getCategoryDescriptionAtItem(2).isExisting().should.be.false();

    searchTermsPage.categoryMainPanel.getCategoryNameAtItem(2).click();
    browser.pause(1000);
    searchTermsPage.categoryMainPanel.getCategoryDescriptionAtItem(2).isExisting().should.be.true();
    searchTermsPage.categoryMainPanel.getCategoryDescriptionAtItem(1).isExisting().should.be.false();
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
});
