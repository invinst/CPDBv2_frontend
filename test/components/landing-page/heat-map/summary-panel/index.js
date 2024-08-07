import React from 'react';
import { shallow } from 'enzyme';

import SummaryPanel from 'components/landing-page/heat-map/summary-panel';
import CommunityDropdown from 'components/landing-page/heat-map/summary-panel/community-dropdown';
import CitySummary from 'containers/landing-page/heat-map/city-summary-container';


describe('SummaryPanel component', function () {
  it('should render CitySummary and CommunityDropDown', function () {
    const wrapper = shallow(<SummaryPanel/>);
    wrapper.find(CommunityDropdown).exists().should.be.true();
    wrapper.find(CitySummary).exists().should.be.true();
  });
});
