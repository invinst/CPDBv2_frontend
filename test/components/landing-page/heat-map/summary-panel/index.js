import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import SummaryPanel from 'components/landing-page/heat-map/summary-panel';
import CommunityDropdown from 'components/landing-page/heat-map/summary-panel/community-dropdown';
import CitySummary from 'containers/landing-page/heat-map/city-summary-container';


describe('SummaryPanel component', function () {
  it('should render CitySummary and CommunityDropDown', function () {
    const wrapper = shallow(<SummaryPanel/>);
    wrapper.find(CommunityDropdown).exists().should.be.true();
    wrapper.find(CitySummary).exists().should.be.true();
  });

  it('should deselect community and hide dropdown when click CitySummary', function () {
    const selectCommunity = spy();
    const wrapper = shallow(
      <SummaryPanel selectCommunity={ selectCommunity }/>
    );
    wrapper.setState({ showDropdown: true });
    wrapper.state('showDropdown').should.be.true();

    const citySummary = wrapper.find(CitySummary);
    citySummary.prop('onClick')();

    selectCommunity.calledWith(0).should.be.true();
    wrapper.state('showDropdown').should.be.false();
  });

  it('should select community and hide dropdown when select from dropdown', function () {
    const selectCommunity = spy();
    const wrapper = shallow(
      <SummaryPanel selectCommunity={ selectCommunity }/>
    );
    wrapper.setState({ showDropdown: true });
    wrapper.state('showDropdown').should.be.true();

    const dropdown = wrapper.find(CommunityDropdown);
    dropdown.prop('selectCommunity')(3);

    selectCommunity.calledWith(3).should.be.true();
    wrapper.state('showDropdown').should.be.false();
  });

  it('should show dropdown when CommunityDropdown trigger it', function () {
    const wrapper = shallow(
      <SummaryPanel/>
    );
    wrapper.setState({ showDropdown: true });
    wrapper.state('showDropdown').should.be.true();

    const dropdown = wrapper.find(CommunityDropdown);
    dropdown.prop('closeDropdown')();
    wrapper.state('showDropdown').should.be.false();
  });

  it('should hide dropdown when CommunityDropdown trigger it', function () {
    const wrapper = shallow(
      <SummaryPanel/>
    );
    wrapper.setState({ showDropdown: false });
    wrapper.state('showDropdown').should.be.false();

    const dropdown = wrapper.find(CommunityDropdown);
    dropdown.prop('openDropdown')();
    wrapper.state('showDropdown').should.be.true();
  });
});
