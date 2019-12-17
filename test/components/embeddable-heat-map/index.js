import React from 'react';
import { shallow } from 'enzyme';
import { stub } from 'sinon';

import HeatMap from 'components/embeddable-heat-map';
import SummaryPanel from 'components/embeddable-heat-map/summary-panel';
import CommunityMap from 'components/embeddable-heat-map/community-map';
import * as GATracking from 'utils/google_analytics_tracking';


describe('HeatMap component', function () {
  it('should render CommunityMap and SummaryPanel', function () {
    const wrapper = shallow(
      <HeatMap/>
    );
    wrapper.find(SummaryPanel).exists().should.be.true();
    wrapper.find(CommunityMap).exists().should.be.true();
  });

  it('should set community id and send analytic event when selectCommunity triggers', function () {
    stub(GATracking, 'trackCommunityClick');
    const communities = [{
      id: 10,
      name: 'Westwood',
    }];
    const wrapper = shallow(
      <HeatMap communities={ communities }/>
    );
    wrapper.state('selectedId').should.equal(0);

    const summaryPanel = wrapper.find(SummaryPanel);
    summaryPanel.prop('selectCommunity')(10);
    wrapper.state('selectedId').should.equal(10);
    GATracking.trackCommunityClick.should.calledWith('Westwood');

    const communityMap = wrapper.find(CommunityMap);
    communityMap.prop('selectCommunity')(0);
    wrapper.state('selectedId').should.equal(0);
    GATracking.trackCommunityClick.restore();
  });
});
