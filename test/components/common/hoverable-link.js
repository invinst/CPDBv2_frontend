import React from 'react';

import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
  findRenderedComponentWithType
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import HoverableLink from 'components/common/hoverable-link';
import Link from 'components/common/react-router-link';


describe('HoverableLink component', function () {
  let instance;
  const style = { base: {}, hover: {} };

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render tag a when href is available', function () {
    instance = renderIntoDocument(<HoverableLink href='http://link.com' style={ style }/>);
    findRenderedDOMComponentWithTag(instance, 'a');
  });

  it('should render Link a when href is not available', function () {
    instance = renderIntoDocument(<HoverableLink to='/internal/link/' style={ style }/>);
    findRenderedComponentWithType(instance, Link);
  });
});
