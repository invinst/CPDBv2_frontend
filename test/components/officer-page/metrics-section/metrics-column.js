import React from 'react';
import { shallow } from 'enzyme';

import MetricPane from 'components/officer-page/metrics-section/metric-pane';
import MetricsColumn from 'components/officer-page/metrics-section/metrics-column';


describe('MetricsColumn', function () {
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
      },
    ];
    const wrapper = shallow(<MetricsColumn metrics={ metrics }/>);

    wrapper.find(MetricPane).should.have.length(2);
  });
});
