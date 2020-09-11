import React from 'react';
import { mount } from 'enzyme';

import MetricsSection from 'components/officer-page/metrics-section';
import MetricPane from 'components/officer-page/metrics-section/metric-pane';
import MetricsColumn from 'components/officer-page/metrics-section/metrics-column';


const checkMetricPaneDataInfo = (metricPane, value, name, description) => {
  metricPane.find('.metrics-pane-value').text().should.equal(value);
  metricPane.find('.metrics-pane-name').text().should.equal(name);
  metricPane.find('.metrics-pane-description').text().should.equal(description);
};

describe('MetricsSection', function () {
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
      totalLawsuitSettlements: '$0',
    };
    const wrapper = mount(<MetricsSection metrics={ metrics }/>);

    wrapper.find(MetricsColumn).should.have.length(3);
    wrapper.find(MetricPane).should.have.length(6);

    const metricsPanes = wrapper.find(MetricPane);
    checkMetricPaneDataInfo(metricsPanes.at(0), '90', 'Allegations', 'More than 99.9% of other officers');
    checkMetricPaneDataInfo(metricsPanes.at(1), '4', 'Sustained', '0 Disciplined');
    checkMetricPaneDataInfo(metricsPanes.at(2), '4', 'Use of Force Reports', 'More than 6% of other officers');
    checkMetricPaneDataInfo(metricsPanes.at(3), '$0', 'Total Lawsuit Settlements', '');
    checkMetricPaneDataInfo(metricsPanes.at(4), '5', 'Major Awards', '');
    checkMetricPaneDataInfo(metricsPanes.at(5), '1', 'Honorable Mention', 'More than 3% of other officers');
  });

  it('should not show More than N/A% officers when there is no percentile calculated', function () {
    const metrics = {
      allegationCount: 90,
      allegationPercentile: 'N/A',
      honorableMentionCount: 1,
      sustainedCount: 4,
      disciplineCount: 0,
      honorableMentionPercentile: 'N/A',
      useOfForceCount: 4,
      majorAwardCount: 5,
      useOfForcePercentile: 'N/A',
      totalLawsuitSettlements: '$0',
    };
    const wrapper = mount(<MetricsSection metrics={ metrics } />);
    const metricsPanes = wrapper.find(MetricPane);
    checkMetricPaneDataInfo(metricsPanes.at(0), '90', 'Allegations', '');
    checkMetricPaneDataInfo(metricsPanes.at(1), '4', 'Sustained', '0 Disciplined');
    checkMetricPaneDataInfo(metricsPanes.at(2), '4', 'Use of Force Reports', '');
    checkMetricPaneDataInfo(metricsPanes.at(3), '$0', 'Total Lawsuit Settlements', '');
    checkMetricPaneDataInfo(metricsPanes.at(4), '5', 'Major Awards', '');
    checkMetricPaneDataInfo(metricsPanes.at(5), '1', 'Honorable Mention', '');
  });

  it('should not show More than 0% of other officers for Honorable Mention', function () {
    const metrics = {
      allegationCount: 90,
      allegationPercentile: 'N/A',
      honorableMentionCount: 1,
      sustainedCount: 4,
      disciplineCount: 0,
      honorableMentionPercentile: 0,
      useOfForceCount: 4,
      majorAwardCount: 5,
      useOfForcePercentile: 'N/A',
      totalLawsuitSettlements: '$0',
    };
    const wrapper = mount(<MetricsSection metrics={ metrics } />);
    const metricsPanes = wrapper.find(MetricPane);
    checkMetricPaneDataInfo(metricsPanes.at(5), '1', 'Honorable Mention', '');
  });
});
