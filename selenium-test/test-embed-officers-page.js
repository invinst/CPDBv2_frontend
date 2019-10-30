'use strict';

import should from 'should';

import embedOfficersPage from './page-objects/embed-officers-page';


should.config.checkProtoEql = false;

describe('embed top officers page', function () {
  beforeEach(function () {
    embedOfficersPage.open('/embed/officers/?ids=1,2,3&title=Some%20title&description=Some%20description');
    browser.pause(500);
  });

  describe('Officers By Allegation carousel', function () {
    it('should show title, description, initial carousel and should not show pin button', function () {
      embedOfficersPage.title.getText().should.eql('Some title');
      embedOfficersPage.description.getText().should.eql('Some description');

      embedOfficersPage.embedOfficersCarousel.cards.count.should.equal(3);
      embedOfficersPage.embedOfficersCarousel.rightArrow.waitForDisplayed();
      embedOfficersPage.embedOfficersCarousel.leftArrow.waitForDisplayed(2000, true);
      embedOfficersPage.embedOfficersCarousel.firstPinButton.waitForDisplayed(2000, true);
    });

    it('should go to officer summary page when click to card', function () {
      const firstCard = embedOfficersPage.embedOfficersCarousel.cards;
      firstCard.click();
      browser.switchWindow('/officer/');
      browser.getUrl().should.match(/\/officer\/\d+\/[-a-z]+\/?$/);
    });
  });
});
