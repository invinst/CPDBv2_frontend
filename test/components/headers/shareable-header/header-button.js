import React from 'react';

import { unmountComponentSuppressError } from 'utils/test';
import HeaderButton from 'components/headers/shareable-header/header-button';
import {
  renderIntoDocument,
  Simulate,
  scryRenderedDOMComponentsWithClass,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';


describe('HeaderButton component', function () {
  let element;

  beforeEach(function () {
    element = renderIntoDocument(<HeaderButton scrollPosition='top'/>);
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
    const shareButtonDOMElement = findRenderedDOMComponentWithClass(element, 'share-button-link');
    scryRenderedDOMComponentsWithClass(element, 'test--shareable-header--share-menu').should.have.length(0);
    Simulate.click(shareButtonDOMElement);
    findRenderedDOMComponentWithClass(element, 'test--shareable-header--share-menu');
    Simulate.click(shareButtonDOMElement);
    scryRenderedDOMComponentsWithClass(element, 'test--shareable-header--share-menu').should.have.length(0);
  });
});
