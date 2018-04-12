import React from 'react';
import {
  findRenderedComponentWithType,
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import SummaryPage from 'components/officer-page/summary-page';
import SummarySection from 'components/officer-page/summary-page/summary-section';
import MetricsSection from 'components/officer-page/summary-page/metrics-section';
import TabbedPaneSection from 'components/officer-page/summary-page/tabbed-pane-section';
import OfficerRadarChart from 'components/officer-page/summary-page/radar-chart';


describe('SummaryPage component', function () {
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
        <SummaryPage />
      </Provider>
    );

    scryRenderedComponentsWithType(instance, SummarySection).should.have.length(1);
    scryRenderedComponentsWithType(instance, MetricsSection).should.have.length(1);
    scryRenderedComponentsWithType(instance, TabbedPaneSection).should.have.length(1);
  });

  it('should render Radar Chart Component', function () {
    const fetchPercentileCallback = spy();

    instance = renderIntoDocument(
      <Provider store={ store }>
        <SummaryPage officerId={ 1 } fetchPercentile={ fetchPercentileCallback }/>
      </Provider>
    );
    findRenderedComponentWithType(instance, OfficerRadarChart);
    fetchPercentileCallback.calledWith(1).should.be.true();
  });
});
