import React from 'react';
import {
  findRenderedComponentWithType, renderIntoDocument,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';
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
    }
  });
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render SummarySection and MetricsSection', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <OfficerPage />
      </Provider>
    );

    scryRenderedComponentsWithType(instance, SummarySection).should.have.length(1);
    scryRenderedComponentsWithType(instance, MetricsSection).should.have.length(1);
    scryRenderedComponentsWithType(instance, TabbedPaneSection).should.have.length(1);
  });

  it('should render Radar Chart Component', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <OfficerPage officerId={ 1 }/>
      </Provider>
    );

    findRenderedComponentWithType(instance, OfficerRadarChart);
  });
});
