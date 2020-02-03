import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import SummaryPanel from 'components/embeddable-heat-map/summary-panel';
import CommunityDropdown from 'components/embeddable-heat-map/summary-panel/community-dropdown';


describe('SummaryPanel component', function () {
  it('should render CitySummary and CommunityDropDown', function () {
    const wrapper = shallow(
      <SummaryPanel/>
    );
    wrapper.find(CommunityDropdown).exists().should.be.true();
    wrapper.find('Connect(CitySummary)').exists().should.be.true();
  });

  it('should deselect community and hide dropdown when click CitySummary', function () {
    const selectCommunity = sinon.spy();
    const wrapper = shallow(
      <SummaryPanel selectCommunity={ selectCommunity }/>
    );
    wrapper.setState({ showDropdown: true });
    wrapper.state('showDropdown').should.be.true();

    const motion = wrapper;
    const communityDropdown = motion.find(CommunityDropdown);
    communityDropdown.prop('showDropdown').should.be.true();

    const citySummary = motion.find('Connect(CitySummary)');
    citySummary.prop('onClick')();

    selectCommunity.should.be.calledWith(0);
    wrapper.state('showDropdown').should.be.false();

    wrapper.find(CommunityDropdown).prop('showDropdown').should.be.false();
  });

  it('should select community and hide dropdown when select from dropdown', function () {
    const selectCommunity = sinon.spy();
    const wrapper = shallow(
      <SummaryPanel selectCommunity={ selectCommunity }/>
    );
    wrapper.setState({ showDropdown: true });
    wrapper.state('showDropdown').should.be.true();

    const dropdown = wrapper.find(CommunityDropdown);
    dropdown.prop('selectCommunity')(3);

    selectCommunity.should.be.calledWith(3);
    wrapper.state('showDropdown').should.be.false();
  });

  it('should show dropdown when CommunityDropdown trigger it', function () {
    const wrapper = shallow(<SummaryPanel/>);
    wrapper.setState({ showDropdown: true });
    wrapper.state('showDropdown').should.be.true();

    const dropdown = wrapper.find(CommunityDropdown);
    dropdown.prop('closeDropdown')();
    wrapper.state('showDropdown').should.be.false();
    wrapper.state('showDropdown').should.be.false();
  });

  it('should hide dropdown when CommunityDropdown trigger it', function () {
    const wrapper = shallow(<SummaryPanel/>);
    wrapper.setState({ showDropdown: false });
    wrapper.state('showDropdown').should.be.false();

    const dropdown = wrapper.find(CommunityDropdown);
    dropdown.prop('openDropdown')();
    wrapper.state('showDropdown').should.be.true();
  });
});
