import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import Arrow from 'components/common/carousel/arrow';

describe('Carousel Arrow component', function () {
  it('should render', function () {
    const wrapper = shallow(
      <Arrow direction='left' show={ true }/>
    );
    wrapper.find('.test--carousel-arrow-left').exists().should.be.true();
  });

  it('should have appropriate click handler', function () {
    const spyClickHandler = spy();
    const wrapper = shallow(
      <Arrow direction='left' onClick={ spyClickHandler } show={ true }/>
    );
    const arrowWrapper = wrapper.find('.test--carousel-arrow-left');
    arrowWrapper.simulate('click');
    spyClickHandler.should.be.called();
  });
});
