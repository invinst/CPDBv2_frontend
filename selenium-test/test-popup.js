'use strict';

require('should');

import crPage from './page-objects/cr-page';


describe('Popup', function () {
  beforeEach(function () {
    crPage.open();
  });

  it('should display popup content when click on popup button', function () {
    crPage.accusedOfficers.popupButton.click();
    browser.pause()
    crPage.accusedOfficers.popup.waitForVisible();
    crPage.accusedOfficers.popupTitle.getText().should.equal('Accused Officer');
    crPage.accusedOfficers.popupText.getText().should.equal('Some accused officer explanation');
  });
});
