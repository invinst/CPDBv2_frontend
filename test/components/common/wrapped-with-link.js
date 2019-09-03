import React from 'react';
import { Link } from 'react-router';

import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithTag,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import WrappedWithLink from 'components/common/wrapped-with-link';
import OutboundLink from 'components/common/outbound-link';


describe('WrappedWithLink component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render Link when to is passed', function () {
    instance = renderIntoDocument(
      <WrappedWithLink
        to={ '/some/internal/link' }
        className='internal-link'
      >
        <div className='test--wrapped-with-link-child'/>
      </WrappedWithLink>
    );

    const link = findRenderedComponentWithType(instance, Link);
    link.props.to.should.eql('/some/internal/link');
    link.props.className.should.eql('internal-link');
    scryRenderedDOMComponentsWithClass(instance, 'test--wrapped-with-link-child');
  });

  it('should render OutboundLink when url is passed', function () {
    instance = renderIntoDocument(
      <WrappedWithLink
        url={ '/some/external/link' }
        className='external-link'
      >
        <div className='test--wrapped-with-link-child'/>
      </WrappedWithLink>
    );

    const link = findRenderedComponentWithType(instance, OutboundLink);
    link.props.href.should.eql('/some/external/link');
    link.props.className.should.eql('external-link');
    scryRenderedDOMComponentsWithClass(instance, 'test--wrapped-with-link-child');
  });

  it('should render div when to or url are not passed', function () {
    instance = renderIntoDocument(
      <WrappedWithLink
        className='normal-div'
      >
        <span className='test--wrapped-with-link-child'/>
      </WrappedWithLink>
    );

    const division = findRenderedDOMComponentWithTag(instance, 'div');
    division.getAttribute('class').should.eql('normal-div');
    scryRenderedDOMComponentsWithClass(instance, 'test--wrapped-with-link-child');
  });
});
