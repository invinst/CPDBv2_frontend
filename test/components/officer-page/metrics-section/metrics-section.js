import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';

import MetricsSection from 'components/officer-page/metrics-section';
import MetricPane from 'components/officer-page/metrics-section/metric-pane';
import MetricsColumn from 'components/officer-page/metrics-section/metrics-column';
import { unmountComponentSuppressError } from 'utils/test';


const checkMetricPaneDataInfo = (metricPane, value, name, description) => {
  const _value = findRenderedDOMComponentWithClass(metricPane, 'test--metrics-pane-value');
  const _name = findRenderedDOMComponentWithClass(metricPane, 'test--metrics-pane-name');
  const _description = findRenderedDOMComponentWithClass(metricPane, 'test--metrics-pane-description');

  _value.textContent.should.eql(value);
  _name.textContent.should.eql(name);
  _description.textContent.should.eql(description);
};

describe('MetricsSection', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render with correct information', function () {
    const metrics = {
      allegationCount: 90,
      allegationPercentile: 99.994,
      honorableMentionCount: 1,
      sustainedCount: 4,
      disciplineCount: 0,
      honorableMentionPercentile: 3.000,
      useOfForceCount: 4,
      majorAwardCount: 5,
      useOfForcePercentile: 6.000,
      civilianComplimentCount: 0,
    };
    instance = renderIntoDocument(<MetricsSection metrics={ metrics }/>);

    scryRenderedComponentsWithType(instance, MetricsColumn).should.have.length(3);
    scryRenderedComponentsWithType(instance, MetricPane).should.have.length(6);

    const metricsPanes = scryRenderedComponentsWithType(instance, MetricPane);
    checkMetricPaneDataInfo(metricsPanes[0], '90', 'Allegations', 'More than 99.9% of other officers');
    checkMetricPaneDataInfo(metricsPanes[1], '4', 'Sustained', '0 Disciplined');
    checkMetricPaneDataInfo(metricsPanes[2], '4', 'Use of Force Reports', 'More than 6% of other officers');
    checkMetricPaneDataInfo(metricsPanes[3], '0', 'Civilian Compliments', '');
    checkMetricPaneDataInfo(metricsPanes[4], '5', 'Major Awards', '');
    checkMetricPaneDataInfo(metricsPanes[5], '1', 'Honorable Mention', 'More than 3% of other officers');
  });
});
