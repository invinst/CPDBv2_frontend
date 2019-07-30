'use strict';

import should from 'should';
import { times } from 'lodash';

import landingPage from './page-objects/landing-page';
import header from './page-objects/shareable-header';


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
  });

  it('should close the modal when user clicks on the overlay area', function () {
    landingPage.footer.legalDisclaimer.click();
    landingPage.genericModalSection.overlay.waitForVisible();
    landingPage.genericModalSection.legalDisclaimerTitle.waitForVisible();

    landingPage.genericModalSection.overlay.click();
    landingPage.genericModalSection.legalDisclaimerTitle.waitForVisible(2000, true);
  });

  it('should close the modal when user clicks on "I understand"', function () {
    landingPage.footer.legalDisclaimer.click();
    landingPage.genericModalSection.overlay.waitForVisible();
    landingPage.genericModalSection.legalDisclaimerTitle.waitForVisible();

    landingPage.genericModalSection.overlay.click();
    landingPage.genericModalSection.legalDisclaimerTitle.waitForVisible(2000, true);
  });

  it('should keep the same body width when scrollbar disappears because of open modal', function () {
    const initialWidth = browser.getCssProperty('body', 'width');
    landingPage.footer.legalDisclaimer.click();
    const activeWidth = browser.getCssProperty('body', 'width');
    activeWidth.should.eql(initialWidth);
  });

  it('should go to the landing page when the url does not match any route', function () {
    browser.url('/url-mediator/session-builder/');
    landingPage.currentBasePath.should.eql('/');

    browser.url('/something/really/wrong/');
    landingPage.currentBasePath.should.eql('/');
  });

  describe('Recent Activity carousel', function () {
    it('should show initial carousel', function () {
      browser.pause();
      landingPage.recentActivityCarousel.officerCards.count.should.equal(2);
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
        browser.getUrl().should.match(/\/officer\/\d+\/[\-a-z]+\/?$/);
      });

      it('should go back to the landing page when click on the cpdp breadcrumb', function () {
        const firstCard = landingPage.recentActivityCarousel.officerCards;
        firstCard.click();
        browser.pause(500);
        browser.getUrl().should.match(/\/officer\/\d+\/[\-a-z]+\/?$/);

        header.breadcrumbs.firstItem.click();
        browser.getUrl().should.match(/\//);
      });
    });

    describe('Pair cards', function () {
      it('should go to officer summary page when clicking on left half of the pair card', function () {
        browser.setViewportSize({
          width: 1500,
          height: 1200,
        });

        const firstPairCardLeftHalf = landingPage.recentActivityCarousel.firstPairCardLeftHalf;
        firstPairCardLeftHalf.click();
        browser.pause(500);
        browser.getUrl().should.match(/\/officer\/\d+\/[\-a-z]+\/?$/);

        browser.setViewportSize({
          width: 1000,
          height: 1000,
        });
      });

      it('should go to officer summary page when clicking on right half of the pair card', function () {
        const firstPairCardRightHalf = landingPage.recentActivityCarousel.firstPairCardRightHalf;
        firstPairCardRightHalf.click();
        browser.pause(500);
        browser.getUrl().should.match(/\/officer\/\d+\/[\-a-z]+\/?$/);
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
      const firstCard = landingPage.officersByAllegationCarousel.cards;
      firstCard.click();
      browser.pause(500);
      browser.getUrl().should.match(/\/officer\/\d+\/[\-a-z]+\/?$/);
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

    it('should navigate to the last slide by clicking right arrow', function () {
      browser.setViewportSize({
        width: 1200,
        height: 1000
      });

      landingPage.complaintSummariesCarousel.cards.count.should.equal(20);
      landingPage.complaintSummariesCarousel.rightArrow.waitForVisible();
      times(6, () => landingPage.complaintSummariesCarousel.rightArrow.click());
      landingPage.complaintSummariesCarousel.rightArrow.waitForVisible(2000, true);
    });
  });

  describe('Header', function () {
    afterEach(function () {
      browser.scroll(0, 0);
    });

    it('should render correctly at the top of the page', function () {
      const header = landingPage.topHeader;
      header.mainElement.getCssProperty('position').value.should.eql('static');
      header.mainElement.getCssProperty('background-color').value.should.eql('rgba(0,0,0,0)');

      const topBar = header.topBar;
      topBar.mainElement.waitForVisible();
      topBar.logo.title.getCssProperty('color').value.should.eql('rgba(35,31,32,1)');
      topBar.logo.subtitle.getCssProperty('color').value.should.eql('rgba(118,118,118,1)');
      topBar.demoVideo.titleText.getCssProperty('color').value.should.eql('rgba(0,94,244,1)');
      topBar.demoVideo.titleText.getText().should.eql('What is CPDP?');
      topBar.demoVideo.playButtonThumbnail.getCssProperty('outline').value.should.eql('rgba(0,94,244,0.5)solid5px');
      topBar.demoVideo.playButtonThumbnail.getAttribute('src').should.eql(
        'https://i.vimeocdn.com/video/797111186_100x75.jpg'
      );

      const navBar = header.navBar;
      navBar.mainElement.waitForVisible();
      navBar.mainElement.getCssProperty('background-color').value.should.eql('rgba(245,244,244,1)');
      navBar.searchBox.mainElement.getCssProperty('background-color').value.should.eql('rgba(255,255,255,1)');
      navBar.searchBox.mainElement.getCssProperty('background-color').value.should.eql('rgba(255,255,255,1)');
      navBar.searchBox.searchMagnifyingGlassPath.getAttribute('fill').should.eql('#005EF4');
      navBar.searchBox.searchText.getCssProperty('color').value.should.eql('rgba(0,94,244,1)');
      navBar.searchBox.searchTerm.getCssProperty('color').value.should.eql('rgba(143,143,143,1)');
      navBar.rightLinks.data.getCssProperty('color').value.should.eql('rgba(0,94,244,1)');
      navBar.rightLinks.qa.getCssProperty('color').value.should.eql('rgba(0,94,244,1)');
      navBar.rightLinks.documents.getCssProperty('color').value.should.eql('rgba(0,94,244,1)');
    });

    it('should render correctly at the middle of the page', function () {
      browser.scroll(0, 100); // must scroll pass the top bar
      browser.pause(1000);

      const header = landingPage.slimHeader;
      header.mainElement.getCssProperty('position').value.should.eql('fixed');

      const topBar = header.topBar;
      topBar.mainElement.waitForVisible(1000, true);

      const navBar = header.navBar;
      navBar.mainElement.waitForVisible();
      navBar.mainElement.getCssProperty('background-color').value.should.eql('rgba(245,244,244,1)');
      navBar.searchBox.mainElement.getCssProperty('background-color').value.should.eql('rgba(255,255,255,1)');
      navBar.searchBox.searchMagnifyingGlassPath.getAttribute('fill').should.eql('#767676');
      navBar.searchBox.searchText.getCssProperty('color').value.should.eql('rgba(118,118,118,1)');
      navBar.searchBox.searchTerm.getCssProperty('color').value.should.eql('rgba(143,143,143,1)');
      navBar.rightLinks.data.getCssProperty('color').value.should.eql('rgba(118,118,118,1)');
      navBar.rightLinks.qa.getCssProperty('color').value.should.eql('rgba(118,118,118,1)');
      navBar.rightLinks.documents.getCssProperty('color').value.should.eql('rgba(118,118,118,1)');
    });

    it('should render correctly at the bottom of the page', function () {
      browser.scroll(0, 9999);
      browser.pause(2000);

      const header = landingPage.slimHeader;
      header.mainElement.getCssProperty('position').value.should.eql('fixed');
      header.mainElement.getCssProperty('background-color').value.should.eql('rgba(0,94,244,1)');

      const topBar = header.topBar;
      topBar.mainElement.waitForVisible();
      topBar.logo.title.getCssProperty('color').value.should.eql('rgba(255,255,255,1)');
      topBar.logo.subtitle.getCssProperty('color').value.should.eql('rgba(255,255,255,0.7)');
      topBar.demoVideo.titleText.getCssProperty('color').value.should.eql('rgba(255,255,255,1)');
      topBar.demoVideo.playButtonThumbnail.getCssProperty('outline').value.should.eql('rgba(255,255,255,0.5)solid5px');
      topBar.demoVideo.playButtonThumbnail.getAttribute('src').should.eql(
        'https://i.vimeocdn.com/video/797111186_100x75.jpg'
      );

      const navBar = header.navBar;
      navBar.mainElement.waitForVisible();
      navBar.mainElement.getCssProperty('background-color').value.should.eql('rgba(0,0,0,0)');
      navBar.searchBox.mainElement.getCssProperty('background-color').value.should.eql('rgba(0,0,0,0)');
      navBar.searchBox.searchMagnifyingGlassPath.getAttribute('fill').should.eql('white');
      navBar.searchBox.searchText.getCssProperty('color').value.should.eql('rgba(255,255,255,1)');
      navBar.searchBox.searchTerm.getCssProperty('color').value.should.eql('rgba(255,255,255,1)');
      navBar.rightLinks.data.getCssProperty('color').value.should.eql('rgba(255,255,255,1)');
      navBar.rightLinks.qa.getCssProperty('color').value.should.eql('rgba(255,255,255,1)');
      navBar.rightLinks.documents.getCssProperty('color').value.should.eql('rgba(255,255,255,1)');
    });

    it('should go to search term page when clicking anywhere in the search box', function () {
      landingPage.searchSection.mainElement.click();
      browser.getUrl().should.containEql('/search/terms/');

      landingPage.open();
      landingPage.searchSection.sectionSearchTerm.click();
      browser.getUrl().should.containEql('/search/terms/');
    });
  });
});
