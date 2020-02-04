import React from 'react';
import { mount } from 'enzyme';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import sinon from 'sinon';

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

  it('should call changeTab when clicking tab name', function () {
    const stubChangeTab = sinon.stub();
    const wrapper = mount(
      <Provider store={ store }>
        <MainTabs
          changeTab={ stubChangeTab }
          currentTab={ DATA_VISUALIZATION_TAB_NAMES.SOCIAL_GRAPH }
        />
      </Provider>
    );

    const networkTab = wrapper.find('.social-graph-btn');
    const geographicTab = wrapper.find('.geographic-btn');
    geographicTab.simulate('click');
    stubChangeTab.should.be.calledWith('GEOGRAPHIC');
    networkTab.simulate('click');
    stubChangeTab.should.be.calledWith('SOCIAL_GRAPH');
  });

  it('should call updatePathName when clicking tab name with pinboardId', function () {
    const stubUpdatePathName = sinon.stub();
    const wrapper = mount(
      <Provider store={ store }>
        <MainTabs
          updatePathName={ stubUpdatePathName }
          currentTab={ DATA_VISUALIZATION_TAB_NAMES.SOCIAL_GRAPH }
          pinboardId='1234abcd'
          query=''
        />
      </Provider>
    );

    const networkTab = wrapper.find('.social-graph-btn');
    const geographicTab = wrapper.find('.geographic-btn');
    geographicTab.simulate('click');
    stubUpdatePathName.should.be.calledWith('/geographic/pinboard/1234abcd/');
    networkTab.simulate('click');
    stubUpdatePathName.should.be.calledWith('/social-graph/pinboard/1234abcd/');
  });

  it('should call updatePathName when clicking tab name with query', function () {
    const stubUpdatePathName = sinon.stub();
    const wrapper = mount(
      <Provider store={ store }>
        <MainTabs
          updatePathName={ stubUpdatePathName }
          currentTab={ DATA_VISUALIZATION_TAB_NAMES.SOCIAL_GRAPH }
          query='?unit_id=123'
        />
      </Provider>
    );

    const networkTab = wrapper.find('.social-graph-btn');
    const geographicTab = wrapper.find('.geographic-btn');
    geographicTab.simulate('click');
    stubUpdatePathName.should.be.calledWith('/geographic/?unit_id=123');
    networkTab.simulate('click');
    stubUpdatePathName.should.be.calledWith('/social-graph/?unit_id=123');
  });
});
