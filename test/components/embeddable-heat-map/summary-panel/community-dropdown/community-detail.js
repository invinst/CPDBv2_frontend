import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import { communityFactory } from 'utils/test/factories/heat-map';
import CommunityDetail from 'components/embeddable-heat-map/summary-panel/community-dropdown/community-detail';


describe('CommunityDetail component', function () {
  it('should only update if next community is non empty', function () {
    const wrapper = shallow(
      <CommunityDetail community={ communityFactory.build({ name: 'Hyde Park' }) }/>
    );
    wrapper.text().should.containEql('Hyde Park');

    wrapper.setProps({});
    wrapper.text().should.containEql('Hyde Park');
  });

  it('should render previous community if received community is empty', function () {
    const wrapper = shallow(
      <CommunityDetail community={ communityFactory.build({ name: 'Hyde Park' }) }/>
    );
    wrapper.text().should.containEql('Hyde Park');

    wrapper.setProps({ community: {} });
    wrapper.setProps({});
    wrapper.text().should.containEql('Hyde Park');
  });

  it('should trigger closeDetail when click on close button', function () {
    const closeDetail = spy();
    const wrapper = shallow(<CommunityDetail closeDetail={ closeDetail }/>);
    wrapper.find('.test--community-close-btn').simulate('click');
    closeDetail.should.be.called();
  });
});
