import React from 'react';

import CallToActionWidget from 'components/common/preview-pane/widgets/call-to-action-widget';
import { unmountComponentSuppressError } from 'utils/test';


describe('CallToActionWidget component', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', () => {
    CallToActionWidget.should.be.renderable();
  });
});
