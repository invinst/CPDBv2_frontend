import React from 'react';
import { Provider } from 'react-redux';
import { stub } from 'sinon';
import {
  renderIntoDocument, findRenderedComponentWithType,
} from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';

import { unmountComponentSuppressError } from 'utils/test';
import HeatMap from 'components/landing-page/heat-map';
import SummaryPanel from 'components/landing-page/heat-map/summary-panel';
import CommunityMap from 'components/landing-page/heat-map/community-map';
import { CitySummaryFactory } from 'utils/test/factories/heat-map';
import * as GATracking from 'utils/google_analytics_tracking';


describe('HeatMap component', function () {
  let instance;
  const store = MockStore()({
    landingPage: {
      heatMap: {
        citySummary: CitySummaryFactory.build(),
      },
    },
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render CommunityMap and SummaryPanel', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <HeatMap/>
      </Provider>
    );
    findRenderedComponentWithType(instance, SummaryPanel).should.be.ok();
    findRenderedComponentWithType(instance, CommunityMap).should.be.ok();
  });

  it('should set community id and send analytic event when selectCommunity triggers', function () {
    stub(GATracking, 'trackCommunityClick');
    const communities = [{
      id: 10,
      name: 'Westwood',
    }];
    instance = renderIntoDocument(
      <Provider store={ store }>
        <HeatMap communities={ communities }/>
      </Provider>
    );
    const heatMap = findRenderedComponentWithType(instance, HeatMap);
    heatMap.state.selectedId.should.eql(0);

    const summaryPanel = findRenderedComponentWithType(heatMap, SummaryPanel);
    summaryPanel.props.selectCommunity(10);
    heatMap.state.selectedId.should.eql(10);
    GATracking.trackCommunityClick.should.calledWith('Westwood');

    const communityMap = findRenderedComponentWithType(heatMap, CommunityMap);
    communityMap.props.selectCommunity(0);
    heatMap.state.selectedId.should.eql(0);
    GATracking.trackCommunityClick.restore();
  });
});
