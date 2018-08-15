'use strict';

import 'should';

import { switchToRecentTab } from './utils';
import embeddableHeatMapPage from './page-objects/embeddable-heat-map-page';


describe('Heat map', function () {
  beforeEach(function () {
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

    it('should go to v1 complain category when click on the complaints', function () {
      browser.elements(embeddableHeatMapPage.heatMapSection.complaintCategory.selector).value[0].click();
      switchToRecentTab();
      browser.getUrl().should.match(/\/url-mediator\/session-builder\?cat__category=/);
    });

    it('should go to v1 datatool when click on allegation count', function () {
      const v2Url = browser.getUrl();
      embeddableHeatMapPage.heatMapSection.citySummary.allegationDiscipline.click();
      switchToRecentTab();
      browser.getUrl().should.not.equal(v2Url);
    });
  });
});
