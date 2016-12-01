import React from 'react';
import {
  renderIntoDocument, Simulate, scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import ForgotPasswordLink from 'components/login-modal/forgot-password-link';


describe('ForgotPasswordLink component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should handle onClick', function () {
    let onClickSpy = spy();

    instance = renderIntoDocument(<ForgotPasswordLink onClick={ onClickSpy }/>);
    let linkElement = scryRenderedDOMComponentsWithTag(instance, 'div')[0];
    Simulate.click(linkElement);
    onClickSpy.calledOnce.should.be.true();
  });
});
