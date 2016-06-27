import React from 'react';

import BottomSheetHeader from 'components/landing-page/bottom-sheet/bottom-sheet-header';
import { unmountComponentSuppressError } from 'utils/test';


describe('BottomSheetHeader component', function () {
  let element;

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should render', function () {
    BottomSheetHeader.should.be.renderable();
  });

  it('should trigger onDismissClick when click on dismiss button', function () {
    BottomSheetHeader.should.triggerCallbackWhenClick('onDismissClick', 'bottom-sheet__back-btn');
  });
});
