import React from 'react';
import { findDOMNode } from 'react-dom';
import { findRenderedDOMComponentWithClass, renderIntoDocument } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import CallToAction from 'components/search-page/search-terms/preview-pane/call-to-action';


describe('CallToAction component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render link when callToActionType is link', function () {
    instance = renderIntoDocument(
      <CallToAction item={ {
        callToActionType: 'link',
        url: 'http://mylink.com/'
      } } />
    );

    const a = findRenderedDOMComponentWithClass(instance, 'test--call-to-action');
    a.href.should.eql('http://mylink.com/');
  });

  it('should render view all button when callToActionType is view_all', function () {
    instance = renderIntoDocument(
      <CallToAction item={ {
        callToActionType: 'view_all',
        name: 'police districts'
      } } />
    );

    const element = findDOMNode(instance);
    element.textContent.indexOf('View ALL police districts').should.not.eql(-1);
  });

  it('should not render anything if callToActionType does not match', function () {
    instance = renderIntoDocument(
      <CallToAction item={ {
        callToActionType: 'abc'
      } } />
    );
    instance.should.displayNothing();
  });

  it('should render enter button', function () {
    instance = renderIntoDocument(
      <CallToAction item={ {
        callToActionType: 'view_all',
        name: 'police districts'
      } } />
    );

    const enterButton = findRenderedDOMComponentWithClass(instance, 'test--enter-button');
    enterButton.should.be.ok();
  });
});
