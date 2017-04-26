import React from 'react';

import { unmountComponentSuppressError } from 'utils/test';
import EventTextSVG from 'components/cr-page/timeline/event-text-svg';


describe('EventTextSVG component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    EventTextSVG.should.be.renderable({ children: 'sample text', y: '10' });
  });
});
