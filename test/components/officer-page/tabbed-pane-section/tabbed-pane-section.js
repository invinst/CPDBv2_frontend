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
    }
  });
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render Header with correct tab names', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <TabbedPaneSection
          currentTab='TIMELINE'
          attachmentComplaintCount={ 1 }
          mapMarkerCount={ 1 }
          coaccusalCount={ 1 }
        />
      </Provider>
    );

    const tabbedPaneMenu = findRenderedDOMComponentWithClass(instance, 'test--tabbed-pane-section-menu');

    tabbedPaneMenu.textContent.should.containEql('TIMELINE');
    tabbedPaneMenu.textContent.should.containEql('COACCUSALS');
    tabbedPaneMenu.textContent.should.containEql('ATTACHMENTS');
    tabbedPaneMenu.textContent.should.containEql('MAP');
    scryRenderedDOMComponentsWithClass(instance, 'test--tabbed-pane-tab-name').length.should.eql(4);
  });

  it('should hide the tabs with no data', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <TabbedPaneSection
          currentTab='TIMELINE'
          attachmentComplaintCount={ 0 }
          mapMarkerCount={ 0 }
          coaccusalCount={ 0 }
        />
      </Provider>
    );

    const tabbedPaneMenu = findRenderedDOMComponentWithClass(instance, 'test--tabbed-pane-section-menu');

    tabbedPaneMenu.textContent.should.containEql('TIMELINE');
    tabbedPaneMenu.textContent.should.not.containEql('COACCUSALS');
    tabbedPaneMenu.textContent.should.not.containEql('ATTACHMENTS');
    tabbedPaneMenu.textContent.should.not.containEql('MAP');
    scryRenderedDOMComponentsWithClass(instance, 'test--tabbed-pane-tab-name').length.should.eql(1);
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
          mapMarkerCount={ 1 }
        />
      </Provider>
    );

    const mapTab = scryRenderedDOMComponentsWithClass(instance, 'test--tabbed-pane-tab-name')[1];
    Simulate.click(mapTab);

    stubChangeOfficerTab.should.be.calledWith('MAP');
  });
});
