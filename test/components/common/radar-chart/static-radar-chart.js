import React from 'react';
import should from 'should';
import { shallow, mount } from 'enzyme';

import StaticRadarChart from 'components/common/radar-chart';
import RadarChart from 'components/common/radar-chart/radar-chart';
import RadarArea from 'components/common/radar-chart/radar-area';
import RadarGrid from 'components/common/radar-chart/radar-grid';
import { PrintModeContext } from 'contexts';


describe('StaticRadarChart component', function () {
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
      },
    ];
    const props = {
      data: data,
      width: 456,
      height: 432,
      radius: 123,
      someProps: 'someProps',
    };

    const wrapper = shallow(<StaticRadarChart { ...props }/>);

    const radarChart = wrapper.find(RadarChart);
    radarChart.props().should.containEql(props);
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
      },
    ];
    const props = {
      data: missingData,
      width: 456,
      height: 432,
      radius: 123,
      offsetTop: 2,
      someProps: 'someProps',
    };

    const wrapper = mount(<StaticRadarChart { ...props }/>);

    const noDataRadarChart = wrapper.find(RadarChart);
    should(noDataRadarChart.props.data).be.undefined();
    noDataRadarChart.prop('numMetrics').should.equal(3);
    noDataRadarChart.prop('backgroundColor').should.equal('#ADADAD');
    noDataRadarChart.prop('showGrid').should.be.true();
    noDataRadarChart.prop('outerGridOnly').should.be.true();
    noDataRadarChart.prop('gridColor').should.equal('#8F8F8F');
    noDataRadarChart.prop('strokeWidth').should.equal(0.6);
    noDataRadarChart.prop('boundaryAreaColor').should.equal('#ADADAD');
    noDataRadarChart.prop('offsetTop').should.equal(2);

    wrapper.find(RadarArea).exists().should.be.true();
    const radarGrid = wrapper.find(RadarGrid);
    radarGrid.prop('outerGridOnly').should.be.true();
    radarGrid.prop('strokeColor').should.equal('#8F8F8F');
    radarGrid.prop('strokeWidth').should.equal(0.6);
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
      },
    ];
    const props = {
      data: data,
      width: 456,
      height: 432,
      radius: 123,
      someProps: 'someProps',
    };
    const wrapper = mount(
      <PrintModeContext.Provider value={ context }>
        <StaticRadarChart { ...props }/>
      </PrintModeContext.Provider>,
    );
    const radarChart = wrapper.find(RadarChart);

    radarChart.prop('textColor').should.equal('#231F20');
    radarChart.prop('backgroundColor').should.equal('#F5F4F4');
    radarChart.prop('gridColor').should.equal('#231F20');
    radarChart.prop('boundaryAreaColor').should.equal('#F5F4F4');
    radarChart.prop('gridOpacity').should.equal(0.5);
    radarChart.prop('strokeWidth').should.equal(0);
    radarChart.prop('radarMainAreaOpacity').should.equal(0.4);
  });
});
