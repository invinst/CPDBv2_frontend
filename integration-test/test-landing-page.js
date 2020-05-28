'use strict';

import should from 'should';
import { times } from 'lodash';

import landingPage from './page-objects/landing-page';
import searchPage from './page-objects/search-page';
import header from './page-objects/shareable-header';
import searchTermsPage from './page-objects/search-terms-page';
import pinboardPage from './page-objects/pinboard-page';
import { INTRODUCTION_DISPLAY_TIMEOUT } from './utils/constants';


should.config.checkProtoEql = false;


describe('landing page', function () {

  beforeEach(function () {
    landingPage.open();
    landingPage.header.content.waitForDisplayed();
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
    landingPage.loginScreen.loginModal.waitForDisplayed();
  });

  it('should not show login screen if already logged-in when entering edit mode', function () {
    landingPage.toggleEditMode(false);
    landingPage.loginScreen.login();

    landingPage.toggleEditMode(true);
    landingPage.toggleEditMode(false);

    browser.pause(500);
    landingPage.loginScreen.loginModal.waitForDisplayed(2000, true);
  });

  it('should open a modal when user clicks on "Legal Disclaimer"', function () {
    landingPage.footer.legalDisclaimer.click();
    landingPage.genericModalSection.overlay.waitForDisplayed();
    landingPage.genericModalSection.legalDisclaimerTitle.waitForDisplayed();
  });

  it('should close the modal when user clicks on the overlay area', function () {
    landingPage.footer.legalDisclaimer.click();
    landingPage.genericModalSection.overlay.waitForDisplayed();
    landingPage.genericModalSection.legalDisclaimerTitle.waitForDisplayed();

    landingPage.genericModalSection.overlay.click();
    landingPage.genericModalSection.legalDisclaimerTitle.waitForDisplayed(2000, true);
  });

  it('should close the modal when user clicks on "I understand"', function () {
    landingPage.footer.legalDisclaimer.click();
    landingPage.genericModalSection.overlay.waitForDisplayed();
    landingPage.genericModalSection.legalDisclaimerTitle.waitForDisplayed();

    landingPage.genericModalSection.overlay.click();
    landingPage.genericModalSection.legalDisclaimerTitle.waitForDisplayed(2000, true);
  });

  it('should keep the same body width when scrollbar disappears because of open modal', function () {
    const initialWidth = $('body').getCSSProperty('width').value;
    landingPage.footer.legalDisclaimer.click();
    const activeWidth = $('body').getCSSProperty('width').value;
    activeWidth.should.eql(initialWidth);
  });

  it('should go to the landing page when the url does not match any route', function () {
    browser.url('/url-mediator/session-builder/');
    $('body').waitForDisplayed();
    landingPage.currentBasePath.should.eql('/');

    browser.url('/something/really/wrong/');
    $('body').waitForDisplayed();
    landingPage.currentBasePath.should.eql('/');
  });

  describe('Switch to Search Page Transition', function () {
    beforeEach(function () {
      browser.setWindowRect(0, 0, 1000, 1000);
      searchPage.input.waitForExist();
      searchPage.input.waitForDisplayed(1000, true);
    });

    it('should show search page and hide landing page when clicking on search box', function () {
      const searchBox = landingPage.header.navBar.searchBox;
      searchBox.mainElement.click();

      searchPage.input.waitForDisplayed(2000);
      landingPage.header.content.waitForDisplayed(2000, true);
      landingPage.header.content.waitForExist();
    });

    it('should expand search input when clicking on search box', function () {
      const SEARCH_INPUT_WIDTH_AFTER_EXPAND = 893;
      const searchBox = landingPage.header.navBar.searchBox;

      searchBox.mainElement.getCSSProperty('width').value.should.equal('512px');

      searchBox.mainElement.click();

      const beginningWidthString = searchPage.input.getCSSProperty('width').value;
      const beginningWidth = parseFloat(beginningWidthString.slice(0, beginningWidthString.length - 2));
      beginningWidth.should.aboveOrEqual(512).and.below(SEARCH_INPUT_WIDTH_AFTER_EXPAND);

      searchPage.input.waitForCSSProperty(
        'width',
        value => parseFloat(value.slice(0, value.length - 2)) === SEARCH_INPUT_WIDTH_AFTER_EXPAND,
        1000
      );
    });

    it('should move search box up when lading page position is top and clicking on search box', function () {
      const searchBox = landingPage.header.navBar.searchBox;
      searchBox.mainElement.click();

      browser.waitUntil(
        () => searchPage.input.getLocation('y') > 50,
        500,
        'Search box does not start moving up from lower position',
        10
      );

      const topYLocation = 9;
      browser.waitUntil(
        () => searchPage.input.getLocation('y') === topYLocation,
        1000,
        'Search box does not end moving up at top',
        10
      );
      searchPage.input.getLocation('y').should.equal(topYLocation);
    });

    it('should not move search page up when lading page is not at top', function () {
      browser.scroll(0, 500); // must scroll pass the top bar
      browser.pause(1000);

      const header = landingPage.header;
      header.content.getCSSProperty('position').value.should.eql('fixed');
      header.content.getCSSProperty('top').value.should.eql('-80px');
      header.navBar.searchBox.searchText.getCSSProperty('color').value.should.eql('rgba(118,118,118,1)');

      header.navBar.searchBox.mainElement.click();

      const topYLocation = 9;
      browser.pause(10);
      searchPage.input.getLocation('y').should.equal(topYLocation);
      browser.pause(10);
      searchPage.input.getLocation('y').should.equal(topYLocation);
      browser.pause(10);
      searchPage.input.getLocation('y').should.equal(topYLocation);

      searchPage.input.waitForCSSProperty(
        'width',
        value => parseFloat(value.slice(0, value.length - 2)) === 893,
        1000
      );
    });

    it('should dock the search bar and preview pane', function () {
      landingPage.header.navBar.searchBox.mainElement.click();

      searchPage.input.setValue('Ke');

      browser.pause(1000);
      browser.scroll(0, 9999);
      browser.pause(1000);

      searchPage.input.isDisplayedInViewport().should.be.true();
      searchPage.officerPreviewPaneSection.viewOfficerButton.isDisplayedInViewport().should.be.true();
    });
  });

  describe('Recent Activity carousel', function () {
    it('should show initial carousel', function () {
      landingPage.recentActivityCarousel.cards.count.should.equal(2);
      landingPage.recentActivityCarousel.firstRadarChart
        .getCSSProperty('background-color').value.should.eql('rgba(245,37,36,1)');
      landingPage.recentActivityCarousel.rightArrow.waitForDisplayed();
      landingPage.recentActivityCarousel.leftArrow.waitForDisplayed(2000, true);
    });

    it('should change next group of slides when clicking on right arrow', function () {
      landingPage.recentActivityCarousel.rightArrow.click();
      landingPage.recentActivityCarousel.leftArrow.waitForDisplayed(1000);
    });

    it('should always display pairing card in 1st position', function () {
      landingPage.recentActivityCarousel.firstCard.waitForDisplayed();
      landingPage.recentActivityCarousel.firstCard.getAttribute('class').should.containEql('pairing-card');
    });

    describe('Officer cards', function () {
      it('should go to officer summary page when clicking on officer card', function () {
        const firstCard = landingPage.recentActivityCarousel.cards;
        firstCard.click();
        browser.waitForUrl(url => url.should.match(/\/officer\/\d+\/[-a-z]+\/?$/), 500);
      });

      it('should go back to the landing page when click on the cpdp breadcrumb', function () {
        const firstCard = landingPage.recentActivityCarousel.cards;
        firstCard.click();
        browser.waitForUrl(url => url.should.match(/\/officer\/\d+\/[-a-z]+\/?$/), 500);

        header.breadcrumbs.firstItem.click();
        browser.getUrl().should.match(/\//);
      });
    });

    describe('Pair cards', function () {
      it('should go to officer summary page when clicking on left half of the pair card', function () {
        browser.setWindowRect(0, 0, 1500, 1200);

        const firstPairCardLeftHalf = landingPage.recentActivityCarousel.firstPairCardLeftHalf;
        firstPairCardLeftHalf.click();
        browser.waitForUrl(url => url.should.match(/\/officer\/\d+\//), 500);

        browser.setWindowRect(0, 0, 1000, 1000);
      });

      it('should go to officer summary page when clicking on right half of the pair card', function () {
        const firstPairCardRightHalf = landingPage.recentActivityCarousel.firstPairCardRightHalf;
        firstPairCardRightHalf.click();
        browser.waitForUrl(url => url.should.match(/\/officer\/\d+\//), 500);
      });
    });
  });

  describe('Officers By Allegation carousel', function () {
    it('should show initial carousel', function () {
      landingPage.officersByAllegationCarousel.cards.count.should.equal(48);
      landingPage.officersByAllegationCarousel.edwardMayRadarChart
        .getCSSProperty('background-color').value.should.eql('rgba(245,37,36,1)');
      landingPage.officersByAllegationCarousel.rightArrow.waitForDisplayed();
      landingPage.officersByAllegationCarousel.leftArrow.waitForDisplayed(2000, true);
    });

    it('should go to officer summary page when click to card', function () {
      const firstCard = landingPage.officersByAllegationCarousel.cards;
      firstCard.click();
      browser.waitForUrl(url => url.should.match(/\/officer\/\d+\/[-a-z]+\/?$/), 500);
    });

    it('should be able to navigate using scroll', function () {
      const forthCard = landingPage.officersByAllegationCarousel.getNthCardSelector(4);
      const carouselSelector = landingPage.officersByAllegationCarousel.carouselSelector;
      landingPage.officersByAllegationCarousel.rightArrow.waitForDisplayed();
      forthCard.isDisplayedInViewport().should.be.false();

      browser.simulateMouseWheel(carouselSelector, 0, 10);
      browser.pause(1000);
      forthCard.isDisplayedInViewport().should.be.false();

      browser.simulateMouseWheel(carouselSelector, 10, 0);
      browser.pause(1000);
      forthCard.isDisplayedInViewport().should.be.true();

      browser.simulateMouseWheel(carouselSelector, -10, 0);
      browser.pause(1000);
      forthCard.isDisplayedInViewport().should.be.false();
    });
  });

  describe('Recent Document Carousel', function () {
    it('should show initial carousel', function () {
      landingPage.recentDocumentCarousel.cards.count.should.equal(24);
      landingPage.recentDocumentCarousel.rightArrow.waitForDisplayed();
      landingPage.recentDocumentCarousel.leftArrow.waitForDisplayed(2000, true);
    });

    it('should go to cr page when click to card', function () {
      const firstCard = landingPage.recentDocumentCarousel.cards;
      firstCard.click();
      browser.waitForUrl(url => url.should.match(/\/complaint\/\w+\/$/), 500);
    });
  });

  describe('Complaint Summaries Carousel', function () {
    it('should show initial carousel', function () {
      landingPage.complaintSummariesCarousel.cards.count.should.equal(20);
      landingPage.complaintSummariesCarousel.rightArrow.waitForDisplayed();
      landingPage.complaintSummariesCarousel.leftArrow.waitForDisplayed(2000, true);
    });

    it('should go to cr page when click to card', function () {
      const firstCard = landingPage.complaintSummariesCarousel.cards;
      firstCard.click();
      browser.waitForUrl(url => url.should.match(/\/complaint\/\w+\/$/), 500);
    });

    it('should navigate to the last slide by clicking right arrow', function () {
      browser.setWindowRect(0, 0, 1200, 1000);

      landingPage.complaintSummariesCarousel.cards.count.should.equal(20);
      landingPage.complaintSummariesCarousel.rightArrow.waitForDisplayed();
      times(6, () => landingPage.complaintSummariesCarousel.rightArrow.click());
      landingPage.complaintSummariesCarousel.rightArrow.waitForDisplayed(2000, true);
    });
  });

  describe('Header', function () {
    afterEach(function () {
      browser.scroll(0, 0);
    });

    it('should render correctly at the top of the page', function () {
      const header = landingPage.header;
      header.content.getCSSProperty('position').value.should.eql('static');
      header.mainElement.getCSSProperty('background-color').value.should.eql('rgba(0,0,0,0)');

      const topBar = header.topBar;
      topBar.mainElement.waitForDisplayed();
      topBar.logo.title.getCSSProperty('color').value.should.eql('rgba(35,31,32,1)');
      topBar.logo.subtitle.getCSSProperty('color').value.should.eql('rgba(118,118,118,1)');
      topBar.demoVideo.titleText.getCSSProperty('color').value.should.eql('rgba(118,118,118,1)');
      topBar.demoVideo.titleText.getText().should.eql('What is CPDP?');
      topBar.demoVideo.playButtonThumbnail.getCSSProperty('border').value.should.eql('1px solid rgb(219, 219, 219)');

      const navBar = header.navBar;
      navBar.mainElement.waitForDisplayed();
      navBar.searchBox.mainElement.getCSSProperty('background-color').value.should.eql('rgba(245,244,244,1)');
      navBar.searchBox.searchMagnifyingGlassPath.getAttribute('fill').should.eql('#005EF4');
      navBar.searchBox.searchText.getCSSProperty('color').value.should.eql('rgba(0,94,244,1)');
      navBar.searchBox.searchTerm.getCSSProperty('color').value.should.eql('rgba(118,118,118,1)');
      navBar.headerLinks.data.getCSSProperty('color').value.should.eql('rgba(0,94,244,1)');
      navBar.headerLinks.qa.getCSSProperty('color').value.should.eql('rgba(0,94,244,1)');
      navBar.headerLinks.documents.getCSSProperty('color').value.should.eql('rgba(0,94,244,1)');
      navBar.headerLinks.pinboard.getCSSProperty('color').value.should.eql('rgba(0,94,244,1)');
    });

    it('should render correctly at the middle of the page', function () {
      browser.scroll(0, 500); // must scroll pass the top bar
      browser.pause(1000);

      const header = landingPage.header;
      header.content.getCSSProperty('position').value.should.eql('fixed');
      header.content.getCSSProperty('top').value.should.eql('-80px');

      const navBar = header.navBar;
      navBar.mainElement.waitForDisplayed();
      navBar.searchBox.mainElement.getCSSProperty('background-color').value.should.eql('rgba(245,244,244,1)');
      navBar.searchBox.searchMagnifyingGlassPath.getAttribute('fill').should.eql('#767676');
      navBar.searchBox.searchText.getCSSProperty('color').value.should.eql('rgba(118,118,118,1)');
      navBar.searchBox.searchTerm.getCSSProperty('color').value.should.eql('rgba(118,118,118,1)');
      navBar.headerLinks.data.getCSSProperty('color').value.should.eql('rgba(118,118,118,1)');
      navBar.headerLinks.qa.getCSSProperty('color').value.should.eql('rgba(118,118,118,1)');
      navBar.headerLinks.documents.getCSSProperty('color').value.should.eql('rgba(118,118,118,1)');
      navBar.headerLinks.pinboard.getCSSProperty('color').value.should.eql('rgba(118,118,118,1)');
    });

    it('should render correctly at the bottom of the page', function () {
      browser.scroll(0, 9999);
      browser.pause(2000);

      const header = landingPage.header;
      header.content.getCSSProperty('position').value.should.eql('fixed');

      const navBar = header.navBar;
      navBar.mainElement.waitForDisplayed();
      navBar.searchBox.mainElement.getCSSProperty('background-color').value.should.eql('rgba(245,244,244,1)');
      navBar.searchBox.searchMagnifyingGlassPath.getAttribute('fill').should.eql('#005EF4');
      navBar.searchBox.searchText.getCSSProperty('color').value.should.eql('rgba(0,94,244,1)');
      navBar.searchBox.searchTerm.getCSSProperty('color').value.should.eql('rgba(118,118,118,1)');
      navBar.headerLinks.data.getCSSProperty('color').value.should.eql('rgba(0,94,244,1)');
      navBar.headerLinks.qa.getCSSProperty('color').value.should.eql('rgba(0,94,244,1)');
      navBar.headerLinks.documents.getCSSProperty('color').value.should.eql('rgba(0,94,244,1)');
      navBar.headerLinks.pinboard.getCSSProperty('color').value.should.eql('rgba(0,94,244,1)');
    });

    it('should go to pinboard page when clicking on pinboard tag', function () {
      const navBar = landingPage.header.navBar;
      navBar.mainElement.waitForDisplayed();
      navBar.headerLinks.pinboard.click();
      pinboardPage.emptyPinboardSection.mainElement.waitForDisplayed();
      browser.getUrl().should.endWith('/pinboard/abcd1234/untitled-pinboard/');
    });

    it('should go to search page when clicking anywhere in the search box', function () {
      landingPage.searchSection.mainElement.click();
      browser.getUrl().should.containEql('/search/');

      landingPage.open();
      landingPage.searchSection.sectionSearchTerm.click();
      browser.getUrl().should.containEql('/search/');
    });
  });

  describe('Pinboard function', function () {
    const checkPinToast = (parentSelector, messagePrefix) => {
      //Pin item
      parentSelector.waitForDisplayed();
      parentSelector.click();

      //Check toast
      landingPage.lastToast.waitForDisplayed();
      landingPage.lastToast.waitForText(`${messagePrefix} added.\nGo to pinboard`);

      //Go to Search Page and check for pinboard item counts
      landingPage.searchSection.mainElement.click();
      searchPage.pinboardButton.waitForText('Pinboard (1)');
      searchPage.backButton.click();

      //Unpin item
      parentSelector.waitForDisplayed();
      parentSelector.click();

      //Check toast
      landingPage.lastToast.waitForDisplayed();
      landingPage.lastToast.waitForText(`${messagePrefix} removed.\nGo to pinboard`);

      //Go to Search Page and check for pinboard item counts
      landingPage.searchSection.mainElement.click();
      searchTermsPage.bottomLinks.backToFrontPageLink.waitForDisplayed();
      searchPage.pinboardButton.waitForDisplayed(500, true);
      searchPage.backButton.click();
    };

    const checkPairCardPinToast = (selector, lastMessagePrefix, secondLastMessagePrefix) => {
      selector.waitForDisplayed();
      selector.click();

      landingPage.lastToast.waitForDisplayed();
      landingPage.lastToast.waitForText(`${lastMessagePrefix} added.\nGo to pinboard`);
      landingPage.secondLastToast.waitForDisplayed();
      landingPage.secondLastToast.waitForText(`${secondLastMessagePrefix} added.\nGo to pinboard`);

      selector.click();

      landingPage.lastToast.waitForDisplayed();
      landingPage.lastToast.waitForText(`${lastMessagePrefix} removed.\nGo to pinboard`);
      landingPage.secondLastToast.waitForDisplayed();
      landingPage.secondLastToast.waitForText(`${secondLastMessagePrefix} removed.\nGo to pinboard`);
    };

    it('should display toast when pinning cards', function () {
      checkPinToast(
        landingPage.recentActivityCarousel.jeromeFinniganPinButton,
        'Police Officer Jerome Finnigan 54-year-old white male, with 10 complaints, 5 sustained'
      );
      landingPage.lastToast.waitForDisplayed(5000, true);

      checkPinToast(
        landingPage.officersByAllegationCarousel.edwardMayPinButton,
        'Commander Edward May 54-year-old white male, with 5 complaints, 1 sustained',
      );
      landingPage.lastToast.waitForDisplayed(5000, true);

      checkPairCardPinToast(
        landingPage.recentActivityCarousel.jeromeFinniganPairCardPinButton,
        'Police Officer Edward May 54-year-old white male, with 10 complaints, 5 sustained',
        'Police Officer Jerome Finnigan 54-year-old white male, with 10 complaints, 5 sustained',
      );
      landingPage.lastToast.waitForDisplayed(5000, true);

      checkPinToast(
        landingPage.recentDocumentCarousel.domesticPinButton,
        'CR #123456 categorized as Domestic happened in Jan 1, 2000'
      );
      landingPage.lastToast.waitForDisplayed(5000, true);

      checkPinToast(
        landingPage.complaintSummariesCarousel.criminalMisconductPinButton,
        'CR #654321 categorized as Criminal Misconduct happened in Jan 1, 2000'
      );
    });

    it('should show only 1 toast if one officer of the pairing card has already pinned', function () {
      landingPage.recentActivityCarousel.jeromeFinniganPinButton.waitForDisplayed();
      landingPage.recentActivityCarousel.jeromeFinniganPinButton.click();

      landingPage.toast.waitForDisplayed();
      landingPage.toast.waitForText(
        'Police Officer Jerome Finnigan 54-year-old white male, with 10 complaints, 5 sustained added.' +
        '\nGo to pinboard'
      );
      landingPage.toast.waitForDisplayed(5000, true);

      landingPage.searchSection.mainElement.click();
      searchPage.pinboardButton.waitForText('Pinboard (1)');
      searchPage.backButton.click();

      landingPage.recentActivityCarousel.firstPairCardPinButton.click();

      landingPage.lastToast.waitForDisplayed();
      landingPage.lastToast.waitForText(
        'Police Officer Edward May 54-year-old white male, with 10 complaints, 5 sustained added.' +
        '\nGo to pinboard'
      );
      landingPage.secondLastToast.waitForDisplayed(2000, true);

      landingPage.searchSection.mainElement.click();
      searchPage.pinboardButton.waitForText('Pinboard (2)');
      searchPage.backButton.click();

      landingPage.recentActivityCarousel.firstPairCardPinButton.click();

      landingPage.lastToast.waitForDisplayed();
      landingPage.lastToast.waitForText(
        'Police Officer Edward May 54-year-old white male, with 10 complaints, 5 sustained removed.' +
        '\nGo to pinboard'
      );
      landingPage.secondLastToast.waitForDisplayed();
      landingPage.secondLastToast.waitForText(
        'Police Officer Jerome Finnigan 54-year-old white male, with 10 complaints, 5 sustained removed.' +
        '\nGo to pinboard'
      );

      landingPage.searchSection.mainElement.click();
      searchPage.input.waitForDisplayed();
      searchPage.pinboardButton.waitForDisplayed(500, true);
    });
  });

  describe('Pinboard Introduction', function () {
    beforeEach(function () {
      browser.clearReduxStore(true);
      landingPage.header.content.waitForDisplayed();
    });

    it('should display Pinboard introduction on first visited', function () {
      landingPage.pinboardIntroduction.body.waitForDisplayed();
    });

    it('should not display Pinboard introduction after click close button', function () {
      landingPage.pinboardIntroduction.body.waitForDisplayed();
      landingPage.pinboardIntroduction.closeButton.click();
      landingPage.pinboardIntroduction.body.waitForDisplayed(INTRODUCTION_DISPLAY_TIMEOUT, true);
      browser.refresh();
      landingPage.header.content.waitForDisplayed();
      landingPage.pinboardIntroduction.body.waitForDisplayed(INTRODUCTION_DISPLAY_TIMEOUT, true);
    });

    it('should not display Pinboard introduction after click try it', function () {
      landingPage.pinboardIntroduction.body.waitForDisplayed();
      landingPage.pinboardIntroduction.tryItButton.click();
      browser.waitForUrl(url => url.should.match(/\/pinboard\/.*/), 2000);
      pinboardPage.headerTitle.click();
      landingPage.header.content.waitForDisplayed();
      landingPage.pinboardIntroduction.body.waitForDisplayed(INTRODUCTION_DISPLAY_TIMEOUT, true);
    });

    it('should not display Pinboard introduction after click Pinboard button', function () {
      landingPage.pinboardIntroduction.pinboardButton.click();
      browser.waitForUrl(url => url.should.match(/\/pinboard\/.*/), 2000);
      pinboardPage.headerTitle.click();
      landingPage.header.content.waitForDisplayed();
      landingPage.pinboardIntroduction.body.waitForDisplayed(INTRODUCTION_DISPLAY_TIMEOUT, true);
    });
  });
});
