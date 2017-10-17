'use strict';

require('should');

import landingPage from './page-objects/landing-page';


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

  it('should show activity grid', function () {
    landingPage.activityGridSection.cards.count.should.equal(40);
  });

  it('should open a modal when user clicks on "Legal Disclaimer"', function () {
    landingPage.header.legalDisclaimer.click();
    landingPage.genericModalSection.overlay.waitForVisible();
    landingPage.genericModalSection.legalDisclaimerTitle.waitForVisible();

    landingPage.genericModalSection.overlay.click();
    landingPage.genericModalSection.overlay.waitForVisible(2000, true);
  });

  it('should keep the same body width when scrollbar disappears because of open modal', function () {
    const initialWidth = browser.getCssProperty('body', 'width');
    landingPage.header.legalDisclaimer.click();
    const activeWidth = browser.getCssProperty('body', 'width');
    activeWidth.should.eql(initialWidth);
  });
});
