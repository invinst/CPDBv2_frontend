import React from 'react';
import {
  findRenderedComponentWithType,
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import SummaryPage from 'components/officer-page/summary-page';
import SummarySection from 'components/officer-page/summary-page/summary-section/index';
import MetricsSection from 'components/officer-page/summary-page/metrics-section';
import BiographySection from 'components/officer-page/summary-page/biography-section';
import OfficerRadarChart from 'components/officer-page/summary-page/radar-chart';


describe('SummaryPage component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render SummarySection and MetricsSection', function () {
    instance = renderIntoDocument(<SummaryPage />);

    scryRenderedComponentsWithType(instance, SummarySection).should.have.length(1);
    scryRenderedComponentsWithType(instance, MetricsSection).should.have.length(1);
    scryRenderedComponentsWithType(instance, BiographySection).should.have.length(1);
  });

  it('should render Radar Chart Component', function () {
    const fetchPercentileCallback = spy();

    instance = renderIntoDocument(
      <SummaryPage officerId={ 1 } fetchPercentile={ fetchPercentileCallback }/>
    );
    findRenderedComponentWithType(instance, OfficerRadarChart);
    fetchPercentileCallback.calledWith(1).should.be.true();
  });
});
