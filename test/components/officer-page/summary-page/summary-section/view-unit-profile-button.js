import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument, findRenderedDOMComponentWithClass, Simulate } from 'react-addons-test-utils';
import { spy } from 'sinon';

import ViewUnitProfileButton from 'components/officer-page/summary-page/summary-section/view-unit-profile-button';
import { unmountComponentSuppressError } from 'utils/test/index';


describe('ViewUnitProfileButton component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render properly', function () {
    instance = renderIntoDocument(<ViewUnitProfileButton />);
    findDOMNode(instance).innerText.should.containEql('View Unit Profile');
  });

  it('should handle onClick event', function () {
    const onClick = spy();
    instance = renderIntoDocument(<ViewUnitProfileButton onClick={ onClick } unitName='001'/>);

    const element = findRenderedDOMComponentWithClass(instance, 'test--view-profile-button');
    Simulate.click(element);

    onClick.calledWith('001').should.be.true();
  });
});
