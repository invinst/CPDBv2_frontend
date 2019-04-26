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

import { SOCIAL_GRAPH_PAGE_TAB_NAMES } from 'utils/constants';
import { unmountComponentSuppressError } from 'utils/test';
import SocialGraphPaneSection from 'components/social-graph-page/social-graph-pane-section';
import OfficersSection from 'components/social-graph-page/social-graph-pane-section/officers-section';
import TimelineSection from 'components/social-graph-page/social-graph-pane-section/timeline-section';


describe('SocialGraphPaneSection component', function () {
  const mockStore = MockStore();
  const store = mockStore({
    socialGraphPage: {
      graphData: {
        officers: []
      },
      graphAllegations: [],
      currentTab: undefined,
    },
  });
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render Header with correct tab names with correct order', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SocialGraphPaneSection
          currentTab='Officers'
          hasComplaint={ true }
        />
      </Provider>
    );

    const tabNames = scryRenderedDOMComponentsWithClass(instance, 'social-graph-pane-tab-name');
    tabNames.should.have.length(2);
    tabNames[0].textContent.should.be.eql('Officers');
    tabNames[1].textContent.should.be.eql('Timeline');

    const activeTab = findRenderedDOMComponentWithClass(instance, 'active');
    activeTab.textContent.should.be.eql('Officers');
  });

  it('should render correct active tab', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SocialGraphPaneSection
          currentTab='Timeline'
          hasComplaint={ true }
        />
      </Provider>
    );

    const tabNames = scryRenderedDOMComponentsWithClass(instance, 'social-graph-pane-tab-name');
    tabNames.should.have.length(2);
    tabNames[0].textContent.should.be.eql('Officers');
    tabNames[1].textContent.should.be.eql('Timeline');

    const activeTab = findRenderedDOMComponentWithClass(instance, 'active');
    activeTab.textContent.should.be.eql('Timeline');
  });

  it('should render officers tab', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SocialGraphPaneSection currentTab={ SOCIAL_GRAPH_PAGE_TAB_NAMES.OFFICERS }/>
      </Provider>
    );

    findRenderedComponentWithType(instance, OfficersSection).should.be.ok();
  });

  it('should render timeline tab', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SocialGraphPaneSection currentTab={ SOCIAL_GRAPH_PAGE_TAB_NAMES.TIMELINE }/>
      </Provider>
    );

    findRenderedComponentWithType(instance, TimelineSection).should.be.ok();
  });

  it('should call changeSocialGraphTab when clicking tab name', function () {
    const changeSocialGraphTabStub = stub();
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SocialGraphPaneSection
          changeSocialGraphTab={ changeSocialGraphTabStub }
          hasComplaint={ true }
        />
      </Provider>
    );

    const timelineTab = scryRenderedDOMComponentsWithClass(instance, 'social-graph-pane-tab-name')[1];
    Simulate.click(timelineTab);

    changeSocialGraphTabStub.should.be.calledWith('Timeline');
  });
});
