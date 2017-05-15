import React from 'react';
import { findDOMNode } from 'react-dom';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import { renderIntoDocument, findRenderedDOMComponentWithClass, Simulate } from 'react-addons-test-utils';
import ViewProfileButton from 'components/cr-page/officer-row/view-profile-button';


describe('ViewProfileButton component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render properly', function () {
    instance = renderIntoDocument(<ViewProfileButton />);
    findDOMNode(instance).innerHTML.should.containEql('view officer profile');
  });

  it('should handle onClick', function () {
    const onClick = spy();
    instance = renderIntoDocument(<ViewProfileButton onClick={ onClick } officerId={ 1 }/>);

    const button = findRenderedDOMComponentWithClass(instance, 'test--view-profile-button');
    Simulate.click(button);

    onClick.calledWith(1).should.be.true();
  });
});
