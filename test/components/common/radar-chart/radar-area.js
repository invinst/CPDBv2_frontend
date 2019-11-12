import React from 'react';
import { shallow } from 'enzyme';
import RadarArea from 'components/common/radar-chart/radar-area';


describe('RadarArea components', function () {
  const rPoints = [{
    angle: 1,
    r: 2,
    value: 10.99,
  }, {
    angle: 2,
    r: 1,
    value: 20.11,
  }, {
    angle: 1.5,
    r: 1.5,
    value: 99.99,
  }];


  it('should render if data provided', function () {
    const wrapper = shallow(
      <RadarArea rPoints={ rPoints }/>
    );
    wrapper.find('.test--radar-wrapper').exists().should.be.true();
    wrapper.find('.test--radar-radar-area').exists().should.be.true();
    wrapper.find('.test--radar-stroke').exists().should.be.true();
    wrapper.find('.test--radar-value-text').exists().should.be.false();
  });

  it('should be able to render stroke with custom strokeWidth', function () {
    const wrapper = shallow(
      <RadarArea rPoints={ rPoints } strokeWidth={ 12 }/>
    );
    const radarStroke = wrapper.find('.test--radar-stroke');
    radarStroke.prop('style').should.containEql({ strokeWidth: 12 });
  });

  it('should not display radar area and stroke when rPoints is not valid', () => {
    const wrapper = shallow(
      <RadarArea rPoints={ [
        { angle: 0, r: NaN },
        { angle: 0, r: 12 },
        { angle: 12, r: 12.2 },
      ] }
      />
    );
    wrapper.find('.test--radar-value-text').exists().should.be.false();
  });

  it('should render radar area with custom radarMainAreaOpacity', function () {
    const wrapper = shallow(<RadarArea rPoints={ rPoints } radarMainAreaOpacity={ 0.5 }/>);
    const radarArea = wrapper.find('.test--radar-radar-area');
    radarArea.prop('style').should.containEql({ fillOpacity: 0.5 });
  });
});
