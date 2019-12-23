import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';

import PropsStateRerender from 'components/common/higher-order/props-state-rerender';


describe('PropsStateRerender component', function () {
  let renderMock;

  function SubComponent(props) {
    return <div/>;
  }

  const WrappedComponent = PropsStateRerender(SubComponent);

  beforeEach(function () {
    renderMock = spy(SubComponent.prototype, 'render');
  });

  afterEach(function () {
    renderMock.restore();
  });

  it('should only re-render if props changed', function () {
    const wrapper = mount(<WrappedComponent a='b'/>);
    renderMock.should.be.calledOnce();

    wrapper.setProps({ a: 'b' });
    renderMock.should.be.calledOnce();

    wrapper.setProps({ a: 'c' });
    renderMock.should.be.calledTwice();
  });

  it('should only re-render if state changed', function () {
    const wrapper = mount(<WrappedComponent/>);
    renderMock.should.be.calledOnce();

    wrapper.setState({ c: 'd' });
    renderMock.should.be.calledTwice();

    wrapper.setState({ c: 'd' });
    renderMock.should.be.calledTwice();
  });
});
