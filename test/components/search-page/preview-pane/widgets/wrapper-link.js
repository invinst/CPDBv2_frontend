import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import { Link } from 'react-router';

import OutboundLink from 'components/common/outbound-link';
import WrapperLink from 'components/search-page/preview-pane/widgets/wrapper-link';
import { unmountComponentSuppressError } from 'utils/test';


describe('WrapperLink component', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', () => {
    WrapperLink.should.be.renderable();
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
});
