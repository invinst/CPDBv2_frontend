import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType, } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import ScaleExplainer from 'components/officer-page/radar-chart/explainer/scale-explainer';
import StaticRadarChart from 'components/common/radar-chart';


describe('ScaleExplainer components', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render radar chart', function () {
    const radarChartData = [
      {
        axis: 'axis 1',
        value: 99,
      },
      {
        axis: 'axis 2',
        value: 98,
      },
      {
        axis: 'axis 3',
        value: 97,
      },
    ];

    instance = renderIntoDocument(<ScaleExplainer radarChartData={ radarChartData }/>);
    const radarChart = findRenderedComponentWithType(instance, StaticRadarChart);

    radarChart.props.data.should.eql(radarChartData);
  });
});
