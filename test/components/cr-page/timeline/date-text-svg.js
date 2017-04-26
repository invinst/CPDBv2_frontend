import React from 'react';

import { unmountComponentSuppressError } from 'utils/test';
import DateTextSVG from 'components/cr-page/timeline/date-text-svg';


describe('DateTextSVG component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    DateTextSVG.should.be.renderable({ children: 'sample text', y: '10' });
  });
});
