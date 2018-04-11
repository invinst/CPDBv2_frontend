import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { unmountComponentSuppressError } from 'utils/test';
import TabbedPaneSection from 'components/officer-page/summary-page/tabbed-pane-section';
import Timeline from 'components/officer-page/summary-page/tabbed-pane-section/timeline';


describe('TabbedPaneSection component', function () {
  const mockStore = MockStore();
  const store = mockStore({
    officerPage: {
      newTimeline: {},
    }
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

    tabbedPaneMenu.textContent.should.eql('TIMELINESUMMARYMAPCOACCUSALSATTACHMENTS');
    scryRenderedDOMComponentsWithClass(instance, 'test--tabbed-pane-tab-name').length.should.eql(5);
  });

  it('should render Timeline by default', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <TabbedPaneSection />
      </Provider>
    );

    findRenderedComponentWithType(instance, Timeline).should.be.ok();
  });
});
