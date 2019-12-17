import React from 'react';
import { shallow } from 'enzyme';

import RadarChart from 'components/common/radar-chart/radar-chart';
import RadarArea from 'components/common/radar-chart/radar-area';
import RadarLegend from 'components/common/radar-chart/radar-legend';
import RadarAxis from 'components/common/radar-chart/radar-axis';
import RadarSpineLine from 'components/common/radar-chart/radar-spine-line';
import RadarGrid from 'components/common/radar-chart/radar-grid';


describe('RadarChart component', function () {
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

  it('should be renderable', () => {
    RadarChart.should.be.renderable();
  });

  it('should render default radar chart if data provided', () => {
    const wrapper = shallow(<RadarChart data={ data }/>);
    wrapper.find(RadarArea).exists().should.be.true();
    wrapper.find(RadarSpineLine).exists().should.be.true();
    wrapper.find(RadarLegend).exists().should.be.true();

    wrapper.find('.test--radar').prop('style')
      .should.containEql({ backgroundColor: '#FDFAF2' });
    wrapper.find('.test--radar-boundary-area').exists().should.be.true();
  });

  it('should show RadarAxis if there is data and showAxisTitle || showAxisValue', function () {
    const wrapper = shallow(<RadarChart data={ data } showAxisTitle={ true }/>);
    wrapper.find(RadarAxis).exists().should.be.true();

    wrapper.setProps({ data, showAxisTitle: false, showAxisValue: false });
    wrapper.find(RadarAxis).exists().should.be.false();

    const wrapper2 = shallow(<RadarChart data={ data } showAxisValue={ true }/>);
    wrapper2.find(RadarAxis).exists().should.be.true();
  });

  it('should render grid if showGrid is true', function () {
    const wrapper = shallow(<RadarChart data={ data } showGrid={ true }/>);
    wrapper.find(RadarGrid).exists().should.be.true();
  });

  it('should hide spline line if showSpineLine is set to false', function () {
    const wrapper = shallow(<RadarChart data={ data } showSpineLine={ false }/>);
    wrapper.find(RadarSpineLine).exists().should.be.false();
  });

  it('should render with the given aspect ratio config props', () => {
    const config = {
      width: 232,
      height: 100,
      radius: 164,
    };
    const wrapper = shallow(<RadarChart data={ data } { ...config } />);
    const elementDOM = wrapper.find('.test--radar');
    elementDOM.prop('viewBox').should.equal('0 0 232 100');
  });

  it('should change background color backgroundColor is true ', () => {
    const wrapper = shallow(<RadarChart data={ data } backgroundColor='red'/>);

    wrapper.find('.test--radar').prop('style')
      .should.containEql({ backgroundColor: 'red' });
  });

  it('should position radar chart with offsetTop', function () {
    const config = {
      width: 232,
      height: 100,
      radius: 164,
    };
    const wrapper = shallow(<RadarChart data={ data } offsetTop={ 3 } { ...config }/>);

    wrapper.find('.test--radar-chart-transform').prop('transform').should.containEql('translate(116 37)');
  });
});
