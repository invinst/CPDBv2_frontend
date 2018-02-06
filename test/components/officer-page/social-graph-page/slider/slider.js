import React from 'react';
import { Range } from 'rc-slider';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Slider from 'components/officer-page/social-graph-page/slider';


describe('Slider component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should pass in current year to Range component', function () {
    instance = renderIntoDocument(
      <Slider/>
    );
    const rangeElement = findRenderedComponentWithType(instance, Range);
    rangeElement.props.defaultValue.should.eql([2000, 2017]);
  });
});
