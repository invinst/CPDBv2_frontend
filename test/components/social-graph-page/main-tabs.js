import React from 'react';
import { mount } from 'enzyme';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { stub } from 'sinon';

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

  it('should call changeTab when clicking tab name', function () {
    const stubChangeTab = stub();
    const wrapper = mount(
      <Provider store={ store }>
        <MainTabs
          changeTab={ stubChangeTab }
          currentTab={ SOCIAL_GRAPH_MAIN_TAB_NAMES.NETWORK }
        />
      </Provider>
    );

    const networkTab = wrapper.find('.social-graph-btn');
    const geographicTab = wrapper.find('.geographic-btn');
    geographicTab.simulate('click');
    stubChangeTab.should.be.calledWith('GEOGRAPHIC');
    networkTab.simulate('click');
    stubChangeTab.should.be.calledWith('NETWORK');
  });
});
