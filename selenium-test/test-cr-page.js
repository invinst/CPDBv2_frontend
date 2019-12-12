'use strict';

require('should');

import crPage from './page-objects/cr-page';
import landingPage from './page-objects/landing-page';
import searchPage from './page-objects/search-page';


describe('CR page', function () {
  beforeEach(function () {
    crPage.open();
    browser.setWindowRect(0, 0, 900, 1000);
  });

  it('should display complaint content', function () {
    crPage.title.getText().should.equal('CR 1000000');
    crPage.category.getText().should.equal('Use Of Force\nMiscellaneous');
    crPage.incidentDate.getText().should.equal('Sep 23, 2003');

    crPage.accusedOfficers.title.getText().should.equal('25 ACCUSED OFFICERS');
    crPage.accusedOfficers.card.count.should.equal(25);
    crPage.accusedOfficers.firstCard.rank.getText().should.equal('Officer');
    crPage.accusedOfficers.firstCard.name.getText().should.equal('Ridchard Sullivan');
    crPage.accusedOfficers.firstCard.metric.getText().should.equal('43 allegations 1 sustained');
    crPage.accusedOfficers.firstCard.percentile.getText().should.equal('More than 99% of other officers');
    crPage.accusedOfficers.firstCard.demographic.getText().should.equal('42-year-old white male');
    crPage.accusedOfficers.firstCard.category.getText().should.equal('False Arrest');
    crPage.accusedOfficers.firstCard.outcome.getText().should.equal('Reprimand');

    crPage.summarySection.firstVictim.getText().should.equal('Black, Male, Age 53');
    crPage.summarySection.firstComplainant.getText().should.equal('Black, Male, Age 53');
    crPage.summarySection.summary.getText().should.equal('Summary');

    crPage.attachments.card.count.should.equal(10);
    crPage.attachments.firstCard.title.getText().should.equal('CR Document');
    crPage.attachments.firstCard.element.getAttribute('href').should.equal('http://cr-document.com/');

    crPage.investigationTimeline.getText().should.equal(
      'Sep 23, 2003\nIncident Occurs\nComplaint Filed\nMar 16, 2004\nInvestigation Closed'
    );

    crPage.investigator.item.count.should.equal(2);
    crPage.investigator.firstItem.getText().should.equal('Bernadette Kelly\nCPD');
    crPage.policeWitness.item.count.should.equal(2);
    crPage.policeWitness.firstItem.getText().should.equal('Raymond Piwinicki\n3 allegations 0 sustained');

    crPage.location.address.getText().should.equal('3510 Michigan Ave, Chicago, IL 60653');
    crPage.location.locationType.getText().should.equal('Police Building');
    crPage.location.beat.getText().should.equal('2551');
  });

  it('should show full list of accused officers when click on show more button', function () {
    crPage.accusedOfficers.showMoreButton.isDisplayed().should.be.true();
    crPage.accusedOfficers.showMoreButton.click();
    crPage.accusedOfficers.showMoreButton.isDisplayed().should.be.false();
  });

  it('should navigate to officer page when we click on accused officer card', function () {
    crPage.accusedOfficers.firstCard.mainElement.click();
    browser.getUrl().should.match(/\/officer\/1\/bernadette-kelly\/$/);
  });

  it('should navigate to officer page when we click on investigator item', function () {
    crPage.investigator.firstItem.click();
    browser.getUrl().should.match(/\/officer\/1\/bernadette-kelly\/$/);
  });

  it('should navigate to officer page when we click on investigator item which does not link to officer', function () {
    crPage.investigator.secondItem.click();
    browser.getUrl().should.containEql('/search/?terms=Edward%20May');
  });

  it('should navigate to officer page when we click on police witness item', function () {
    crPage.policeWitness.firstItem.click();
    browser.getUrl().should.match(/\/officer\/3\/[-a-z]+\/?$/);
  });

  it('should show request document modal when clicks on "Request Document"', function () {
    crPage.attachments.documentRequestButton.click();
    crPage.documentRequestModal.emailInput.waitForDisplayed();
  });

  it('should accept valid email, and close modal after 1.5s', function () {
    crPage.attachments.documentRequestButton.click();
    crPage.documentRequestModal.emailInput.waitForDisplayed();
    crPage.documentRequestModal.emailInput.setValue('valid@email.com');
    crPage.documentRequestModal.submitButton.click();
    crPage.documentRequestModal.messageBox.waitForDisplayed();
    crPage.documentRequestModal.messageBox.getText().should.equal('Thanks for subscribing.');
    crPage.documentRequestModal.content.waitForDisplayed(2000, true);
    crPage.attachments.documentRequestButton.getText().should.equal('Documents Requested   ✔');
  });

  it('should ignore invalid email', function () {
    crPage.attachments.documentRequestButton.click();
    crPage.documentRequestModal.emailInput.waitForDisplayed();
    crPage.documentRequestModal.emailInput.setValue('invalid@email.com');
    crPage.documentRequestModal.submitButton.click();
    crPage.documentRequestModal.messageBox.waitForDisplayed();
    crPage.documentRequestModal.messageBox.getText().should.equal('Sorry, we can not subscribe your email');
  });

  describe('related by categories carousel', function () {
    it('should show more complaints cards when click right arrow', function () {
      crPage.relatedByCategoriesCarousel.cardAtIndex(6).isDisplayedInViewport().should.be.false();
      crPage.relatedByCategoriesCarousel.rightArrow.click();
      crPage.relatedByCategoriesCarousel.cardAtIndex(6).waitForDisplayed(true);
    });

    it('should show previous complaints when click left arrow', function () {
      crPage.relatedByCategoriesCarousel.rightArrow.click();
      crPage.relatedByCategoriesCarousel.cardAtIndex(6).waitForDisplayed();
      crPage.relatedByCategoriesCarousel.cardAtIndex(1).waitForDisplayedInViewport(5000, true);
      crPage.relatedByCategoriesCarousel.leftArrow.click();
      crPage.relatedByCategoriesCarousel.cardAtIndex(1).waitForDisplayed();
    });

    it('should slide back to beginning when change distance', function () {
      crPage.relatedByCategoriesCarousel.rightArrow.click();
      crPage.relatedByCategoriesCarousel.cardAtIndex(6).waitForDisplayed();
      crPage.distanceDropdown.button.click();
      crPage.distanceDropdown.options.waitForDisplayed();
      crPage.distanceDropdown.getOption('5 MILES').click();
      crPage.relatedByCategoriesCarousel.cardAtIndex(1).waitForDisplayed();
      crPage.relatedByCategoriesCarousel.cardAtIndex(6).waitForDisplayedInViewport(5000, true);
    });

    it('should load more cards when slide to threshold', function () {
      crPage.relatedByCategoriesCarousel.cards.count.should.equal(20);
      crPage.relatedByCategoriesCarousel.rightArrow.click();
      crPage.relatedByCategoriesCarousel.rightArrow.click();
      crPage.relatedByCategoriesCarousel.rightArrow.click();
      crPage.relatedByCategoriesCarousel.rightArrow.click();
      crPage.relatedByCategoriesCarousel.rightArrow.click();
      crPage.relatedByCategoriesCarousel.rightArrow.waitForDisplayed();
      crPage.relatedByCategoriesCarousel.cards.count.should.equal(40);
    });
  });

  describe('Pinboard function', function () {
    it('should display toast when pinning a coaccusal', function () {
      crPage.accusedOfficers.firstCard.pinButton.click();
      crPage.lastToast.waitForDisplayed();
      crPage.lastToast.waitForText('Officer added');

      crPage.landingPageBreadCrumb.click();
      landingPage.searchSection.mainElement.waitForDisplayed();
      landingPage.searchSection.mainElement.click();
      searchPage.pinboardButton.waitForText('Pinboard (1)');
      browser.back();
      browser.back();

      crPage.accusedOfficers.firstCard.pinButton.click();
      crPage.lastToast.waitForDisplayed();
      crPage.lastToast.waitForText('Officer removed');

      crPage.landingPageBreadCrumb.click();
      landingPage.searchSection.mainElement.waitForDisplayed();
      landingPage.searchSection.mainElement.click();
      searchPage.pinboardButton.waitForText('Pinboard (0)');
    });

    it('should display toast when pinning a related complaint', function () {
      crPage.relatedByCategoriesCarousel.firstPinButton.click();
      crPage.lastToast.waitForDisplayed();
      crPage.lastToast.waitForText('CR added');

      crPage.landingPageBreadCrumb.click();
      landingPage.searchSection.mainElement.waitForDisplayed();
      landingPage.searchSection.mainElement.click();
      searchPage.pinboardButton.waitForText('Pinboard (1)');
      browser.back();
      browser.back();

      crPage.relatedByCategoriesCarousel.firstPinButton.click();
      crPage.lastToast.waitForDisplayed();
      crPage.lastToast.waitForText('CR removed');

      crPage.landingPageBreadCrumb.click();
      landingPage.searchSection.mainElement.waitForDisplayed();
      landingPage.searchSection.mainElement.click();
      searchPage.pinboardButton.waitForText('Pinboard (0)');
    });
  });
});
