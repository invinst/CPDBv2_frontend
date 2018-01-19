import React from 'react';
import { Provider } from 'react-redux';
import { spy } from 'sinon';
import {
  renderIntoDocument, findRenderedComponentWithType
} from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';

import { unmountComponentSuppressError } from 'utils/test';
import HeatMap from 'components/landing-page/heat-map';
import SummaryPanel from 'components/landing-page/heat-map/summary-panel';
import CommunityMap from 'components/landing-page/heat-map/community-map';
import { CitySummaryFactory } from 'utils/test/factories/heat-map';


describe('HeatMap component', function () {
  let instance;
  const store = MockStore()({
    landingPage: {
      heatMap: {
        citySummary: CitySummaryFactory.build()
      }
    }
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should call getCommunities when mounted', function () {
    const callback = spy();
    instance = renderIntoDocument(
      <Provider store={ store }>
        <HeatMap getCommunities={ callback }/>
      </Provider>
    );
    callback.called.should.be.true();
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

  it('should set community id when selectCommunity trigger', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <HeatMap/>
      </Provider>
    );
    const heatMap = findRenderedComponentWithType(instance, HeatMap);
    heatMap.state.selectedId.should.eql(0);

    const summaryPanel = findRenderedComponentWithType(heatMap, SummaryPanel);
    summaryPanel.props.selectCommunity(10);
    heatMap.state.selectedId.should.eql(10);

    const communityMap = findRenderedComponentWithType(heatMap, CommunityMap);
    communityMap.props.selectCommunity(0);
    heatMap.state.selectedId.should.eql(0);
  });
});
