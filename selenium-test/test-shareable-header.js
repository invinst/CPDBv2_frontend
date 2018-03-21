'use strict';

require('should');

import landingPage from './page-objects/landing-page';
import searchPage from './page-objects/search-page';
import searchTermsPage from './page-objects/search-terms-page';
import header from './page-objects/shareable-header';


describe('shareableHeader', function () {
  describe('breadCrumbs', function () {
    it('should show the correct path', function () {
      landingPage.open();
      browser.keys('ke');
      searchPage.input.waitForVisible();
      searchPage.firstOfficerResult.waitForVisible();
      searchPage.firstOfficerResult.click();
      header.breadcrumbs.mainElement.waitForVisible();

      const BreadcrumbsItems = header.breadcrumbs.items;
      BreadcrumbsItems.count.should.eql(3);

      header.breadcrumbs.mainElement.getText().should.eql('cpdpSearchBernadette Kelly');
    });

    it('should show breadcrumbs correctly when entering the Search Terms page first', function () {
      searchTermsPage.open();
      searchTermsPage.searchTermsToggle.click();
      searchPage.input.waitForVisible();
      browser.keys('ke');
      searchPage.firstOfficerResult.waitForVisible();

      browser.keys('ArrowDown');
      browser.pause(200);
      browser.keys('Enter');

      const BreadcrumbsItems = header.breadcrumbs.items;
      BreadcrumbsItems.count.should.eql(3);
      header.breadcrumbs.mainElement.getText().should.eql('cpdpSearchBernadette Kelly');
    });
  });
});
