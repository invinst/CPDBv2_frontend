import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument, findRenderedDOMComponentWithTag
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test/index';
import CallToAction from 'components/search-page/search-terms/preview-pane/call-to-action';


describe('CallToAction component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render link when call_to_action_type is link', function () {
    instance = renderIntoDocument(
      <CallToAction item={ {
        'call_to_action_type': 'link',
        link: 'http://mylink.com/'
      } }/>
    );

    const a = findRenderedDOMComponentWithTag(instance, 'a');
    a.href.should.eql('http://mylink.com/');
  });

  it('should render view all button when call_to_action_type is view_all', function () {
    instance = renderIntoDocument(
      <CallToAction item={ {
        'call_to_action_type': 'view_all',
        name: 'police districts'
      } }/>
    );

    const element = findDOMNode(instance);
    element.textContent.indexOf('View ALL police districts').should.not.eql(-1);
  });

  it('should not render anything if call_to_action_type does not match', function () {
    instance = renderIntoDocument(
      <CallToAction item={ {
        'call_to_action_type': 'abc'
      } }/>
    );
    instance.should.displayNothing();
  });
});
