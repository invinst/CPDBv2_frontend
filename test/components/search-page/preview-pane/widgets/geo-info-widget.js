import React from 'react';
import should from 'should';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import GeoInfoWidget from 'components/search-page/preview-pane/widgets/geo-info-widget';
import CommunityRacePopulation
  from 'components/landing-page/heat-map/summary-panel/community-dropdown/community-race-population';


describe('GeoInfoWidget component', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should contain CommunityRacePopulation component', () => {
    instance = renderIntoDocument(
      <GeoInfoWidget/>
    );
    should(findRenderedComponentWithType(instance, CommunityRacePopulation)).not.be.null();
  });
});
