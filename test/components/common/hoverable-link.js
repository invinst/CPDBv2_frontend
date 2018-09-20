import React from 'react';
import { stub } from 'sinon';

import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
  findRenderedComponentWithType,
  Simulate, findRenderedDOMComponentWithClass,
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

  it('should trigger stopPropagation event when click', function () {
    const dummyEvent = {
      stopPropagation: stub()
    };
    instance = renderIntoDocument(<HoverableLink href='http://cpdb.lvh.me/' style={ style } />);
    const link = findRenderedDOMComponentWithClass(instance, 'link--transition');
    Simulate.click(link, dummyEvent);
    dummyEvent.stopPropagation.should.be.called();
  });
});
