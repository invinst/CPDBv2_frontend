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

import { unmountComponentSuppressError } from 'utils/test';
import TabbedPaneSection from 'components/officer-page/tabbed-pane-section';
import Timeline from 'components/officer-page/tabbed-pane-section/timeline';


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

    const tabNames = scryRenderedDOMComponentsWithClass(instance, 'test--tabbed-pane-tab-name');

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

    const tabNames = scryRenderedDOMComponentsWithClass(instance, 'test--tabbed-pane-tab-name');

    tabNames.should.have.length(1);
    tabNames[0].textContent.should.be.eql('TIMELINE');
  });

  it('should render current tab', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <TabbedPaneSection currentTab='TIMELINE'/>
      </Provider>
    );

    findRenderedComponentWithType(instance, Timeline).should.be.ok();
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

    const mapTab = scryRenderedDOMComponentsWithClass(instance, 'test--tabbed-pane-tab-name')[1];
    Simulate.click(mapTab);

    stubChangeOfficerTab.should.be.calledWith('MAP');
  });
});
