import React from 'react';
import { shallow } from 'enzyme';
import should from 'should';

import GeoInfoWidget from 'components/common/preview-pane/widgets/geo-info-widget';
import CommunityRacePopulation
  from 'components/landing-page/heat-map/summary-panel/community-dropdown/community-race-population';


describe('GeoInfoWidget component', () => {
  it('should contain CommunityRacePopulation component', () => {
    const wrapper = shallow(
      <GeoInfoWidget
        raceCount={ [{
          race: 'race',
          count: 1,
        }] }
      />
    );
    should(wrapper.find(CommunityRacePopulation)).not.be.null();
  });

  it('should not display when raceCount is empty', () => {
    const wrapper = shallow(
      <GeoInfoWidget
        raceCount={ [] }
      />
    );
    should(wrapper.getNode()).be.null();
  });
});
