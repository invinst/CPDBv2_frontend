import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import SummaryPage from 'components/officer-page/summary-page';
import SummarySection from 'components/officer-page/summary-page/summary-section/index';
import { unmountComponentSuppressError } from 'utils/test';
import MetricsSection from 'components/officer-page/summary-page/metrics-section';


describe('SummaryPage component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render SummarySection and MetricsSection', function () {
    instance = renderIntoDocument(<SummaryPage />);

    scryRenderedComponentsWithType(instance, SummarySection).should.have.length(1);
    scryRenderedComponentsWithType(instance, MetricsSection).should.have.length(1);
  });
});
