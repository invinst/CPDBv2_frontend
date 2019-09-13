import React from 'react';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { stub } from 'sinon';
import {
  findRenderedDOMComponentWithClass,
  renderIntoDocument,
  Simulate,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import { SOCIAL_GRAPH_MAIN_TAB_NAMES } from 'utils/constants';
import MainTabs from 'components/social-graph-page/main-tabs';


describe('MainTabs component', function () {
  const mockStore = MockStore();
  const store = mockStore({
    socialGraphPage: {
      graphData: {},
      geographicData: [],
    },
  });
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should call changeTab when clicking tab name', function () {
    const stubChangeTab = stub();
    instance = renderIntoDocument(
      <Provider store={ store }>
        <MainTabs
          changeTab={ stubChangeTab }
          currentTab={ SOCIAL_GRAPH_MAIN_TAB_NAMES.NETWORK }
        />
      </Provider>
    );

    const networkTab = findRenderedDOMComponentWithClass(instance, 'social-graph-btn');
    const geographicTab = findRenderedDOMComponentWithClass(instance, 'geographic-btn');
    Simulate.click(geographicTab);
    stubChangeTab.should.be.calledWith('GEOGRAPHIC');
    Simulate.click(networkTab);
    stubChangeTab.should.be.calledWith('NETWORK');
  });
});
