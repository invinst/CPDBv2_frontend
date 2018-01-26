import React from 'react';

import { communityFactory } from 'utils/test/factories/heat-map';
import CommunityRacePopulation from
  'components/landing-page/heat-map/summary-panel/community-dropdown/community-race-population';


describe('CommunityRacePopulation component', function () {
  it('should renderable', function () {
    CommunityRacePopulation.should.be.renderable(communityFactory.build());
  });
});
