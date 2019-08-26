import React from 'react';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import {
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
  renderIntoDocument,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import { SOCIAL_GRAPH_MAIN_TAB_NAMES } from 'utils/constants';
import SocialGraphPage from 'components/social-graph-page';
import NetworkGraph from 'components/social-graph-page/network';
import GeographicMap from 'components/social-graph-page/geographic';
import MainTabs from 'components/social-graph-page/main-tabs';


describe('SocialGraphPage component', function () {
  const mockStore = MockStore();
  const store = mockStore({
    socialGraphPage: {
      networkData: {
        graphData: {},
      },
      geographicData: {
        mapCrsData: [],
        mapTrrsData: [],
      },
    },
  });
  const location = {
    query: {
      'officer_ids': '',
      'unit_id': '',
      'title': '',
    },
  };
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render network tab', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SocialGraphPage
          currentTab={ SOCIAL_GRAPH_MAIN_TAB_NAMES.NETWORK }
          location={ location }
          pinboardId='12345678'
        />
      </Provider>
    );
    const networkGraph = findRenderedComponentWithType(instance, NetworkGraph);
    findRenderedComponentWithType(networkGraph, MainTabs);
    findRenderedDOMComponentWithClass(networkGraph, 'back-to-pinboard-link');
  });

  it('should render geographic tab', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SocialGraphPage
          currentTab={ SOCIAL_GRAPH_MAIN_TAB_NAMES.GEOGRAPHIC }
          location={ location }
          pinboardId='12345678'
        />
      </Provider>
    );
    const geographicMap = findRenderedComponentWithType(instance, GeographicMap);
    findRenderedComponentWithType(geographicMap, MainTabs);
    findRenderedDOMComponentWithClass(geographicMap, 'back-to-pinboard-link');
  });

  it('should not render back to pinboard button if there is no pinboardId', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SocialGraphPage
          currentTab={ SOCIAL_GRAPH_MAIN_TAB_NAMES.NETWORK }
          location={ location }
        />
      </Provider>
    );
    const networkGraph = findRenderedComponentWithType(instance, NetworkGraph);
    findRenderedComponentWithType(networkGraph, MainTabs);
    scryRenderedDOMComponentsWithClass(networkGraph, 'back-to-pinboard-link').should.have.length(0);
  });
});
