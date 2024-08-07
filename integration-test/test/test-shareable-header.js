'use strict';

require('should');

import landingPage from '../page-objects/landing-page';
import searchPage from '../page-objects/search-page';
import searchTermsPage from '../page-objects/search-terms-page';
import trrPage from '../page-objects/trr-page';
import header from '../page-objects/shareable-header';
import officerPage from '../page-objects/officer-page';
import pinboardPage from '../page-objects/pinboard-page';
import api from '../mock-api';
import { groupedSuggestions } from '../mock-data/landing-page/suggestions';
import { trrData } from '../mock-data/trr-page';
import { officerData, timelineItems } from '../mock-data/officer-page/common';
import { mockCommonApi } from '../mock-data/utils';


describe('shareableHeader', function () {
  beforeEach(function () {
    mockCommonApi();
  });

  describe('breadCrumbs', function () {
    it('should show the correct path', function () {
      api.onGet('/api/v1/suggestion/', { term: 'k', limit: 9 }).reply(200, groupedSuggestions['Kelly']);
      api.onGet('/api/v2/officers/1/summary/').reply(200, officerData);

      landingPage.open();
      browser.keys('k');

      searchPage.input.waitForDisplayed();
      searchPage.firstOfficerResult.waitForDisplayed();
      searchPage.firstOfficerResult.click();
      browser.keys('Enter');
      header.breadcrumbs.mainElement.waitForDisplayed();

      const BreadcrumbsItems = header.breadcrumbs.items;
      BreadcrumbsItems.count.should.eql(3);

      header.breadcrumbs.mainElement.getText().should.eql('cpdpSearchBernadette Kelly');
    });

    it('should show breadcrumbs correctly when entering the Search Terms page first', function () {
      api.onGet('/api/v1/suggestion/', { term: 'ke', limit: 9 }).reply(200, groupedSuggestions['Kelly']);
      api.onGet('/api/v2/officers/1/summary/').reply(200, officerData);

      searchTermsPage.open();
      searchPage.input.waitForDisplayed();
      browser.keys('ke');
      searchPage.firstOfficerResult.waitForDisplayed();

      browser.keys('ArrowDown');
      browser.pause(200);
      browser.keys('Enter');

      const BreadcrumbsItems = header.breadcrumbs.items;
      BreadcrumbsItems.count.should.eql(3);
      header.breadcrumbs.mainElement.getText().should.eql('cpdpSearchBernadette Kelly');
    });

    it('should show breadcrumbs correctly when entering the TRR page first', function () {
      api.onGet('/api/v2/trr/1/').reply(200, trrData);
      trrPage.open();

      const BreadcrumbsItems = header.breadcrumbs.items;
      BreadcrumbsItems.count.should.eql(2);
      header.breadcrumbs.mainElement.getText().should.eql('cpdpTRR 1');
    });

    it('should show breadcrumb Officer > TRR when click TRR row through officer timeline', function () {
      api.onGet('/api/v2/trr/1/').reply(200, trrData);
      api.onGet('/api/v2/officers/1/summary/').reply(200, officerData);
      api.onGet('/api/v2/officers/1/new-timeline-items/').reply(200, timelineItems);

      officerPage.open();
      officerPage.tabbedPaneSection.timelineSection.trrItem.waitForDisplayed();
      officerPage.tabbedPaneSection.timelineSection.trrItem.click();

      trrPage.title.waitForDisplayed();

      const BreadcrumbsItems = header.breadcrumbs.items;
      BreadcrumbsItems.count.should.eql(3);
      header.breadcrumbs.mainElement.getText().should.eql('cpdpBernadette KellyTRR 1');
    });

    // TODO: We temporarily skip this test because clicking on complaint item on relevant section
    // does not navigate to complaint page anymore (it shows preview pane instead). We will update
    // the test when the preview page gets updated and has a link to navigate to complaint page.
    it.skip('should show pinboard breadcrumb', function () {
      pinboardPage.open();
      pinboardPage.pinboardSection.pinboardPaneMenu.waitForDisplayed();

      pinboardPage.relevantComplaintsSection.complaintCardSection.incidentDate.click();
      browser.pause(500);
      browser.getUrl().should.match(/\/complaint\/1071234\/$/);

      const BreadcrumbsItems = header.breadcrumbs.items;
      BreadcrumbsItems.count.should.eql(3);
      header.breadcrumbs.mainElement.getText().should.containEql('cpdp').and.containEql('Pinboard');
    });
  });
});
