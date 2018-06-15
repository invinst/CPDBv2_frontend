'use strict';

require('should');

import trrPage from './page-objects/trr-page';


describe('TRR page', function () {
  beforeEach(function () {
    trrPage.open();
  });

  it('should display officer section', function () {
    trrPage.title.waitForVisible();

    trrPage.title.getText().should.equal('TRR 1');
    trrPage.officerSection.officerName.getText().should.equal('Marvel Avengers');
  });


  it('should go to officer profile page when clicking on the View Profile button', function () {
    trrPage.officerSection.officerProfileButton.waitForVisible();
    trrPage.officerSection.officerProfileButton.click();

    browser.getUrl().should.match(/\/officer\/1\/$/);
  });

  it('should go to unit profile page when clicking on the View Unit button', function () {
    trrPage.officerSection.unitProfileButton.waitForVisible();
    trrPage.officerSection.unitProfileButton.click();

    browser.getUrl().should.match(/\/unit\/001\/$/);
  });
});
