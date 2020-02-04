import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { communityFactory } from 'utils/test/factories/heat-map';
import CommunityDetail from 'components/landing-page/heat-map/summary-panel/community-dropdown/community-detail';


describe('CommunityDetail component', function () {
  it('should renderable', function () {
    CommunityDetail.should.be.renderable();
  });

  it('should only update if next community is non empty', function () {
    const wrapper = shallow(
      <CommunityDetail community={ communityFactory.build({ name: 'Hyde Park' }) }/>
    );
    wrapper.text().should.containEql('Hyde Park');

    wrapper.setProps({ community: communityFactory.build({ name: 'Near West Side' }) });

    wrapper.text().should.containEql('Near West Side');
  });

  it('should render previous community if received community is empty', function () {
    const wrapper = shallow(
      <CommunityDetail community={ communityFactory.build({ name: 'Hyde Park' }) }/>
    );
    const instance = wrapper.instance();
    wrapper.text().should.containEql('Hyde Park');
    wrapper.state('prevCommunity').name.should.equal('Hyde Park');
    instance.props.community.name.should.equal('Hyde Park');

    wrapper.setProps({ community: {} });
    instance.props.community.should.be.empty();
    wrapper.state('prevCommunity').name.should.equal('Hyde Park');

    wrapper.text().should.containEql('Hyde Park');
  });

  it('should render latest community if received community is empty', function () {
    const wrapper = shallow(
      <CommunityDetail community={ communityFactory.build({ name: 'Hyde Park' }) }/>
    );
    wrapper.text().should.containEql('Hyde Park');

    wrapper.setProps({ community: communityFactory.build({ name: 'Near West Side' }) });
    wrapper.instance().forceUpdate();

    wrapper.setProps({ community: {} });
    wrapper.instance().forceUpdate();

    wrapper.text().should.containEql('Near West Side');
  });

  it('should trigger closeDetail when click on close button', function () {
    const closeDetail = sinon.spy();
    const wrapper = shallow(<CommunityDetail closeDetail={ closeDetail }/>);
    wrapper.find('.test--community-close-btn').simulate('click');
    closeDetail.called.should.be.true();
  });
});
