import React from 'react';
import { shallow } from 'enzyme';

import RadarSpineLine from 'components/common/radar-chart/radar-spine-line';


describe('RadarSpineLine component', function () {
  it('should draw 3 lines if have 3 axis titles', () => {
    const data = [
      { x: 1, y: 4 },
      { x: 2, y: 5 },
      { x: 3, y: 6 },
    ];
    const wrapper = shallow(<RadarSpineLine rPoints={ data }/>);
    wrapper.find('.test--radar-spine-line').exists().should.be.true();
    wrapper.find('line').should.have.length(3);
  });

  it('should draw circles if showSpineLinePoint is true', function () {
    const data = [
      { x: 1, y: 4 },
      { x: 2, y: 5 },
      { x: 3, y: 6 },
    ];
    const wrapper = shallow(<RadarSpineLine rPoints={ data } showSpineLinePoint={ true }/>);

    wrapper.find('circle').should.have.length(3);
  });
});
