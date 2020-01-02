import React from 'react';
import { shallow, mount } from 'enzyme';
import should from 'should';

import { withAnimationDisabled } from 'utils/test';
import ExpandTransition from 'components/animation/expand-transition';


describe('ExpandTransition component', function () {
  it('should not render anything when childKey is null initially', function () {
    const wrapper = shallow(
      <ExpandTransition childKey={ null }><p/></ExpandTransition>
    );
    should(wrapper.type()).be.null();
  });

  it('should render children immediately when animation is disabled', function () {
    withAnimationDisabled(() => {
      const wrapper = shallow(
        <ExpandTransition childKey={ 1 }><p/></ExpandTransition>
      );
      wrapper.type().should.equal('p');
    });
  });

  it('should render child if childKey is not null', function () {
    let testText = 'should be rendered';
    const wrapper = shallow(
      <ExpandTransition childKey={ 1 }><p>{ testText }</p></ExpandTransition>
    );
    wrapper.text().should.containEql(testText);
  });

  it('should eventually render nothing as childKey becomes null', function (done) {
    let cb1 = () => {}, cb2 = () => {};

    const wrapper = mount(
      <ExpandTransition childKey={ 1 } onFullyClosed={ cb1 } onExpansionBegin={ cb2 }><p/></ExpandTransition>
    );

    wrapper.setProps({
      children: <p/>,
      childKey: null,
      onFullyClosed: cb1,
      onExpansionBegin: cb2,
    });
    wrapper.find('p').exists().should.be.true();
    setTimeout(() => {
      wrapper.find('p').exists().should.be.false();
      done();
    }, 300);
  });
});
