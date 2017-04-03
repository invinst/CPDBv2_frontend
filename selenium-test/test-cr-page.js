'use strict';

require('should');

import crPage from './page-objects/cr-page';
import summaryPage from './page-objects/officer-summary-page';


describe('CR page', function () {
  beforeEach(function () {
    crPage.open();
  });

  it('should display complaint content and overlay', function () {
    crPage.header.title.getText().should.equal('CR 1');
    crPage.header.coaccusedDropdownButton.getText().should.equal('Coaccused with Richard Sullivan');

    crPage.infoSection.category.getText().should.equal('Operation/Personnel Violations');
    crPage.infoSection.subcategory.getText().should.equal('NEGLECT OF DUTY/CONDUCT UNBECOMING - ON DUTY');

    crPage.infoSection.officerLabel.getText().should.equal('Officer');
    crPage.infoSection.officerContent.getText().should.equal('Michael Foo');
    crPage.infoSection.officerExtraInfo.getText().should.equal('male, white');
    crPage.infoSection.viewOfficerProfileButton.getText().should.equal('view officer profile');

    crPage.infoSection.complainantLabel.getText().should.equal('Complainant');
    crPage.infoSection.complainantContent.waitForVisible();
    crPage.infoSection.complainantContentItem.count.should.equal(2);

    crPage.infoSection.finalFindingLabel.getText().should.equal('Final Finding');
    crPage.infoSection.finalFindingContent.getText().should.equal('Sustained');

    crPage.infoSection.reccOutcomeLabel.getText().should.equal('Recommended Outcome');
    crPage.infoSection.reccOutcomeContent.getText().should.equal('Separation');

    crPage.infoSection.finalOutcomeLabel.getText().should.equal('Final Outcome');
    crPage.infoSection.finalOutcomeContent.getText().should.equal('Reprimand');
  });

  it('should close bottom sheet, back to Search page when click on overlay', function () {
    crPage.overlay.click();
    browser.getUrl().should.match(/\/search\/$/);
  });

  it('should toggle displaying dropdown coaccused list when click on dropdown button', function () {
    crPage.header.coaccusedDropdownButton.click();
    crPage.header.overlay.waitForVisible();
    crPage.header.coaccusedList.coaccusedText.getText().should.equal('Co-accused');
    crPage.header.coaccusedList.coaccusedItem.count.should.equal(2);

    crPage.header.coaccusedList.firstFullName.getText().should.be.equal('Michael Foo');
    crPage.header.coaccusedList.firstExtraInfo.getText().should.be.equal('male, white');
    crPage.header.coaccusedList.firstCategory.getText().should.be.equal('Operation/Personnel Violations');

    crPage.header.coaccusedList.secondFullName.getText().should.be.equal('Richard Sullivan');
    crPage.header.coaccusedList.secondExtraInfo.getText().should.be.equal('female, white');
    crPage.header.coaccusedList.secondCategory.getText().should.be.equal('Use of Force');

    crPage.header.coaccusedDropdownButton.click();
    crPage.header.overlay.waitForVisible(2000, true);
    crPage.header.coaccusedList.coaccusedItem.waitForVisible(2000, true);
  });

  it('should hide dropdown coaccused list when click on coaccused list overlay', function () {
    crPage.header.coaccusedDropdownButton.click();
    crPage.header.overlay.waitForVisible();
    crPage.header.coaccusedList.coaccusedItem.count.should.equal(2);

    crPage.header.overlay.click();
    crPage.header.overlay.waitForVisible(2000, true);
    crPage.header.coaccusedList.coaccusedItem.waitForVisible(2000, true);
  });

  it('should do nothing when click on viewing coaccused list item', function () {
    crPage.header.coaccusedDropdownButton.click();
    crPage.header.overlay.waitForVisible();
    crPage.header.coaccusedList.firstFullName.click();
    browser.getUrl().should.match(/\/complaint\/1\/1\/$/);
    crPage.header.overlay.waitForVisible();
    crPage.header.coaccusedList.coaccusedItem.count.should.equal(2);
  });

  it('should switch to another officer profile when click on non-viewing coaccused list item', function () {
    crPage.header.coaccusedDropdownButton.click();
    crPage.header.overlay.waitForVisible();
    crPage.header.coaccusedList.secondFullName.click();
    browser.getUrl().should.match(/\/complaint\/1\/2\/$/);
  });

  it('should navigate to officer page when click on view officer profile button', function () {
    crPage.infoSection.viewOfficerProfileButton.click();
    browser.getUrl().should.match(/\/officer\/1\/$/);
    summaryPage.header.officerName.waitForVisible();
  });

  it('should display list of involvements', function () {
    crPage.involvementSection.firstInvolvementType.getText().should.equal('investigator');
    crPage.involvementSection.secondInvolvementType.getText().should.equal('police witnesses');
    crPage.involvementSection.firstOfficer.getText().should.containEql('L. Skol');
    crPage.involvementSection.firstOfficer.getText().should.containEql('126 cases');
    crPage.involvementSection.secondOfficer.getText().should.containEql('R. Piwinicki');
    crPage.involvementSection.secondOfficer.getText().should.containEql('male, white');
  });

  it('should navigate to officer page when we click on officer card', function () {
    crPage.involvementSection.firstOfficer.click();
    browser.getUrl().should.match(/\/officer\/1\/$/);
  });
});
