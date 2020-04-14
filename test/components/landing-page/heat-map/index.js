import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { spy, stub } from 'sinon';
import MockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

import HeatMap from 'components/landing-page/heat-map';
import SummaryPanel from 'components/landing-page/heat-map/summary-panel';
import CommunityMap from 'components/landing-page/heat-map/community-map';
import { CitySummaryFactory } from 'utils/test/factories/heat-map';
import * as tracking from 'utils/tracking';


describe('HeatMap component', function () {
  const store = MockStore()({
    landingPage: {
      heatMap: {
        citySummary: CitySummaryFactory.build(),
      },
    },
  });

  it('should render CommunityMap and SummaryPanel', function () {
    const heatMapLoadedSpy = spy();
    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <HeatMap heatMapLoaded={ heatMapLoadedSpy }/>
        </MemoryRouter>
      </Provider>
    );
    wrapper.find(SummaryPanel).exists().should.be.true();
    const communityMap = wrapper.find(CommunityMap);
    communityMap.exists().should.be.true();
    communityMap.prop('heatMapLoaded').should.equal(heatMapLoadedSpy);
  });

  it('should set community id and send analytic event when selectCommunity triggers', function () {
    stub(tracking, 'trackCommunityClick');
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
    tracking.trackCommunityClick.should.calledWith('Westwood');

    const communityMap = wrapper.find(CommunityMap);
    communityMap.prop('selectCommunity')(0);
    wrapper.state('selectedId').should.equal(0);
  });
});
