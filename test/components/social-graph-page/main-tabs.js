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
import { DATA_VISUALIZATION_TAB_NAMES } from 'utils/constants';
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
          currentTab={ DATA_VISUALIZATION_TAB_NAMES.SOCIAL_GRAPH }
        />
      </Provider>
    );

    const networkTab = findRenderedDOMComponentWithClass(instance, 'social-graph-btn');
    const geographicTab = findRenderedDOMComponentWithClass(instance, 'geographic-btn');
    Simulate.click(geographicTab);
    stubChangeTab.should.be.calledWith('GEOGRAPHIC');
    Simulate.click(networkTab);
    stubChangeTab.should.be.calledWith('SOCIAL_GRAPH');
  });

  it('should call updatePathName when clicking tab name with pinboardId', function () {
    const stubUpdatePathName = stub();
    instance = renderIntoDocument(
      <Provider store={ store }>
        <MainTabs
          updatePathName={ stubUpdatePathName }
          currentTab={ DATA_VISUALIZATION_TAB_NAMES.SOCIAL_GRAPH }
          pinboardId='1234abcd'
          query=''
        />
      </Provider>
    );

    const networkTab = findRenderedDOMComponentWithClass(instance, 'social-graph-btn');
    const geographicTab = findRenderedDOMComponentWithClass(instance, 'geographic-btn');
    Simulate.click(geographicTab);
    stubUpdatePathName.should.be.calledWith('/geographic/pinboard/1234abcd/');
    Simulate.click(networkTab);
    stubUpdatePathName.should.be.calledWith('/social-graph/pinboard/1234abcd/');
  });

  it('should call updatePathName when clicking tab name with query', function () {
    const stubUpdatePathName = stub();
    instance = renderIntoDocument(
      <Provider store={ store }>
        <MainTabs
          updatePathName={ stubUpdatePathName }
          currentTab={ DATA_VISUALIZATION_TAB_NAMES.SOCIAL_GRAPH }
          query='?unit_id=123'
        />
      </Provider>
    );

    const networkTab = findRenderedDOMComponentWithClass(instance, 'social-graph-btn');
    const geographicTab = findRenderedDOMComponentWithClass(instance, 'geographic-btn');
    Simulate.click(geographicTab);
    stubUpdatePathName.should.be.calledWith('/geographic/?unit_id=123');
    Simulate.click(networkTab);
    stubUpdatePathName.should.be.calledWith('/social-graph/?unit_id=123');
  });
});
