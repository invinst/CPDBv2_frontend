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
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render Header with correct tab names with correct order', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <RightPaneSection
          currentTab='Officers'
          hasComplaint={ true }
        />
      </Provider>
    );

    const tabNames = scryRenderedDOMComponentsWithClass(instance, 'right-pane-tab-name');
    tabNames.should.have.length(2);
    tabNames[0].textContent.should.be.eql('Officers');
    tabNames[1].textContent.should.be.eql('Timeline');

    const activeTab = findRenderedDOMComponentWithClass(instance, 'active');
    activeTab.textContent.should.be.eql('Officers');
  });

  it('should render correct active tab', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <RightPaneSection
          currentTab='Timeline'
          hasComplaint={ true }
          location={ { pathname: '/social-graph/' } }
        />
      </Provider>
    );

    const tabNames = scryRenderedDOMComponentsWithClass(instance, 'right-pane-tab-name');
    tabNames.should.have.length(2);
    tabNames[0].textContent.should.be.eql('Officers');
    tabNames[1].textContent.should.be.eql('Timeline');

    const activeTab = findRenderedDOMComponentWithClass(instance, 'active');
    activeTab.textContent.should.be.eql('Timeline');
  });

  it('should render officers tab', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <RightPaneSection currentTab={ NETWORK_TAB_NAMES.OFFICERS }/>
      </Provider>
    );

    findRenderedComponentWithType(instance, Officers).should.be.ok();
  });

  it('should render timeline tab', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <RightPaneSection
          currentTab={ NETWORK_TAB_NAMES.TIMELINE }
          location={ { pathname: '/social-graph/' } }
        />
      </Provider>
    );

    findRenderedComponentWithType(instance, Timeline).should.be.ok();
  });

  it('should call changeNetworkTab when clicking tab name', function () {
    const changeNetworkTabStub = stub();
    instance = renderIntoDocument(
      <Provider store={ store }>
        <RightPaneSection
          changeNetworkTab={ changeNetworkTabStub }
          hasComplaint={ true }
        />
      </Provider>
    );

    const timelineTab = scryRenderedDOMComponentsWithClass(instance, 'right-pane-tab-name')[1];
    Simulate.click(timelineTab);

    changeNetworkTabStub.should.be.calledWith('Timeline');
  });

  it('should not render timeline tab if hasComplaint is false', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <RightPaneSection
          currentTab='Officers'
          hasComplaint={ false }
        />
      </Provider>
    );

    const tabNames = scryRenderedDOMComponentsWithClass(instance, 'right-pane-tab-name');
    tabNames.should.have.length(1);
    tabNames[0].textContent.should.be.eql('Officers');
  });
});
