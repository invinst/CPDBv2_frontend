import React from 'react';
import { mount } from 'enzyme';
import { stub } from 'sinon';

import Scroller from 'components/common/scroller';


describe('Scroller component', function () {
  it('should give back its element', function () {
    let element;
    const wrapper = mount(<Scroller onElementRef={ el => element = el }/>);
    element.should.eql(wrapper.instance().element);
    element.should.eql(wrapper.getDOMNode());
  });

  context('handleElementRef stubbed', function () {
    beforeEach(function () {
      stub(Scroller.prototype, 'handleElementRef');
    });

    afterEach(function () {
      Scroller.prototype.handleElementRef.restore();
    });

    it('should set its element scrollTop when receive a new scrollTop', function () {
      const wrapper = mount(
        <Scroller scrollTop={ 0 }/>
      );
      const instance = wrapper.instance();

      instance.element = stub();
      wrapper.setProps({ scrollTop: 10 });

      instance.element.scrollTop.should.equal(10);
    });

    it('should set its element scrollLeft when receive a new scrollLeft', function () {
      const wrapper = mount(
        <Scroller scrollLeft={ 0 }/>
      );
      const instance = wrapper.instance();

      instance.element = stub();
      wrapper.setProps({ scrollLeft: 10 });

      instance.element.scrollLeft.should.equal(10);
    });
  });
});
