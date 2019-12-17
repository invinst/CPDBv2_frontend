import React from 'react';
import { shallow } from 'enzyme';

import { communityFactory } from 'utils/test/factories/heat-map';
import CommunityRacePopulation from
  'components/landing-page/heat-map/summary-panel/community-dropdown/community-race-population';


describe('CommunityRacePopulation component', function () {
  it('should renderable', function () {
    CommunityRacePopulation.should.be.renderable(communityFactory.build());
  });

  it('should display Population and Median income', function () {
    const wrapper = shallow(
      <CommunityRacePopulation { ...communityFactory.build() }/>
    );

    const elm = wrapper.find('.test--community-race-population');
    elm.text().should.containEql('Population');
    elm.text().should.containEql('Median Household Income');
    elm.text().should.containEql('Race');
  });

  it('should hide median income when this info is unavailable', function () {
    const wrapper = shallow(
      <CommunityRacePopulation/>
    );
    const elm = wrapper.find('.test--community-race-population');
    elm.text().should.not.containEql('Median Household Income');
  });
});
