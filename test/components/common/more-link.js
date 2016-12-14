import React from 'react';
import {
  renderIntoDocument, findRenderedComponentWithType, findRenderedDOMComponentWithTag
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import MoreLink from 'components/common/more-link';
import Link from 'components/common/react-router-link';


describe('MoreLink component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should return a react router link if `to` is valid', function () {
    instance = renderIntoDocument(<MoreLink to='/foo' />);
    findRenderedComponentWithType(instance, Link);
  });

  it('should return <a> if `to` is not provided', function () {
    instance = renderIntoDocument(<MoreLink />);

    findRenderedDOMComponentWithTag(instance, 'a');
  });
});
