import React from 'react';
import {
  findRenderedComponentWithType,
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate,
} from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { stub } from 'sinon';

import { OFFICER_PAGE_TAB_NAMES } from 'utils/constants';
import { unmountComponentSuppressError } from 'utils/test';
import TabbedPaneSection from 'components/officer-page/tabbed-pane-section';
import Timeline from 'components/officer-page/tabbed-pane-section/timeline';
import MapTab from 'components/officer-page/tabbed-pane-section/map';
import Coaccusals from 'components/officer-page/tabbed-pane-section/coaccusals';
import AttachmentsTab from 'components/officer-page/tabbed-pane-section/attachments-tab';


describe('TabbedPaneSection component', function () {
  const mockStore = MockStore();
  const store = mockStore({
    officerPage: {
      newTimeline: {},
      coaccusals: [],
    },
    popups: [],
  });
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render Header with correct tab names with correct order', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <TabbedPaneSection
          currentTab='TIMELINE'
          hasComplaint={ true }
          hasMapMarker={ true }
          hasCoaccusal={ true }
        />
      </Provider>
    );

    const tabNames = scryRenderedDOMComponentsWithClass(instance, 'tabbed-pane-tab-name');

    tabNames.should.have.length(4);
    tabNames[0].textContent.should.be.eql('TIMELINE');
    tabNames[1].textContent.should.be.eql('MAP');
    tabNames[2].textContent.should.be.eql('COACCUSALS');
    tabNames[3].textContent.should.be.eql('ATTACHMENTS');
  });

  it('should hide the tabs with no data', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <TabbedPaneSection
          currentTab='TIMELINE'
          hasComplaint={ false }
          hasMapMarker={ false }
          hasCoaccusal={ false }
        />
      </Provider>
    );

    const tabNames = scryRenderedDOMComponentsWithClass(instance, 'tabbed-pane-tab-name');

    tabNames.should.have.length(1);
    tabNames[0].textContent.should.be.eql('TIMELINE');
  });

  it('should render timeline tab', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <TabbedPaneSection currentTab={ OFFICER_PAGE_TAB_NAMES.TIMELINE }/>
      </Provider>
    );

    findRenderedComponentWithType(instance, Timeline).should.be.ok();
  });

  it('should render map tab', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <TabbedPaneSection currentTab={ OFFICER_PAGE_TAB_NAMES.MAP }/>
      </Provider>
    );

    findRenderedComponentWithType(instance, MapTab).should.be.ok();
  });

  it('should render coaccusals tab', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <TabbedPaneSection currentTab={ OFFICER_PAGE_TAB_NAMES.COACCUSALS }/>
      </Provider>
    );

    findRenderedComponentWithType(instance, Coaccusals).should.be.ok();
  });

  it('should render attachment tab', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <TabbedPaneSection currentTab={ OFFICER_PAGE_TAB_NAMES.ATTACHMENTS }/>
      </Provider>
    );

    findRenderedComponentWithType(instance, AttachmentsTab).should.be.ok();
  });

  it('should call changeOfficerTab when clicking tab name', function () {
    const stubChangeOfficerTab = stub();
    instance = renderIntoDocument(
      <Provider store={ store }>
        <TabbedPaneSection
          changeOfficerTab={ stubChangeOfficerTab }
          hasCoaccusal={ true }
          hasComplaint={ true }
          hasMapMarker={ true }
        />
      </Provider>
    );

    const mapTab = scryRenderedDOMComponentsWithClass(instance, 'tabbed-pane-tab-name')[1];
    Simulate.click(mapTab);

    stubChangeOfficerTab.should.be.calledWith('MAP');
  });
});
