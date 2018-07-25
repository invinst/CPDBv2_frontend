import React from 'react';
import {
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
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

  it('should render Header with correct tab names', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <TabbedPaneSection />
      </Provider>
    );

    const tabbedPaneMenu = findRenderedDOMComponentWithClass(instance, 'test--tabbed-pane-section-menu');

    tabbedPaneMenu.textContent.should.eql('TIMELINEMAPCOACCUSALSATTACHMENTS');
    scryRenderedDOMComponentsWithClass(instance, 'test--tabbed-pane-tab-name').length.should.eql(4);
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
        <TabbedPaneSection changeOfficerTab={ stubChangeOfficerTab }/>
      </Provider>
    );

    const mapTab = scryRenderedDOMComponentsWithClass(instance, 'test--tabbed-pane-tab-name')[1];
    Simulate.click(mapTab);

    stubChangeOfficerTab.should.be.calledWith('MAP');
  });
});
