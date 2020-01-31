'use strict';

import moment from 'moment';

require('should');

import pinboardAdminPage from './page-objects/pinboard-admin-page';
import shareableHeader from './page-objects/shareable-header';


describe('Pinboard Admin Page', function () {
  beforeEach(function () {
    pinboardAdminPage.open();
  });

  it('should show login modal to unauthenticated user', function () {
    pinboardAdminPage.loginScreen.loginModal.waitForDisplayed();

    browser.keys('Escape');
    browser.waitForUrl(url => url.should.match(/\/edit\/view-all-pinboards\/$/), 500);
    pinboardAdminPage.loginScreen.loginModal.waitForDisplayed();

    browser.keys('Escape');
    browser.waitForUrl(url => url.should.not.match(/\/edit\//), 500);
    browser.getUrl().should.match(/\/view-all-pinboards\/$/);
    pinboardAdminPage.loginScreen.loginModal.waitForDisplayed();
  });

  it('should show no pinboards to unauthenticated user', function () {
    pinboardAdminPage.pinboardTables.pinboardRows.count.should.equal(0);

    pinboardAdminPage.pinboardTables.headerRow.id.getText().should.equal('ID');
    pinboardAdminPage.pinboardTables.headerRow.title.getText().should.equal('PINBOARD');
    pinboardAdminPage.pinboardTables.headerRow.pinned.getText().should.equal('PINNED ITEMS');
    pinboardAdminPage.pinboardTables.headerRow.date.getText().should.equal('DATE');
  });

  it('should has a breadcrumb item', function () {
    shareableHeader.breadcrumbs.firstItem.getText().should.equal('cpdp');
    shareableHeader.breadcrumbs.secondItem.getText().should.equal('View all pinboards');
  });

  context('Authenticated', function () {
    beforeEach(function () {
      pinboardAdminPage.loginScreen.loginModal.waitForDisplayed();
      pinboardAdminPage.loginScreen.login();
    });

    it('should show latest pinboards info', function () {
      const firstPinboardRow = pinboardAdminPage.pinboardTables.firstPinboardRow;
      const secondPinboardRow = pinboardAdminPage.pinboardTables.secondPinboardRow;

      firstPinboardRow.id.getText().should.equal('18a5b091');
      firstPinboardRow.title.getText().should.equal('Pinboard 18a5b091 Title');
      firstPinboardRow.pinned.getText().should.equal('10 officers, 8 allegations and 9 TRRS');
      firstPinboardRow.children.getText().should.equal('2');
      firstPinboardRow.date.getText().should.equal('Nov 04');

      secondPinboardRow.id.getText().should.equal('f0e5eba4');
      secondPinboardRow.title.getText().should.equal('Untitled Pinboard');
      secondPinboardRow.pinned.getText().should.equal('1 officer, 0 allegations and 0 TRRS');
      secondPinboardRow.children.getText().should.equal('3');
      secondPinboardRow.date.getText().should.equal('Nov 01');
    });

    it('should show latest pinboards first and load more when scrolling down', function () {
      pinboardAdminPage.pinboardTables.pinboardRows.count.should.equal(10);

      pinboardAdminPage.pinboardTables.secondMonthSeparator.scrollIntoView({ behavior: 'smooth' });

      pinboardAdminPage.pinboardTables.pinboardRows.waitForCount(20, 2000);
    });

    describe('Pinboard Preview Pane', function () {
      beforeEach(function () {
        pinboardAdminPage.pinboardTables.firstPinboardRow.mainElement.click();
      });

      it('should open after clicking on a pinboard row', function () {
        const createdAt = moment('2019-11-04T09:12:20.798703Z').format('lll');

        pinboardAdminPage.pinboardPreviewPane.callToAction.getText().should.equal('View Pinboard');
        pinboardAdminPage.pinboardPreviewPane.title.getText().should.equal('Pinboard 18a5b091 Title');
        pinboardAdminPage.pinboardPreviewPane.description.getText().should.equal(
          'It will be a tough election and\n' +
          'we are going to do the best we\n' +
          'can he added'
        );
        pinboardAdminPage.pinboardPreviewPane.info.createdAtTitle.getText().should.equal('Created at');
        pinboardAdminPage.pinboardPreviewPane.info.createdAtValue.getText().should.equal(createdAt);
        pinboardAdminPage.pinboardPreviewPane.info.childrenTitle.getText().should.equal('Children');
        pinboardAdminPage.pinboardPreviewPane.info.childrenValue.getText().should.equal('2');
        pinboardAdminPage.pinboardPreviewPane.socialGraph.isDisplayed().should.be.true();

        const pinnedOfficers = pinboardAdminPage.pinboardPreviewPane.pinnedOfficers;
        pinnedOfficers.header.getText().should.equal('10 PINNED OFFICERS');
        pinnedOfficers.items.count.should.equal(3);
        pinnedOfficers.viewMoreButton.isDisplayed().should.be.true();

        pinnedOfficers.firstItem.name.getText().should.equal('Timothy Mc Dermott');
        pinnedOfficers.firstItem.subText.getText().should.equal('32 allegations');
        pinnedOfficers.firstItem.visualToken.isDisplayed().should.be.true();

        pinnedOfficers.secondItem.name.getText().should.equal('James Sanchez');
        pinnedOfficers.secondItem.subText.getText().should.equal('94 allegations');
        pinnedOfficers.secondItem.visualToken.isDisplayed().should.be.true();

        pinnedOfficers.thirdItem.name.getText().should.equal('Keith Herrera');
        pinnedOfficers.thirdItem.subText.getText().should.equal('80 allegations');
        pinnedOfficers.thirdItem.visualToken.isDisplayed().should.be.true();

        const pinnedAllegations = pinboardAdminPage.pinboardPreviewPane.pinnedAllegations;
        pinnedAllegations.header.getText().should.equal('8 PINNED ALLEGATIONS');
        pinnedAllegations.items.count.should.equal(3);
        pinnedAllegations.viewMoreButton.isDisplayed().should.be.true();

        pinnedAllegations.firstItem.name.getText().should.equal('Use Of Force');
        pinnedAllegations.firstItem.subText.getText().should.equal('Jun 30, 2005');
        pinnedAllegations.firstItem.visualToken.isDisplayed().should.be.false();

        pinnedAllegations.secondItem.name.getText().should.equal('Use Of Force');
        pinnedAllegations.secondItem.subText.getText().should.equal('Sep 29, 2005');
        pinnedAllegations.secondItem.visualToken.isDisplayed().should.be.false();

        pinnedAllegations.thirdItem.name.getText().should.equal('Verbal Abuse');
        pinnedAllegations.thirdItem.subText.getText().should.equal('Jun 17, 2007');
        pinnedAllegations.thirdItem.visualToken.isDisplayed().should.be.false();

        const pinnedTRRs = pinboardAdminPage.pinboardPreviewPane.pinnedTRRs;
        pinnedTRRs.header.getText().should.equal('9 PINNED TRRS');
        pinnedTRRs.items.count.should.equal(3);
        pinnedTRRs.viewMoreButton.isDisplayed().should.be.true();

        pinnedTRRs.firstItem.name.getText().should.equal('Physical Force - Stunning');
        pinnedTRRs.firstItem.subText.getText().should.equal('Jul 5, 2004');
        pinnedTRRs.firstItem.visualToken.isDisplayed().should.be.false();

        pinnedTRRs.secondItem.name.getText().should.equal('Physical Force - Stunning');
        pinnedTRRs.secondItem.subText.getText().should.equal('Jul 5, 2004');
        pinnedTRRs.secondItem.visualToken.isDisplayed().should.be.false();

        pinnedTRRs.thirdItem.name.getText().should.equal('Physical Force - Stunning');
        pinnedTRRs.thirdItem.subText.getText().should.equal('Jul 5, 2004');
        pinnedTRRs.thirdItem.visualToken.isDisplayed().should.be.false();
      });

      it('should close when clicking on overlay', function () {
        pinboardAdminPage.overlay.waitForDisplayed();
        pinboardAdminPage.pinboardPreviewPane.title.waitForDisplayed();

        pinboardAdminPage.overlay.click();
        pinboardAdminPage.pinboardPreviewPane.title.waitForDisplayed(1000, true);
      });

      it('should not show View More button if there are 3 items or less', function () {
        pinboardAdminPage.overlay.waitForDisplayed();
        pinboardAdminPage.overlay.click();
        pinboardAdminPage.overlay.waitForDisplayed(1000, true);

        pinboardAdminPage.pinboardTables.secondPinboardRow.mainElement.click();
        pinboardAdminPage.pinboardPreviewPane.title.waitForDisplayed();
        pinboardAdminPage.pinboardPreviewPane.pinnedOfficers.viewMoreButton.isDisplayed().should.be.false();
      });

      it('should show and hide other officers when clicking on view more button', function () {
        const pinnedOfficers = pinboardAdminPage.pinboardPreviewPane.pinnedOfficers;
        pinnedOfficers.items.count.should.equal(3);
        pinnedOfficers.viewMoreButton.isDisplayed().should.be.true();

        pinnedOfficers.viewMoreButton.click();
        pinnedOfficers.items.count.should.equal(10);

        pinnedOfficers.lastCollapsableItem.waitForDisplayed();
        pinnedOfficers.viewMoreButton.click();
        pinnedOfficers.lastCollapsableItem.waitForDisplayed(1000, true);
      });

      it('should show and hide other allegations when clicking on view more button', function () {
        const pinnedAllegations = pinboardAdminPage.pinboardPreviewPane.pinnedAllegations;
        pinnedAllegations.viewMoreButton.scrollIntoView();

        pinnedAllegations.items.count.should.equal(3);

        pinnedAllegations.viewMoreButton.click();
        pinnedAllegations.items.count.should.equal(8);

        pinnedAllegations.lastCollapsableItem.waitForDisplayed();
        pinnedAllegations.viewMoreButton.click();
        pinnedAllegations.lastCollapsableItem.waitForDisplayed(1000, true);
      });

      it('should show and hide other TRRs when clicking on view more button', function () {
        const pinnedTRRs = pinboardAdminPage.pinboardPreviewPane.pinnedTRRs;
        pinnedTRRs.viewMoreButton.scrollIntoView();

        pinnedTRRs.items.count.should.equal(3);

        pinnedTRRs.viewMoreButton.click();
        pinnedTRRs.items.count.should.equal(9);

        pinnedTRRs.lastCollapsableItem.waitForDisplayed();
        pinnedTRRs.viewMoreButton.click();
        pinnedTRRs.lastCollapsableItem.waitForDisplayed(1000, true);
      });

      it('should open pinboard page when clicking on View Pinboard', function () {
        pinboardAdminPage.pinboardPreviewPane.callToAction.waitForDisplayed();
        pinboardAdminPage.pinboardPreviewPane.callToAction.click();

        browser.getUrl().should.match(/\/pinboard\/18a5b091\//);
      });

      it('should open officer page clicking on any officer item', function () {
        const pinnedOfficers = pinboardAdminPage.pinboardPreviewPane.pinnedOfficers;
        pinnedOfficers.firstItem.mainElement.waitForDisplayed();
        pinnedOfficers.firstItem.mainElement.click();

        browser.getUrl().should.match(/\/officer\/18076\/timothy-mc-dermott\//);
      });

      it('should open cr page clicking on any allegation item', function () {
        const pinnedAllegations = pinboardAdminPage.pinboardPreviewPane.pinnedAllegations;
        pinnedAllegations.firstItem.mainElement.waitForDisplayed();
        pinnedAllegations.firstItem.mainElement.click();

        browser.getUrl().should.match(/\/complaint\/306637\//);
      });

      it('should open trr page clicking on any trr item', function () {
        const pinnedTRRs = pinboardAdminPage.pinboardPreviewPane.pinnedTRRs;
        pinnedTRRs.firstItem.mainElement.waitForDisplayed();
        pinnedTRRs.firstItem.mainElement.click();

        browser.getUrl().should.match(/\/trr\/2236\//);
      });

      it('should display pinboard(s) whose title match the searched text', function () {
        pinboardAdminPage.searchBox.waitForDisplayed();
        pinboardAdminPage.searchBox.setValue('Title');

        pinboardAdminPage.firstPinboardTitle.getText().should.equal('Pinboard 18a5b091 Title');
      });
    });
  });
});

