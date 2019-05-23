import React from 'react';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { findRenderedComponentWithType, renderIntoDocument } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import { SOCIAL_GRAPH_MAIN_TAB_NAMES } from 'utils/constants';
import SocialGraphPage from 'components/social-graph-page';
import NetworkGraph from 'components/social-graph-page/network';
import GeographicMap from 'components/social-graph-page/geographic';


describe('SocialGraphPage component', function () {
  const mockStore = MockStore();
  const store = mockStore({
    socialGraphPage: {
      networkData: {
        graphData: {},
      },
      geographicData: [],
    },
  });
  const location = {
    query: {
      'officer_ids': '',
      'unit_id': '',
      'title': '',
    }
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
        />
      </Provider>
    );
    findRenderedComponentWithType(instance, NetworkGraph).should.be.ok();
  });

  it('should render geographic tab', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SocialGraphPage
          currentTab={ SOCIAL_GRAPH_MAIN_TAB_NAMES.GEOGRAPHIC }
          location={ location }
        />
      </Provider>
    );
    findRenderedComponentWithType(instance, GeographicMap).should.be.ok();
  });
});
