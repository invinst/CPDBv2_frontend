import React from 'react';
import { findRenderedComponentWithType, renderIntoDocument, } from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { unmountComponentSuppressError } from 'utils/test';
import OfficerPage from 'components/officer-page';
import SummarySection from 'components/officer-page/summary-section';
import MetricsSection from 'components/officer-page/metrics-section';
import TabbedPaneSection from 'components/officer-page/tabbed-pane-section';
import OfficerRadarChart from 'components/officer-page/radar-chart';


describe('OfficerPage component', function () {
  const mockStore = MockStore();
  const store = mockStore({
    officerPage: {
      summary: {},
      metrics: {},
      newTimeline: {},
    },
    breadcrumb: {
      breadcrumbs: []
    },
    popups: [],
  });
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render enough sections', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <OfficerPage officerId={ 1 }/>
      </Provider>
    );

    findRenderedComponentWithType(instance, SummarySection);
    findRenderedComponentWithType(instance, MetricsSection);
    findRenderedComponentWithType(instance, TabbedPaneSection);
    findRenderedComponentWithType(instance, OfficerRadarChart);
  });
});
