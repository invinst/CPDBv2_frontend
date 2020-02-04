import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import MinimalScrollBars from 'components/common/minimal-scroll-bars';
import { Scrollbars } from 'react-custom-scrollbars';


describe('MinimalScrollBars component', function () {
  it('should render correctly', function () {
    const wrapper = mount(
      <MinimalScrollBars style={ { container: { style: 'abc' } } } viewClassName='some-view-class-name'/>
    );

    const scrollbars = wrapper.find(Scrollbars);
    scrollbars.prop('style').should.eql({ style: 'abc' });
    wrapper.find('.test--minimal-scrollbars-vertical-thumb').exists().should.be.true();
    const scrollView = wrapper.find('div').at(1);
    scrollView.prop('className').should.equal('some-view-class-name');
  });

  it('should set scrollTop when receive new value', function () {
    const wrapper = mount(<MinimalScrollBars scrollTop={ 10 } />);
    const instance = wrapper.instance();
    sinon.stub(instance.scrollerRef, 'scrollTop');

    wrapper.setProps({ scrollTop: 20 });

    instance.scrollerRef.scrollTop.should.be.calledWith(20);
  });

  it('should set scrollLeft when receive new value', function () {
    const wrapper = mount(<MinimalScrollBars scrollLeft={ 10 } />);
    const instance = wrapper.instance();
    sinon.stub(instance.scrollerRef, 'scrollLeft');

    wrapper.setProps({ scrollLeft: 20 });

    instance.scrollerRef.scrollLeft.should.be.calledWith(20);
  });

  it('should not render vertical thumb when showThumb is false', function () {
    const wrapper = mount(<MinimalScrollBars showThumb={ false } />);
    wrapper.find('.test--minimal-scrollbars-vertical-thumb').exists().should.be.false();
  });
});
