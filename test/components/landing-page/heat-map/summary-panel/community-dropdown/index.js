import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';

import { communityFactory } from 'utils/test/factories/heat-map';
import CommunityDetail from 'components/landing-page/heat-map/summary-panel/community-dropdown/community-detail';
import DropdownPlaceHolder from
  'components/landing-page/heat-map/summary-panel/community-dropdown/dropdown-placeholder';
import Dropdown from 'components/landing-page/heat-map/summary-panel/community-dropdown/dropdown';
import CommunityDropdown from 'components/landing-page/heat-map/summary-panel/community-dropdown';


describe('CommunityDropdown component', function () {
  it('should renderable', function () {
    CommunityDropdown.should.be.renderable();
  });

  it('should render CommunityDetail if communityId is not 0', function () {
    const selectCommunity = spy();
    const community = communityFactory.build({ id: 1 });
    const wrapper = mount(
      <CommunityDropdown
        communityId={ 1 }
        communities={ [community] }
        selectCommunity={ selectCommunity }/>
    );
    const comDetail = wrapper.find(CommunityDetail);

    comDetail.prop('closeDetail')();
    selectCommunity.calledWith(0).should.be.true();

    comDetail.prop('community').should.eql(community);
  });

  it('should render Dropdown if communityId is 0 and showDropdown is true', function () {
    const wrapper = mount(<CommunityDropdown showDropdown={ true } communityId={ 0 }/>);
    wrapper.find(Dropdown).exists().should.be.true();
  });

  it('should render DropdownPlaceholder otherwise', function () {
    const wrapper = mount(<CommunityDropdown showDropdown={ false } communityId={ 0 }/>);
    wrapper.find(DropdownPlaceHolder).exists().should.be.true();
  });
});
