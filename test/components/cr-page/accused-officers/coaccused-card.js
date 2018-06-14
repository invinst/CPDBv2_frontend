import React from 'react';

import { unmountComponentSuppressError } from 'utils/test';
import CoaccusedCard from 'components/cr-page/accused-officers/coaccused-card';


describe('CoaccusedCard component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    CoaccusedCard.should.be.renderable({ findingOutcomeMix: ['abc'] });
  });
});
