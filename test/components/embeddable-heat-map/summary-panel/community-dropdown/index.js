import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';

import { mountWithRouter } from 'utils/test';
import { communityFactory } from 'utils/test/factories/heat-map';
import CommunityDetail from 'components/embeddable-heat-map/summary-panel/community-dropdown/community-detail';
import Dropdown from 'components/embeddable-heat-map/summary-panel/community-dropdown/dropdown';
import CommunityDropdown from 'components/embeddable-heat-map/summary-panel/community-dropdown';


describe('CommunityDropdown component', function () {
  it('should render CommunityDetail if communityId is not 0', function () {
    const selectCommunity = spy();
    const community = communityFactory.build({ id: 1 });
    const wrapper = mountWithRouter(
      <CommunityDropdown
        communityId={ 1 }
        communities={ [community] }
        selectCommunity={ selectCommunity }/>
    );
    const comDetail = wrapper.find(CommunityDetail);

    comDetail.prop('closeDetail')();
    selectCommunity.should.be.calledWith(0);

    comDetail.prop('community').should.eql(community);
  });

  it('should render Dropdown if communityId is 0 and showDropdown is true', function () {
    const wrapper = mount(<CommunityDropdown showDropdown={ true } communityId={ 0 }/>);
    wrapper.find(Dropdown).exists().should.be.true();
  });
});
