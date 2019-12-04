import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';
import { Link } from 'react-router';
import { findDOMNode } from 'react-dom';

import OutboundLink from 'components/common/outbound-link';
import WrapperLink from 'components/common/preview-pane/widgets/wrapper-link';
import { unmountComponentSuppressError } from 'utils/test';


describe('WrapperLink component', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should contain a Link component when it has `to` property', () => {
    instance = renderIntoDocument(
      <WrapperLink to='officer/1/'/>
    );
    findRenderedComponentWithType(instance, Link).props.to.should.eql('officer/1/');
  });

  it('should contain a OutboundLink component when it has `to` property', () => {
    instance = renderIntoDocument(
      <WrapperLink url='something.co'/>
    );
    findRenderedComponentWithType(instance, OutboundLink).props.href.should.eql('something.co');
  });

  it('should render children without any wrapper if there is no url or to', function () {
    instance = renderIntoDocument(
      <WrapperLink>
        <div className='test--child-element'/>
      </WrapperLink>
    );
    scryRenderedComponentsWithType(instance, OutboundLink).should.have.length(0);
    scryRenderedComponentsWithType(instance, Link).should.have.length(0);

    findDOMNode(instance).getAttribute('class').should.equal('test--child-element');
  });
});
