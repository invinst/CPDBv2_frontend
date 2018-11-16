import React, { Component } from 'react';
import { spy } from 'sinon';
import { renderIntoDocument } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Printable from 'components/common/higher-order/printable';


describe('Printable component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  class Dummy extends Component {
    render() {
      return <div/>;
    }
  }

  const PrintableDummy = Printable(Dummy);

  it('should add media listener', function () {
    const addListenerSpy = spy();
    Object.defineProperty(window, 'matchMedia', {
      value: () => {
        return {
          matches: true,
          addListener: addListenerSpy
        };
      }
    });

    instance = renderIntoDocument(<PrintableDummy/>);
    addListenerSpy.calledWith(instance._mediaPrintListener).should.be.true();
  });

  it('should set isPrinting state when _mediaPrintListener is called', function () {
    instance = renderIntoDocument(<PrintableDummy/>);

    instance._mediaPrintListener({ matches: true });
    instance.state.isPrinting.should.be.true();

    instance._mediaPrintListener({ matches: false });
    instance.state.isPrinting.should.be.false();
  });
});
