import React, { Component } from 'react';
import { render } from 'react-dom';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import PropsStateRerender from 'components/common/higher-order/props-state-rerender';


describe('PropsStateRerender component', function () {
  let instance;
  let callback;

  class SubComponent extends Component {
    render() {
      callback();
      return <div/>;
    }
  }
  const WrappedComponent = PropsStateRerender(SubComponent);

  beforeEach(function () {
    callback = spy();
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should only re-render if props changed', function () {
    const rootEl = document.createElement('DIV');
    instance = render(<WrappedComponent a='b'/>, rootEl);
    callback.args.length.should.eql(1);
    instance = render(<WrappedComponent a='b'/>, rootEl);
    callback.args.length.should.eql(1);
    instance = render(<WrappedComponent a='c'/>, rootEl);
    callback.args.length.should.eql(2);
  });

  it('should only re-render if state changed', function () {
    const rootEl = document.createElement('DIV');
    instance = render(<WrappedComponent/>, rootEl);
    callback.args.length.should.eql(1);
    instance.setState({ c: 'd' });
    callback.args.length.should.eql(2);
    instance.setState({ c: 'd' });
    callback.args.length.should.eql(2);
  });
});
