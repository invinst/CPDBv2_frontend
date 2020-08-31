import React from 'react';
import { spy } from 'sinon';

import { mountWithRouter } from 'utils/test';
import { communityFactory } from 'utils/test/factories/heat-map';
import CommunityDetail from 'components/landing-page/heat-map/summary-panel/community-dropdown/community-detail';
import CommunityDropdown from 'components/landing-page/heat-map/summary-panel/community-dropdown';


describe('CommunityDropdown component', function () {
  it('should renderable', function () {
    CommunityDropdown.should.be.renderable({ withRouter: true });
  });

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
    selectCommunity.calledWith(0).should.be.true();

    comDetail.prop('community').should.eql(community);
  });
});
