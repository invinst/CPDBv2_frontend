import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';

import MetricPane from 'components/officer-page/metrics-section/metric-pane';
import MetricsColumn from 'components/officer-page/metrics-section/metrics-column';
import { unmountComponentSuppressError } from 'utils/test';


describe('MetricsColumn', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render enough MetricPanes', function () {
    const metrics = [
      {
        value: 90,
        name: 'Allegations',
        description: 'More than 99.994% of other officers',
      },
      {
        value: 4,
        name: 'Sustained',
        description: '0 Disciplined',
        highlightValue: true,
      }
    ];
    instance = renderIntoDocument(<MetricsColumn metrics={ metrics }/>);

    scryRenderedComponentsWithType(instance, MetricPane).should.have.length(2);
  });
});
