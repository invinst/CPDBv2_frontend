'use strict';

import should from 'should';

import landingPage from '../page-objects/landing-page';
import officerPage from '../page-objects/officer-page';
import searchPage from '../page-objects/search-page';
import crPage from '../page-objects/cr-page';
import trrPage from '../page-objects/trr-page';


should.config.checkProtoEql = false;


describe('Clicky', function () {
  it('should be embedded into landing page', function () {
    landingPage.open();

    landingPage.clickyScript.waitForExist();
    landingPage.clickySiteIdsScript.waitForExist();
    landingPage.clickyNoJavascriptGIF.waitForExist();
  });

  it('should be embedded into officer page', function () {
    officerPage.open();

    officerPage.clickyScript.waitForExist();
    officerPage.clickySiteIdsScript.waitForExist();
    officerPage.clickyNoJavascriptGIF.waitForExist();
  });

  it('should be embedded into search page', function () {
    searchPage.open();

    searchPage.clickyScript.waitForExist();
    searchPage.clickySiteIdsScript.waitForExist();
    searchPage.clickyNoJavascriptGIF.waitForExist();
  });

  it('should be embedded into cr page', function () {
    crPage.open();

    crPage.clickyScript.waitForExist();
    crPage.clickySiteIdsScript.waitForExist();
    crPage.clickyNoJavascriptGIF.waitForExist();
  });

  it('should be embedded into trr page', function () {
    trrPage.open();

    trrPage.clickyScript.waitForExist();
    trrPage.clickySiteIdsScript.waitForExist();
    trrPage.clickyNoJavascriptGIF.waitForExist();
  });
});
