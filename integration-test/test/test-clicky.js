'use strict';

import should from 'should';

import landingPage from '../page-objects/landing-page';
import officerPage from '../page-objects/officer-page';
import searchPage from '../page-objects/search-page';
import crPage from '../page-objects/cr-page';
import trrPage from '../page-objects/trr-page';
import api from '../mock-api';
import { officerData } from '../mock-data/officer-page/common';
import { crData } from '../mock-data/cr-page/common';
import { trrData } from '../mock-data/trr-page';


should.config.checkProtoEql = false;


describe('Clicky', function () {
  it('should be embedded into landing page', function () {
    landingPage.open();

    landingPage.clickyScript.waitForExist();
    landingPage.clickySiteIdsScript.waitForExist();
    landingPage.clickyNoJavascriptGIF.waitForExist();
  });

  it('should be embedded into officer page', function () {
    api.onGet('/api/v2/officers/1/summary/').reply(200, officerData);
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
    api.onGet('/api/v2/cr/1000000/').reply(200, crData);
    crPage.open();

    crPage.clickyScript.waitForExist();
    crPage.clickySiteIdsScript.waitForExist();
    crPage.clickyNoJavascriptGIF.waitForExist();
  });

  it('should be embedded into trr page', function () {
    api.onGet('/api/v2/trr/1/').reply(200, trrData);
    trrPage.open();

    trrPage.clickyScript.waitForExist();
    trrPage.clickySiteIdsScript.waitForExist();
    trrPage.clickyNoJavascriptGIF.waitForExist();
  });
});
