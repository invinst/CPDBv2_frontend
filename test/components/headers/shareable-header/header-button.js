import React from 'react';
import { unmountComponentSuppressError } from 'utils/test';
import {
  renderIntoDocument,
  Simulate,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';

import HeaderButton from 'components/headers/shareable-header/header-button';
import ShareMenu from 'components/headers/shareable-header/share-menu';


describe('HeaderButton component', function () {
  let element;

  beforeEach(function () {
    element = renderIntoDocument(<HeaderButton scrollPosition='top' buttonText='Header button'/>);
  });

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should be renderable', function () {
    HeaderButton.should.be.renderable();
  });

  it('should close "share" menu by default', function () {
    element.state.shareMenuIsOpen.should.be.false();
  });

  it('should toggle menu when being clicked', function () {
    const shareButtonDOMElement = findRenderedDOMComponentWithClass(element, 'button');
    scryRenderedComponentsWithType(element, ShareMenu).should.have.length(0);
    Simulate.click(shareButtonDOMElement);
    findRenderedComponentWithType(element, ShareMenu);
    Simulate.click(shareButtonDOMElement);
    scryRenderedComponentsWithType(element, ShareMenu).should.have.length(0);
  });
});
