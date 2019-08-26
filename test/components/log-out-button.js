import React from 'react';
import { spy } from 'sinon';
import {
  renderIntoDocument, findRenderedComponentWithType, scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import LogOutButton from 'components/log-out-button';
import { HoverableButton } from 'components/common/hoverable-button';
import { unmountComponentSuppressError } from 'utils/test';


describe('LogOutButton component', function () {
  let instance;
  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render log out button if its show property is true', function () {
    instance = renderIntoDocument(<LogOutButton show={ true } />);
    findRenderedComponentWithType(instance, HoverableButton);
  });

  it('should not render anything if its show property is false', function () {
    instance = renderIntoDocument(<LogOutButton show={ false } />);
    scryRenderedComponentsWithType(instance, HoverableButton).length.should.equal(0);
  });

  it('should handle on click', function () {
    const logOut = spy();
    instance = renderIntoDocument(<LogOutButton show={ true } logOut={ logOut } />);

    const logOutButton = findRenderedComponentWithType(instance, HoverableButton);
    logOutButton.props.onClick();

    logOut.called.should.be.true();
  });
});
