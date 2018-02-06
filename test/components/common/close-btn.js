import React from 'react';

import CloseButton from 'components/search-page/search-box/close-btn';
import { unmountComponentSuppressError } from 'utils/test';


describe('CloseButton component', function () {
  let element;

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should be renderable', function () {
    CloseButton.should.be.renderable();
  });

  it('should trigger onClick callback when clicked on', function () {
    CloseButton.should.triggerCallbackWhenClick('onClick');
  });
});
