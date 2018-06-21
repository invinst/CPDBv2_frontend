'use strict';

import should from 'should';

import landingPage from './page-objects/landing-page';


should.config.checkProtoEql = false;

describe('landing page', function () {

  beforeEach(function () {
    landingPage.open();
    browser.pause(500);
  });

  it('should enter edit mode when press ESCAPE', function () {
    landingPage.toggleEditMode(false);
    landingPage.currentBasePath.should.equal('/edit/');
  });

  it('should exit edit mode when press ESCAPE again', function () {
    landingPage.toggleEditMode(false);
    landingPage.toggleEditMode(true);
    landingPage.currentBasePath.should.equal('/');
  });

  it('should show login screen if not logged-in when entering edit mode', function () {
    landingPage.toggleEditMode(false);
    landingPage.loginScreen.loginModal.waitForVisible();
  });

  it('should not show login screen if already logged-in when entering edit mode', function () {
    landingPage.toggleEditMode(false);
    landingPage.loginScreen.login();

    landingPage.toggleEditMode(true);
    landingPage.toggleEditMode(false);

    browser.pause(500);
    landingPage.loginScreen.loginModal.waitForVisible(2000, true);
  });

  it('should open a modal when user clicks on "Legal Disclaimer"', function () {
    landingPage.footer.legalDisclaimer.click();
    landingPage.genericModalSection.overlay.waitForVisible();
    landingPage.genericModalSection.legalDisclaimerTitle.waitForVisible();

    landingPage.genericModalSection.overlay.click();
    landingPage.genericModalSection.overlay.waitForVisible(2000, true);
  });

  it('should keep the same body width when scrollbar disappears because of open modal', function () {
    const initialWidth = browser.getCssProperty('body', 'width');
    landingPage.footer.legalDisclaimer.click();
    const activeWidth = browser.getCssProperty('body', 'width');
    activeWidth.should.eql(initialWidth);
  });

  it('should go to invisible institue site when click on invinst logo in the footer', function () {
    landingPage.footer.invinstLogo.scroll();
    landingPage.footer.invinstLogo.click();
    browser.getUrl().should.equal('https://invisible.institute/introduction');
  });

  describe('Recent Activity carousel', function () {
    it('should show initial carousel', function () {
      browser.pause();
      landingPage.recentActivityCarousel.officerCards.count.should.equal(20);
      landingPage.recentActivityCarousel.officerCards.count.should.equal(20);
      landingPage.recentActivityCarousel.rightArrow.waitForVisible();
      landingPage.recentActivityCarousel.leftArrow.waitForVisible(2000, true);
    });

    it('should change next group of slides when clicking on right arrow', function () {
      landingPage.recentActivityCarousel.rightArrow.click();
      landingPage.recentActivityCarousel.leftArrow.waitForVisible(1000);
    });

    describe('Officer cards', function () {
      it('should go to officer summary page when clicking on officer card', function () {
        const firstCard = landingPage.recentActivityCarousel.officerCards;
        firstCard.click();
        browser.pause(500);
        browser.getUrl().should.match(/\/officer\/\d+\/$/);
      });
    });

    describe('Pair cards', function () {
      it('should go to officer summary page when clicking on left half of the pair card', function () {
        const firstPairCardLeftHalf = landingPage.recentActivityCarousel.firstPairCardLeftHalf;
        firstPairCardLeftHalf.click();
        browser.pause(500);
        browser.getUrl().should.match(/\/officer\/\d+\/$/);
      });

      it('should go to officer summary page when clicking on right half of the pair card', function () {
        const firstPairCardRightHalf = landingPage.recentActivityCarousel.firstPairCardRightHalf;
        firstPairCardRightHalf.click();
        browser.pause(500);
        browser.getUrl().should.match(/\/officer\/\d+\/$/);
      });
    });
  });

  describe('Officers By Allegation carousel', function () {
    it('should show initial carousel', function () {
      landingPage.officersByAllegationCarousel.cards.count.should.equal(48);
      landingPage.officersByAllegationCarousel.rightArrow.waitForVisible();
      landingPage.officersByAllegationCarousel.leftArrow.waitForVisible(2000, true);
    });

    it('should go to officer summary page when click to card', function () {
      const firstCard = landingPage.recentActivityCarousel.cards;
      firstCard.click();
      browser.pause(500);
      browser.getUrl().should.match(/\/officer\/\d+\/$/);
    });
  });

  describe('Recent Document Carousel', function () {
    it('should show initial carousel', function () {
      landingPage.recentDocumentCarousel.cards.count.should.equal(24);
      landingPage.recentDocumentCarousel.rightArrow.waitForVisible();
      landingPage.recentDocumentCarousel.leftArrow.waitForVisible(2000, true);
    });

    it('should go to cr page when click to card', function () {
      const firstCard = landingPage.recentDocumentCarousel.cards;
      firstCard.click();
      browser.pause(500);
      browser.getUrl().should.match(/\/complaint\/\w+\/$/);
    });
  });

  describe('Complaint Summaries Carousel', function () {
    it('should show initial carousel', function () {
      landingPage.complaintSummariesCarousel.cards.count.should.equal(20);
      landingPage.complaintSummariesCarousel.rightArrow.waitForVisible();
      landingPage.complaintSummariesCarousel.leftArrow.waitForVisible(2000, true);
    });

    it('should go to cr page when click to card', function () {
      const firstCard = landingPage.complaintSummariesCarousel.cards;
      firstCard.click();
      browser.pause(500);
      browser.getUrl().should.match(/\/complaint\/\w+\/$/);
    });
  });

  describe('Header', function () {
    afterEach(function () {
      browser.scroll(0, 0);
    });

    it('should have blue nav links in default non-sticky state', function () {
      landingPage.topHeader.mainElement.getCssProperty('position').value.should.eql('static');
      landingPage.topHeader.qa.getCssProperty('color').value.should.eql('rgba(0,94,244,1)');
      landingPage.topHeader.mainElement.getCssProperty('box-shadow').value.should.eql('none');
    });

    it('should have fixed position, grey nav links and bottom shadow in sticky state', function () {
      browser.scroll(0, 20);
      browser.pause(1000);
      landingPage.stickyHeader.mainElement.getCssProperty('position').value.should.eql('fixed');
      landingPage.stickyHeader.qa.getCssProperty('color').value.should.eql('rgba(143,143,143,1)');
      landingPage.stickyHeader.mainElement.getCssProperty('box-shadow').value.should.eql(
        'rgba(0,0,0,0.13)0px1px1px0px'
      );
    });

    it('should have blue background when scrolled all the way to bottom of page', function () {
      browser.scroll(0, 99999);
      browser.pause(10000);
      landingPage.stickyHeader.mainElement.getCssProperty('background-color').value.should.eql('rgba(0,94,244,1)');
      landingPage.stickyHeader.qa.getCssProperty('color').value.should.eql('rgba(255,255,255,1)');
      landingPage.stickyHeader.mainElement.getCssProperty('box-shadow').value.should.eql('none');
    });
  });
});
