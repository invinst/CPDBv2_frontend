'use strict';

require('should');

import searchTermsPage from './page-objects/search-terms-page';


describe('Search terms page', function () {
  beforeEach(function () {
    searchTermsPage.open();
  });

  it('should show search term categories in 13ish columns', function () {
    searchTermsPage.categoryMainPanel.categoryColumns.count.should.equal(3);
    searchTermsPage.categoryMainPanel.getColumnNames().should.eql([
      'GEOGRAPHY', 'OFFICERS', 'COMPLAINANTS'
    ]);
    searchTermsPage.categoryMainPanel.categoryItemChunks.count.should.equal(8);
    searchTermsPage.categoryMainPanel.getItemsCountInChunk(1, 1).should.equal(13);
    searchTermsPage.categoryMainPanel.getItemsCountInChunk(2, 1).should.equal(13);
    searchTermsPage.categoryMainPanel.getItemsCountInChunk(2, 5).should.equal(13);
    searchTermsPage.categoryMainPanel.getItemsCountInChunk(2, 6).should.equal(6);
    searchTermsPage.categoryMainPanel.getItemsCountInChunk(3, 1).should.equal(12);
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
});
