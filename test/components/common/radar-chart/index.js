import React from 'react';
import { unmountComponentSuppressError } from 'utils/test';
import RadarChart from 'components/common/radar-chart';
import RadarWrapper from 'components/common/radar-chart/radar-wrapper';
import RadarAxis from 'components/common/radar-chart/radar-axis';
import RadarToolTipPoints from 'components/common/radar-chart/radar-tooltip-point';
import {
  renderIntoDocument,
  findRenderedComponentWithType
} from 'react-addons-test-utils';

describe('Radar Chart components', function () {
  let instance;
  const data = [{
    year: 2015,
    items: [
      { axis: 'Use of Force Reports', value: 20 },
      { axis: 'Civilian Complaints', value: 0 },
      { axis: 'Internal Complaints', value: 10 },
    ]
  }, {
    year: 2016,
    items: [
      { axis: 'Use of Force Reports', value: 40 },
      { axis: 'Civilian Complaints', value: 50 },
      { axis: 'Internal Complaints', value: 60 },
    ]
  }, {
    year: 2017,
    items: [
      { axis: 'Use of Force Reports', value: 80 },
      { axis: 'Civilian Complaints', value: 70 },
      { axis: 'Internal Complaints', value: 60 },
    ]
  }];
  afterEach(function () {
    unmountComponentSuppressError(instance);
  });


  it('should be renderable', function () {
    RadarChart.should.be.renderable();
  });

  it('should render if data provided', function () {
    instance = renderIntoDocument(<RadarChart data={ data }/>);

    findRenderedComponentWithType(instance, RadarAxis);
    findRenderedComponentWithType(instance, RadarWrapper);
    findRenderedComponentWithType(instance, RadarToolTipPoints);
  });
});
