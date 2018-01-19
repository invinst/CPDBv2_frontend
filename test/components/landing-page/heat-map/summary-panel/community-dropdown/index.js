import React from 'react';
import { spy } from 'sinon';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import { communityFactory } from 'utils/test/factories/heat-map';
import CommunityDetail from 'components/landing-page/heat-map/summary-panel/community-dropdown/community-detail';
import DropdownPlaceHolder from
  'components/landing-page/heat-map/summary-panel/community-dropdown/dropdown-placeholder';
import Dropdown from 'components/landing-page/heat-map/summary-panel/community-dropdown/dropdown';
import CommunityDropdown from 'components/landing-page/heat-map/summary-panel/community-dropdown';


describe('CommunityDropdown component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    CommunityDropdown.should.be.renderable();
  });

  it('should render CommunityDetail if communityId is not 0', function () {
    const selectCommunity = spy();
    const community = communityFactory.build({ id: 1 });
    instance = renderIntoDocument(
      <CommunityDropdown
        communityId={ 1 }
        communities={ [community] }
        selectCommunity={ selectCommunity }/>
    );
    const comDetail = findRenderedComponentWithType(instance, CommunityDetail);

    comDetail.props.closeDetail();
    selectCommunity.calledWith(0).should.be.true();

    comDetail.props.community.should.eql(community);
  });

  it('should render Dropdown if communityId is 0 and showDropdown is true', function () {
    instance = renderIntoDocument(<CommunityDropdown showDropdown={ true } communityId={ 0 }/>);
    findRenderedComponentWithType(instance, Dropdown).should.be.ok();
  });

  it('should render DropdownPlaceholder otherwise', function () {
    instance = renderIntoDocument(<CommunityDropdown showDropdown={ false } communityId={ 0 }/>);
    findRenderedComponentWithType(instance, DropdownPlaceHolder).should.be.ok();
  });
});
