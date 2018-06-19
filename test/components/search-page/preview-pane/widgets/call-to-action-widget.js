import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import { Link } from 'react-router';

import OutboundLink from 'components/common/outbound-link';
import CallToActionWidget from 'components/search-page/preview-pane/widgets/call-to-action-widget';
import { unmountComponentSuppressError } from 'utils/test';


describe('CallToActionWidget component', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', () => {
    CallToActionWidget.should.be.renderable();
  });

  it('should contain a Link component when it has `to` property', () => {
    instance = renderIntoDocument(
      <CallToActionWidget to='officer/1/'/>
    );
    findRenderedComponentWithType(instance, Link).props.to.should.eql('officer/1/');
  });

  it('should contain a Link component when it has `to` property', () => {
    instance = renderIntoDocument(
      <CallToActionWidget url='something.co'/>
    );
    findRenderedComponentWithType(instance, OutboundLink).props.href.should.eql('something.co');
  });
});
