import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';
import should from 'should';

import { unmountComponentSuppressError } from 'utils/test';
import StaticRadarChart from 'components/common/radar-chart';
import RadarChart from 'components/common/radar-chart/radar-chart';
import RadarArea from 'components/common/radar-chart/radar-area';


describe('StaticRadarChart component', function () {
  let instance;

  afterEach(() => {
    unmountComponentSuppressError(instance);
  });

  it('should be able to render RadarChart', () => {
    const data = [
      {
        axis: 'A',
        value: 10,
      },
      {
        axis: 'B',
        value: 50,
      },
      {
        axis: 'C',
        value: 20,
      }
    ];
    const props = {
      data: data,
      width: 456,
      height: 432,
      radius: 123,
      someProps: 'someProps'
    };

    instance = renderIntoDocument(<StaticRadarChart { ...props }/>);

    const radarChart = findRenderedComponentWithType(instance, RadarChart);
    radarChart.props.should.containEql(props);
  });

  it('should render no data radar chart if some data is missing', () => {
    const missingData = [
      {
        axis: 'A',
        value: NaN,
      },
      {
        axis: 'B',
        value: 50,
      },
      {
        axis: 'C',
        value: 20,
      }
    ];
    const props = {
      data: missingData,
      width: 456,
      height: 432,
      radius: 123,
      someProps: 'someProps'
    };

    instance = renderIntoDocument(<StaticRadarChart { ...props }/>);

    const noDataRadarChart = findRenderedComponentWithType(instance, RadarChart);
    should(noDataRadarChart.props.data).be.undefined();
    findRenderedComponentWithType(instance, RadarArea);
  });
});
