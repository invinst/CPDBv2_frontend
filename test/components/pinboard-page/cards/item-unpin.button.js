import React from 'react';
import { findDOMNode } from 'react-dom';
import { stub } from 'sinon';
import {
  renderIntoDocument,
  Simulate,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import ItemUnpinButton from 'components/pinboard-page/cards/item-unpin-button';


describe('ItemUnpinButton component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should call onClick when cliked on', function () {
    const onClick = stub();
    instance = renderIntoDocument(
      <ItemUnpinButton onClick={ onClick } />
    );

    Simulate.click(findDOMNode(instance));
    onClick.should.be.calledOnce();
  });
});
