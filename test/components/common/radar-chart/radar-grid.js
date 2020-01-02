import React from 'react';
import { shallow } from 'enzyme';

import RadarGrid from 'components/common/radar-chart/radar-grid';


describe('RadarGrid components', function () {
  it('should be renderable', function () {
    RadarGrid.should.be.renderable();
  });

  it('should render 5 small triangles', function () {
    const wrapper = shallow(
      <RadarGrid radius={ 100 } numAxis={ 3 } maxValue={ 100 } strokeWidth={ 1 }/>
    );

    wrapper.find('path').should.have.length(5);
  });

  it('should render 1 outer triangle if outerGridOnly is true', function () {
    const wrapper = shallow(
      <RadarGrid radius={ 100 } numAxis={ 3 } maxValue={ 100 } strokeWidth={ 1 } outerGridOnly={ true }/>
    );

    wrapper.find('path').exists().should.be.true();
    wrapper.find('.test--radar-grid-5').exists().should.be.true();
  });
});
