import React from 'react';
import { shallow, mount } from 'enzyme';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import sinon from 'sinon';

import { NETWORK_TAB_NAMES } from 'utils/constants';
import RightPaneSection from 'components/social-graph-page/network/right-pane-section';
import Officers from 'components/social-graph-page/network/right-pane-section/officers';
import Timeline from 'components/social-graph-page/network/right-pane-section/timeline';


describe('RightPaneSection component', function () {
  const mockStore = MockStore();
  const store = mockStore({
    socialGraphPage: {
      networkData: {
        graphData: {
          officers: [],
        },
        networkAllegations: [],
        networkOfficers: [],
      },
      currentMainTab: undefined,
    },
  });
  const location = {
    'pathname': '/social-graph/',
    'search': '?unit_id=123',
  };

  it('should render Header with correct tab names with correct order', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <RightPaneSection
          currentTab={ NETWORK_TAB_NAMES.TIMELINE }
          showTimelineTab={ true }
          location={ location }
        />
      </Provider>
    );

    const tabNames = wrapper.find('.right-pane-tab-name');
    tabNames.should.have.length(2);
    tabNames.at(0).text().should.equal('Timeline');
    tabNames.at(1).text().should.equal('Officers');

    const activeTab = wrapper.find('.active');
    activeTab.text().should.equal('Timeline');
    const timelineComponent = wrapper.find(Timeline);
    timelineComponent.prop('location').should.be.eql(location);
  });

  it('should render correct active tab', function () {
    const sortedOfficerIds = [123, 456, 789];
    const wrapper = mount(
      <Provider store={ store }>
        <RightPaneSection
          currentTab={ NETWORK_TAB_NAMES.OFFICERS }
          showTimelineTab={ true }
          location={ location }
          sortedOfficerIds={ sortedOfficerIds }
        />
      </Provider>
    );

    const tabNames = wrapper.find('.right-pane-tab-name');
    tabNames.should.have.length(2);
    tabNames.at(0).text().should.equal('Timeline');
    tabNames.at(1).text().should.equal('Officers');

    const activeTab = wrapper.find('.active');
    activeTab.text().should.equal('Officers');
    const officersComponent = wrapper.find(Officers);
    officersComponent.prop('sortedOfficerIds').should.be.eql(sortedOfficerIds);
  });

  it('should call changeNetworkTab when clicking tab name', function () {
    const changeNetworkTabStub = sinon.stub();
    const wrapper = mount(
      <Provider store={ store }>
        <RightPaneSection
          changeNetworkTab={ changeNetworkTabStub }
          showTimelineTab={ true }
        />
      </Provider>
    );

    const officersTab = wrapper.find('.right-pane-tab-name').at(1);
    officersTab.simulate('click');

    changeNetworkTabStub.should.be.calledWith('Officers');
  });

  it('should not render timeline tab if showTimelineTab is false', function () {
    const wrapper = shallow(
      <RightPaneSection
        currentTab='Officers'
        showTimelineTab={ false }
      />
    );

    const tabNames = wrapper.find('.right-pane-tab-name');
    tabNames.should.have.length(1);
    tabNames.at(0).text().should.equal('Officers');
  });
});
