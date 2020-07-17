'use strict';

import should from 'should';

import embedTopOfficersPage from '../page-objects/embed-top-officers-page';
import api from '../mock-api';
import { mockCommonApi } from '../mock-data/utils';
import { topOfficersByAllegationData } from '../mock-data/landing-page/common';


should.config.checkProtoEql = false;

describe('embed top officers page', function () {
  beforeEach(function () {
    mockCommonApi();
    api.onGet('/api/v2/officers/top-by-allegation/').reply(200, topOfficersByAllegationData);
    embedTopOfficersPage.open();
    browser.pause(500);
  });

  describe('Officers By Allegation carousel', function () {
    it('should show initial carousel without pin button', function () {
      embedTopOfficersPage.officersByAllegationCarousel.cards.count.should.equal(48);
      embedTopOfficersPage.officersByAllegationCarousel.rightArrow.waitForDisplayed();
      embedTopOfficersPage.officersByAllegationCarousel.leftArrow.waitForDisplayed(2000, true);
      embedTopOfficersPage.officersByAllegationCarousel.leftArrow.waitForDisplayed(2000, true);
      embedTopOfficersPage.officersByAllegationCarousel.firstPinButton.waitForDisplayed(2000, true);
    });

    it('should go to officer summary page when click to card', function () {
      const firstCard = embedTopOfficersPage.officersByAllegationCarousel.cards;
      firstCard.click();
      browser.switchWindow('/officer/');
      browser.getUrl().should.match(/\/officer\/\d+\/[-a-z]+\/?$/);
    });
  });
});
