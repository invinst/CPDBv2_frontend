'use strict';

require('should');

import api from '../mock-api';
import crPage from '../page-objects/cr-page';
import landingPage from '../page-objects/landing-page';
import searchPage from '../page-objects/search-page';
import pinboardPage from '../page-objects/pinboard-page';
import { crData, crPopupData } from '../mock-data/cr-page/common';
import { mockCommonApi } from '../mock-data/utils';
import { pinboardsDetailMenu } from '../mock-data/pinboard-page/manage-pinboards';
import { relatedComplaintsData } from '../mock-data/cr-page/related-complaints';
import { officerData } from '../mock-data/officer-page/common';


describe('CR page', function () {
  beforeEach(function () {
    mockCommonApi();
    api.onGet('/api/v2/cr/1000000/').reply(200, crData);
    api.onGet('/api/v2/popup/', { page: 'complaint' }).reply(200, crPopupData);
    api.onGet('/api/v2/pinboards/', { detail: true }).reply(200, []);
    api
      .onGet('/api/v2/cr/1000000/related-complaints/?match=categories&distance=0.5')
      .reply(200, relatedComplaintsData({ match: 'categories', distance: '0.5' }));

    api
      .onGet('/api/v2/cr/1000000/related-complaints/?distance=0.5&match=categories&offset=20')
      .reply(200, relatedComplaintsData({ match: 'categories', distance: '0.5', nextOffset: 40 }));

    browser.setWindowRect(0, 0, 900, 1000);
  });

  context('cr info', function () {
    beforeEach(function () {
      crPage.open();
    });

    it('should display complaint content', function () {
      crPage.title.getText().should.equal('CR 1000000');
      crPage.category.getText().should.equal('Use Of Force\nMiscellaneous');
      crPage.incidentDate.getText().should.equal('Sep 23, 2003');

      crPage.accusedOfficers.title.getText().should.equal('25 ACCUSED OFFICERS');
      crPage.accusedOfficers.card.count.should.equal(25);
      crPage.accusedOfficers.firstCard.rank.getText().should.equal('Officer');
      crPage.accusedOfficers.firstCard.name.getText().should.equal('Bernadette Kelly');
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

    it('should render correct radar color of accused officers', function () {
      crPage.accusedOfficers.firstRadarChart
        .getCSSProperty('background-color').value.should.eql('rgba(245,37,36,1)');
    });

    it('should navigate to officer page when we click on accused officer card', function () {
      api.onGet('/api/v2/officers/1/summary/').reply(200, officerData);

      crPage.accusedOfficers.firstCard.mainElement.click();
      browser.getUrl().should.match(/\/officer\/1\/bernadette-kelly\/$/);
    });

    it('should render correct radar color of investigator item', function () {
      crPage.investigator.firstRadarChart
        .getCSSProperty('background-color').value.should.eql('rgba(255,100,83,1)');
    });

    it('should navigate to officer page when we click on investigator item', function () {
      api.onGet('/api/v2/officers/1/summary/').reply(200, officerData);

      crPage.investigator.firstItem.click();
      browser.getUrl().should.match(/\/officer\/1\/bernadette-kelly\/$/);
    });

    it('should navigate to search page when click on investigator item which does not link to officer', function () {
      crPage.investigator.secondItem.click();
      browser.getUrl().should.containEql('/search/?q=Edward%20May');
    });

    it('should render correct radar color of police witness item', function () {
      crPage.policeWitness.firstRadarChart
        .getCSSProperty('background-color').value.should.eql('rgba(245,37,36,1)');
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
      api.onPost('/api/v2/cr/1000000/request-document/', { email: 'valid@email.com' })
        .reply(200, { 'message': 'Thanks for subscribing.', crid: 1000000 });

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
      api.onPost('/api/v2/cr/1000000/request-document/', { email: 'invalid@email.com' })
        .reply(400, { 'message': 'Sorry, we can not subscribe your email' });

      crPage.attachments.documentRequestButton.click();
      crPage.documentRequestModal.emailInput.waitForDisplayed();
      crPage.documentRequestModal.emailInput.setValue('invalid@email.com');
      crPage.documentRequestModal.submitButton.click();
      crPage.documentRequestModal.messageBox.waitForDisplayed();
      crPage.documentRequestModal.messageBox.getText().should.equal('Sorry, we can not subscribe your email');
    });
  });

  describe('related by categories carousel', function () {
    beforeEach(function () {
      crPage.open();
    });

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
      crPage.open();
      crPage.accusedOfficers.firstCard.pinButton.click();
      crPage.lastToast.waitForDisplayed();
      crPage.lastToast.waitForText(
        'Officer Bernadette Kelly 42-year-old white male, with 43 complaints, 1 sustained added.' +
        '\nGo to pinboard'
      );

      crPage.landingPageBreadCrumb.click();
      landingPage.searchSection.mainElement.waitForDisplayed();
      landingPage.searchSection.mainElement.click();
      searchPage.pinboardButton.waitForText('Pinboard (1)');
      browser.back();
      browser.back();

      crPage.accusedOfficers.firstCard.pinButton.click();
      crPage.lastToast.waitForDisplayed();
      crPage.lastToast.waitForText(
        'Officer Bernadette Kelly 42-year-old white male, with 43 complaints, 1 sustained removed.' +
        '\nGo to pinboard'
      );

      crPage.landingPageBreadCrumb.click();
      landingPage.searchSection.mainElement.waitForDisplayed();
      landingPage.searchSection.mainElement.click();
      searchPage.input.waitForDisplayed();
      searchPage.pinboardButton.waitForDisplayed(500, true);
    });

    it('should display toast when pinning a related complaint', function () {
      crPage.open();
      crPage.relatedByCategoriesCarousel.firstPinButton.click();
      crPage.lastToast.waitForDisplayed();
      crPage.lastToast.waitForText(
        'CR #123456 categorized as Use Of Force happened in Jan 1, 2000 added.' +
        '\nGo to pinboard'
      );

      crPage.landingPageBreadCrumb.click();
      landingPage.searchSection.mainElement.waitForDisplayed();
      landingPage.searchSection.mainElement.click();
      searchPage.pinboardButton.waitForText('Pinboard (1)');
      browser.back();
      browser.back();

      crPage.relatedByCategoriesCarousel.firstPinButton.click();
      crPage.lastToast.waitForDisplayed();
      crPage.lastToast.waitForText(
        'CR #123456 categorized as Use Of Force happened in Jan 1, 2000 removed.' +
        '\nGo to pinboard'
      );

      crPage.landingPageBreadCrumb.click();
      landingPage.searchSection.mainElement.waitForDisplayed();
      landingPage.searchSection.mainElement.click();
      searchPage.input.waitForDisplayed();
      searchPage.pinboardButton.waitForDisplayed(500, true);
    });

    context('current complaint', function () {
      context('when user has no or only one active pinboard', function () {
        it('should display toast when pinning', function () {
          crPage.open();
          crPage.pinButton.click();
          crPage.lastToast.waitForDisplayed();
          crPage.lastToast.waitForText(
            'CR #1000000 categorized as Use Of Force happened in 2003-09-23 added.' +
            '\nGo to pinboard'
          );

          crPage.landingPageBreadCrumb.click();
          landingPage.searchSection.mainElement.waitForDisplayed();
          landingPage.searchSection.mainElement.click();
          searchPage.pinboardButton.waitForText('Pinboard (1)');
        });

        it('should display toast when unpinning', function () {
          crPage.open();
          crPage.pinButton.click();
          crPage.lastToast.waitForDisplayed();
          crPage.lastToast.waitForText(
            'CR #1000000 categorized as Use Of Force happened in 2003-09-23 added.' +
            '\nGo to pinboard'
          );

          crPage.pinButton.click();
          crPage.lastToast.waitForDisplayed();
          crPage.lastToast.waitForText(
            'CR #1000000 categorized as Use Of Force happened in 2003-09-23 removed.' +
            '\nGo to pinboard'
          );

          crPage.landingPageBreadCrumb.click();
          landingPage.searchSection.mainElement.waitForDisplayed();
          landingPage.searchSection.mainElement.click();
          searchPage.input.waitForDisplayed();
          searchPage.pinboardButton.waitForDisplayed(500, true);
        });
      });

      context('when user has more than 1 pinboard', function () {
        beforeEach(function () {
          api.onGet('/api/v2/pinboards/', { detail: true }).reply(200, pinboardsDetailMenu.pinboards);
          api.onGet('/api/v2/pinboards/8d2daffe/').reply(200, pinboardsDetailMenu.pinboards[0]);
          api.onGet('/api/v2/cr/1000000/').reply(200, crData);
          crPage.open();
        });

        it('should display pinboards menu', function () {
          crPage.pinboardsMenuSection.addToPinboardButton.click();
          crPage.pinboardsMenuSection.menu.waitForDisplayed();

          crPage.pinboardsMenuSection.items.waitForCount(5, 1000);
          crPage.pinboardsMenuSection.firstItemTitle.getText().should.equal('Skrull Cap');
          crPage.pinboardsMenuSection.firstItemCreatedAt.getText().should.equal('Created Mar 09, 2020');
          crPage.pinboardsMenuSection.secondItemTitle.getText().should.equal('Watts Crew');
          crPage.pinboardsMenuSection.secondItemCreatedAt.getText().should.equal('Created Mar 09, 2020');
          crPage.pinboardsMenuSection.thirdItemTitle.getText().should.equal('');
          crPage.pinboardsMenuSection.thirdItemCreatedAt.getText().should.equal('Created Mar 09, 2020');
        });

        it('should close pinboards menu when click outside', function () {
          crPage.pinboardsMenuSection.addToPinboardButton.click();
          crPage.pinboardsMenuSection.menu.waitForDisplayed();
          crPage.title.click();
          crPage.pinboardsMenuSection.menu.waitForDisplayed(500, true);
        });

        it('should display toast when pinning', function () {
          api
            .onPut('/api/v2/pinboards/8d2daffe/', pinboardsDetailMenu.updateRequestParams[1])
            .reply(200, pinboardsDetailMenu.updatedPinboards[1]);

          crPage.pinboardsMenuSection.addToPinboardButton.click();
          crPage.pinboardsMenuSection.menu.waitForDisplayed();

          crPage.pinboardsMenuSection.firstItemPinButton.click();
          crPage.lastToast.waitForDisplayed();
          crPage.lastToast.waitForText(
            'CR #1000000 categorized as Use Of Force happened in 2003-09-23 added.' +
            '\nGo to pinboard'
          );

          crPage.landingPageBreadCrumb.click();
          landingPage.searchSection.mainElement.waitForDisplayed();
          landingPage.searchSection.mainElement.click();
          searchPage.pinboardButton.waitForText('Pinboard (4)');
        });

        it('should display toast when unpinning', function () {
          api
            .onPut('/api/v2/pinboards/8d2daffe/', pinboardsDetailMenu.updateRequestParams[1])
            .reply(200, pinboardsDetailMenu.updatedPinboards[1]);

          crPage.pinboardsMenuSection.addToPinboardButton.click();
          crPage.pinboardsMenuSection.menu.waitForDisplayed();

          crPage.pinboardsMenuSection.firstItemPinButton.click();
          crPage.lastToast.waitForDisplayed();
          crPage.lastToast.waitForText(
            'CR #1000000 categorized as Use Of Force happened in 2003-09-23 added.' +
            '\nGo to pinboard'
          );
          crPage.pinboardsMenuSection.addToPinboardButton.moveTo(); // Move mouse outside of toast message
          crPage.lastToast.waitForDisplayed(5000, true);

          crPage.pinboardsMenuSection.addToPinboardButton.click();
          crPage.pinboardsMenuSection.menu.waitForDisplayed();

          crPage.pinboardsMenuSection.firstItemPinButton.click();
          crPage.lastToast.waitForDisplayed();
          crPage.lastToast.waitForText(
            'CR #1000000 categorized as Use Of Force happened in 2003-09-23 removed.' +
            '\nGo to pinboard'
          );

          crPage.landingPageBreadCrumb.click();
          landingPage.searchSection.mainElement.waitForDisplayed();
          landingPage.searchSection.mainElement.click();
          searchPage.pinboardButton.waitForText('Pinboard (3)');
        });

        it('should create new pinboard with current complaint', function () {
          api
            .onPost('/api/v2/pinboards/', pinboardsDetailMenu.createPinboardRequestParams[1])
            .reply(201, pinboardsDetailMenu.createdPinboards[1]);
          api
            .onGet(`/api/v2/pinboards/${pinboardsDetailMenu.createdPinboards[1].id}/`)
            .reply(201, pinboardsDetailMenu.createdPinboards[1]);
          api
            .onGet(`/api/v2/pinboards/${pinboardsDetailMenu.createdPinboards[1].id}/complaints/`)
            .reply(200, [crData]);

          crPage.pinboardsMenuSection.addToPinboardButton.click();
          crPage.pinboardsMenuSection.menu.waitForDisplayed();
          crPage.pinboardsMenuSection.createPinboardWithSelectionButton.click();

          browser.waitForUrl(url => url.should.match(/\/pinboard\/f7295a74\/untitled-pinboard\/$/), 1000);
          pinboardPage.pinnedSection.crs.cards.waitForCount(1, 3000);
          pinboardPage.pinnedSection.crs.firstCardDate.getText().should.equal('2003-09-23');
        });
      });
    });
  });
});
