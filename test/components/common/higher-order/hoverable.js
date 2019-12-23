import React from 'react';
import { shallow, mount } from 'enzyme';

import Hoverable from 'components/common/higher-order/hoverable';


describe('Hoverable component', function () {
  function Dummy(props) {
    return <div/>;
  }

  const HoverableDummy = Hoverable(Dummy);

  it('should pass hovering to children', function () {
    const wrapper = shallow(<HoverableDummy/>);
    const dummy = wrapper.find(Dummy);
    dummy.prop('hovering').should.be.false();
  });

  it('should pass hovering equal true to children when hovered', function () {
    const wrapper = mount(<HoverableDummy onMouseOver={ () => {} } onMouseOut={ () => {} }/>);
    const span = wrapper.find('span');
    span.simulate('mouseOver');
    const dummy = wrapper.find(Dummy);
    dummy.prop('hovering').should.be.true();
    span.simulate('mouseOut');
    dummy.prop('hovering').should.be.false();
  });
});
