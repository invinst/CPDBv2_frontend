import React from 'react';
import {
  findRenderedComponentWithType,
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  findRenderedDOMComponentWithClass,
  Simulate,
} from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { stub } from 'sinon';

import { NETWORK_TAB_NAMES } from 'utils/constants';
import { unmountComponentSuppressError } from 'utils/test';
import RightPaneSection from 'components/social-graph-page/network/right-pane-section';
import Officers from 'components/social-graph-page/network/right-pane-section/officers';
import Timeline from 'components/social-graph-page/network/right-pane-section/timeline';


describe('RightPaneSection component', function () {
  const mockStore = MockStore();
  const store = mockStore({
    socialGraphPage: {
      networkData: {
        graphData: {
          officers: []
        },
        networkAllegations: [],
        networkOfficers: [],
      },
      currentMainTab: undefined,
    },
  });
  const location = {
    'pathname': '/social-graph/',
    'search': '?unit_id=123'
  };
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render Header with correct tab names with correct order', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <RightPaneSection
          currentTab={ NETWORK_TAB_NAMES.TIMELINE }
          showTimelineTab={ true }
          location={ location }
        />
      </Provider>
    );

    const tabNames = scryRenderedDOMComponentsWithClass(instance, 'right-pane-tab-name');
    tabNames.should.have.length(2);
    tabNames[0].textContent.should.be.eql('Timeline');
    tabNames[1].textContent.should.be.eql('Officers');

    const activeTab = findRenderedDOMComponentWithClass(instance, 'active');
    activeTab.textContent.should.be.eql('Timeline');
    const timelineComponent = findRenderedComponentWithType(instance, Timeline);
    timelineComponent.props.location.should.be.eql(location);
  });

  it('should render correct active tab', function () {
    const sortedOfficerIds = [123, 456, 789];
    instance = renderIntoDocument(
      <Provider store={ store }>
        <RightPaneSection
          currentTab={ NETWORK_TAB_NAMES.OFFICERS }
          showTimelineTab={ true }
          location={ location }
          sortedOfficerIds={ sortedOfficerIds }
        />
      </Provider>
    );

    const tabNames = scryRenderedDOMComponentsWithClass(instance, 'right-pane-tab-name');
    tabNames.should.have.length(2);
    tabNames[0].textContent.should.be.eql('Timeline');
    tabNames[1].textContent.should.be.eql('Officers');

    const activeTab = findRenderedDOMComponentWithClass(instance, 'active');
    activeTab.textContent.should.be.eql('Officers');
    const officersComponent = findRenderedComponentWithType(instance, Officers);
    officersComponent.props.sortedOfficerIds.should.be.eql(sortedOfficerIds);
  });

  it('should call changeNetworkTab when clicking tab name', function () {
    const changeNetworkTabStub = stub();
    instance = renderIntoDocument(
      <Provider store={ store }>
        <RightPaneSection
          changeNetworkTab={ changeNetworkTabStub }
          showTimelineTab={ true }
        />
      </Provider>
    );

    const officersTab = scryRenderedDOMComponentsWithClass(instance, 'right-pane-tab-name')[1];
    Simulate.click(officersTab);

    changeNetworkTabStub.should.be.calledWith('Officers');
  });

  it('should not render timeline tab if showTimelineTab is false', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <RightPaneSection
          currentTab='Officers'
          showTimelineTab={ false }
        />
      </Provider>
    );

    const tabNames = scryRenderedDOMComponentsWithClass(instance, 'right-pane-tab-name');
    tabNames.should.have.length(1);
    tabNames[0].textContent.should.be.eql('Officers');
  });
});
