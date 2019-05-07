import React from 'react';

import {
  renderIntoDocument, scryRenderedDOMComponentsWithTag, findRenderedDOMComponentWithTag
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import PinActionHint from 'components/search-page/search-results/suggestion-group/suggestion-item/pin-action-hint';


describe('PinActionHint component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render nothing if item is unpinned', function () {
    instance = renderIntoDocument(<PinActionHint isPinned={ false }/>);

    scryRenderedDOMComponentsWithTag(instance, 'p').length.should.equal(0);
    scryRenderedDOMComponentsWithTag(instance, 'div').length.should.equal(0);
  });

  it('should render Unpin? text if item is pinned and pin button is hovered', function () {
    instance = renderIntoDocument(
      <PinActionHint isPinned={ true } isPinButtonHovered={ true }/>
    );
    const textContent = findRenderedDOMComponentWithTag(instance, 'p');

    textContent.textContent.should.be.equal('Unpin?');
  });

  it('should render pin icon if item is pinned and pin button is not hovered', function () {
    instance = renderIntoDocument(
      <PinActionHint isPinned={ true } className='test--pin-action-hint'/>
    );

    const divContent = findRenderedDOMComponentWithTag(instance, 'div');
    divContent.className.should.containEql('test--pin-action-hint');
  });
});
