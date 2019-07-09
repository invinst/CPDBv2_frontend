import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';
import should from 'should';

import { unmountComponentSuppressError, renderWithContext } from 'utils/test';
import StaticRadarChart from 'components/common/radar-chart';
import RadarChart from 'components/common/radar-chart/radar-chart';
import RadarArea from 'components/common/radar-chart/radar-area';
import RadarGrid from 'components/common/radar-chart/radar-grid';


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
      offsetTop: 2,
      someProps: 'someProps'
    };

    instance = renderIntoDocument(<StaticRadarChart { ...props }/>);

    const noDataRadarChart = findRenderedComponentWithType(instance, RadarChart);
    should(noDataRadarChart.props.data).be.undefined();
    noDataRadarChart.props.numMetrics.should.equal(3);
    noDataRadarChart.props.backgroundColor.should.equal('#ADADAD');
    noDataRadarChart.props.showGrid.should.be.true();
    noDataRadarChart.props.outerGridOnly.should.be.true();
    noDataRadarChart.props.gridColor.should.equal('#8F8F8F');
    noDataRadarChart.props.strokeWidth.should.equal(0.6);
    noDataRadarChart.props.boundaryAreaColor.should.equal('#ADADAD');
    noDataRadarChart.props.offsetTop.should.equal(2);

    findRenderedComponentWithType(instance, RadarArea);
    const radarGrid = findRenderedComponentWithType(instance, RadarGrid);
    radarGrid.props.outerGridOnly.should.be.true();
    radarGrid.props.strokeColor.should.equal('#8F8F8F');
    radarGrid.props.strokeWidth.should.equal(0.6);
  });

  it('should render RadarChart with more props in print mode', function () {
    const context = { printMode: true };
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
    instance = renderWithContext(context, <StaticRadarChart { ...props }/>);
    const radarChart = findRenderedComponentWithType(instance, RadarChart);
    radarChart.props.textColor.should.eql('#231F20');
    radarChart.props.backgroundColor.should.eql('#F5F4F4');
    radarChart.props.gridColor.should.eql('#231F20');
    radarChart.props.boundaryAreaColor.should.eql('#F5F4F4');
    radarChart.props.gridOpacity.should.eql(0.5);
    radarChart.props.strokeWidth.should.eql(0);
    radarChart.props.radarMainAreaOpacity.should.eql(0.4);
  });
});
