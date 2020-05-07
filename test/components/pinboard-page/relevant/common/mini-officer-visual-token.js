import React from 'react';
import { shallow } from 'enzyme';
import should from 'should';

import { softBlackColor } from 'utils/styles';
import MiniVisualToken from 'components/pinboard-page/relevant/common/mini-officer-visual-token';
import StaticRadarChart from 'components/common/radar-chart';


describe('MiniVisualToken component', function () {
  it('should render enough content', function () {
    const percentile = {
      officerId: 1,
      year: 2015,
      items: [
        { axis: 'Use of Force Reports', value: 20.6 },
        { axis: 'Officer Allegations', value: 10.1 },
        { axis: 'Civilian Allegations', value: 52.5 },
      ],
      visualTokenBackground: '#ed7467',
      textColor: softBlackColor,
    };
    const wrapper = shallow(
      <MiniVisualToken
        className='custom-class-name'
        percentile={ percentile }
      />
    );
    wrapper.prop('className').should.containEql('custom-class-name');

    const radarChart = wrapper.find(StaticRadarChart);
    radarChart.prop('hideAxisText').should.be.true();
    radarChart.prop('showGrid').should.be.false();
    radarChart.prop('showSpineLine').should.be.false();
    radarChart.prop('backgroundColor').should.equal('#ed7467');
    radarChart.prop('data').should.eql([
      { axis: 'Use of Force Reports', value: 20.6 },
      { axis: 'Officer Allegations', value: 10.1 },
      { axis: 'Civilian Allegations', value: 52.5 },
    ]);
    radarChart.prop('width').should.equal(22);
    radarChart.prop('height').should.equal(22);
    radarChart.prop('radius').should.equal(10);
    radarChart.prop('offsetTop').should.equal(2);
  });

  it('should render handle missing data', function () {
    const wrapper = shallow(<MiniVisualToken/>);

    const radarChart = wrapper.find(StaticRadarChart);
    radarChart.prop('hideAxisText').should.be.true();
    radarChart.prop('showGrid').should.be.false();
    radarChart.prop('showSpineLine').should.be.false();
    should(radarChart.props.backgroundColor).be.undefined();
    should(radarChart.props.data).be.undefined();
    radarChart.prop('width').should.equal(22);
    radarChart.prop('height').should.equal(22);
    radarChart.prop('radius').should.equal(10);
    radarChart.prop('offsetTop').should.equal(2);
  });
});
