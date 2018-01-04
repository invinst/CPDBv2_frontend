'use strict';

require('should');

import landingPage from './page-objects/landing-page';
import searchPage from './page-objects/search-page';
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

      const breadcrumbsItems = header.breadcrumbs.items;
      breadcrumbsItems.count.should.eql(3);

      header.breadcrumbs.mainElement.getText().should.eql('HomeSearchBernadette Kelly');
    });
  });
});
