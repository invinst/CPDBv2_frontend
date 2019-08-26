import React from 'react';
import {
  renderIntoDocument, Simulate, scryRenderedDOMComponentsWithTag,
} from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import LoginModalButton from 'components/login-modal/login-modal-button';


describe('LoginModalButton component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should handle onClick', function () {
    let onClickSpy = spy();

    instance = renderIntoDocument(<LoginModalButton onClick={ onClickSpy }/>);
    let buttonElement = scryRenderedDOMComponentsWithTag(instance, 'a')[0];
    Simulate.click(buttonElement);
    onClickSpy.calledOnce.should.be.true();
  });
});
