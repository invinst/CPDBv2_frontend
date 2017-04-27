import React from 'react';

import { unmountComponentSuppressError } from 'utils/test';
import UnitItem from 'components/officer-page/timeline-page/unit-item';


describe('UnitItem component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    UnitItem.should.be.renderable({ item: { date: 'date', unitName: 'unitName' } });
  });
});
