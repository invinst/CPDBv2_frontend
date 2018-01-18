import React from 'react';

import { unmountComponentSuppressError } from 'utils/test';
import { ShareButton } from 'components/headers/shareable-header/share-button';
import {
  renderIntoDocument,
  Simulate,
  scryRenderedDOMComponentsWithClass,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';


describe('ShareButton component', function () {
  let element;

  beforeEach(function () {
    element = renderIntoDocument(<ShareButton scrollPosition='top'/>);
  });

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should be renderable', function () {
    ShareButton.should.be.renderable();
  });

  it('should close "share" menu by default', function () {
    element.state.shareMenuIsOpen.should.be.false();
  });

  it('should toggle menu when being clicked', function () {
    const shareButtonDOMElement = findRenderedDOMComponentWithClass(element, 'test--shareable-header--share-link');
    scryRenderedDOMComponentsWithClass(element, 'test--shareable-header--share-menu').should.have.length(0);
    Simulate.click(shareButtonDOMElement);
    findRenderedDOMComponentWithClass(element, 'test--shareable-header--share-menu');
    Simulate.click(shareButtonDOMElement);
    scryRenderedDOMComponentsWithClass(element, 'test--shareable-header--share-menu').should.have.length(0);
  });
});
