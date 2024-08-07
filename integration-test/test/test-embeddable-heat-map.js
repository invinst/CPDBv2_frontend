'use strict';

import 'should';

import embeddableHeatMapPage from '../page-objects/embeddable-heat-map-page';
import api from '../mock-api';
import { mockCommonApi } from '../mock-data/utils';
import { citySummaryData, clusterData, communityData } from '../mock-data/landing-page/common';


describe('Heat map', function () {
  beforeEach(function () {
    mockCommonApi();
    api.onGet('/heatmap/community.geojson').reply(200, communityData);
    api.onGet('/heatmap/cluster.geojson').reply(200, clusterData);
    api.onGet('/api/v2/city-summary/').reply(200, citySummaryData);
    embeddableHeatMapPage.open();
  });

  describe('summary panel', function () {
    it('should display city summary', function () {
      embeddableHeatMapPage.heatMapSection.citySummary.allegationDiscipline.getText().should.containEql(
        '10 allegations'
      );
      embeddableHeatMapPage.heatMapSection.citySummary.allegationDiscipline.getText().should.containEql(
        '50% disciplined'
      );
    });

    it('should go to v1 datatool when click on allegation count', function () {
      const v2Url = browser.getUrl();
      embeddableHeatMapPage.heatMapSection.citySummary.allegationDiscipline.click();

      browser.switchWindow('cpdb');
      browser.getUrl().should.not.equal(v2Url);
      browser.closeWindow();
      browser.switchWindow('localhost');
    });
  });
});
