import React from 'react';

import CopyLinkButton from 'components/common/copy-link-btn';
import { unmountComponentSuppressError } from 'utils/test';


describe('CopyLinkButton component', function () {
  let element;

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should be renderable', function () {
    CopyLinkButton.should.be.renderable();
  });
});
