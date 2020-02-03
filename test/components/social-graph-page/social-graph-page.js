import React from 'react';
import { mount } from 'enzyme';
import MockStore from 'redux-mock-store';
import sinon from 'sinon';
import { Provider } from 'react-redux';

import { DATA_VISUALIZATION_TAB_NAMES } from 'utils/constants';
import SocialGraphPage from 'components/social-graph-page';
import NetworkGraph from 'components/social-graph-page/network';
import GeographicMap from 'components/social-graph-page/geographic';
import MainTabs from 'components/social-graph-page/main-tabs';
import * as loadPaginatedDataUtils from 'utils/load-paginated-data';


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
  const params = {
    pinboardId: '12345678',
  };

  it('should render network tab', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <SocialGraphPage
          currentTab={ DATA_VISUALIZATION_TAB_NAMES.SOCIAL_GRAPH }
          location={ location }
          pinboardId='12345678'
          params={ params }
        />
      </Provider>
    );
    const networkGraph = wrapper.find(NetworkGraph);
    networkGraph.find(MainTabs).exists().should.be.true();
    networkGraph.find('.back-to-pinboard-link').exists().should.be.true();
  });

  it('should render geographic tab', function () {
    const loadPaginatedDataStub = sinon.stub(loadPaginatedDataUtils, 'loadPaginatedData');

    const wrapper = mount(
      <Provider store={ store }>
        <SocialGraphPage
          currentTab={ DATA_VISUALIZATION_TAB_NAMES.GEOGRAPHIC }
          location={ location }
          pinboardId='12345678'
          params={ params }
        />
      </Provider>
    );
    const geographicMap = wrapper.find(GeographicMap);
    geographicMap.find(MainTabs).exists().should.be.true();
    geographicMap.find('.back-to-pinboard-link').exists().should.be.true();
  });

  it('should not render back to pinboard button if there is no pinboardId', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <SocialGraphPage
          currentTab={ DATA_VISUALIZATION_TAB_NAMES.SOCIAL_GRAPH }
          location={ location }
        />
      </Provider>
    );
    const networkGraph = wrapper.find(NetworkGraph);
    networkGraph.find(MainTabs).exists().should.be.true();
    networkGraph.find('.back-to-pinboard-link').exists().should.be.false();
  });
});
