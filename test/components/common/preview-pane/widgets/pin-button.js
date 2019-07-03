import React from 'react';
import {
  Simulate,
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
} from 'react-addons-test-utils';
import { stub } from 'sinon';

import PinButton from 'components/common/preview-pane/widgets/pin-button';
import { unmountComponentSuppressError } from 'utils/test';


describe('PinButton component', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should display "Remove from pinboard" if isPinned', function () {
    instance = renderIntoDocument(
      <PinButton item={ { isPinned: true } } />
    );

    findRenderedDOMComponentWithTag(instance, 'button').textContent.should.be.equal('Remove from pinboard');
  });

  it('should display "Add to pinboard" if not isPinned', function () {
    instance = renderIntoDocument(
      <PinButton item={ { isPinned: false } } />
    );

    findRenderedDOMComponentWithTag(instance, 'button').textContent.should.be.equal('Add to pinboard');
  });

  it('should handle addOrRemoveItemInPinboard on click', function () {
    const addOrRemoveItemInPinboardStub = stub();
    instance = renderIntoDocument(
      <PinButton
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboardStub }
        item={ { type: 'OFFICER', id: '123456', isPinned: true } }
      />
    );

    const pinButton = findRenderedDOMComponentWithTag(instance, 'button');

    Simulate.click(pinButton);

    addOrRemoveItemInPinboardStub.calledWith({
      type: 'OFFICER',
      id: '123456',
      isPinned: true,
    });
  });
});
