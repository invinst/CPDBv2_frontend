import React from 'react';
import { stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import ShareMenu from 'components/headers/shareable-header/share-menu';
import {
  findRenderedComponentWithType, findRenderedDOMComponentWithClass, renderIntoDocument, scryRenderedComponentsWithType,
  Simulate
} from 'react-addons-test-utils';
import ClipboardButton from 'react-clipboard.js';


describe('ShareMenu component', function () {
  let element;

  beforeEach(function () {
    this.stubCloseShareMenu = stub();
    element = renderIntoDocument(<ShareMenu open={ true } closeShareMenu={ this.stubCloseShareMenu }/>);
    this.encodedLink = encodeURIComponent(window.location.href);
  });

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should be renderable', function () {
    ShareMenu.should.be.renderable();
  });

  it('should render copy link', function () {
    const copyLink = findRenderedComponentWithType(element, ClipboardButton);
    copyLink.props.children.should.eql('Copy Link');
    copyLink.props.onClick.should.equal(this.stubCloseShareMenu);
    copyLink.props['data-clipboard-text'].should.eql(window.location.href);
  });

  it('should render tweet link', function () {
    const link = findRenderedDOMComponentWithClass(element, 'test--shareable-header--tweet-link');
    link.textContent.should.containEql('Tweet');
    link.getAttribute('href').should.eql('https://twitter.com/intent/tweet?url=' + this.encodedLink);

    // should close menu on click
    Simulate.click(link);
    scryRenderedComponentsWithType(element, 'test--shareable-header--share-menu').should.have.length(0);
  });

  it('should render facebook share link', function () {
    const link = findRenderedDOMComponentWithClass(element, 'test--shareable-header--facebook-link');
    link.textContent.should.containEql('Share');
    link.getAttribute('href').should.eql('https://www.facebook.com/sharer/sharer.php?u=' + this.encodedLink);

    // should close menu on click
    Simulate.click(link);
    scryRenderedComponentsWithType(element, 'test--shareable-header--share-menu').should.have.length(0);
  });
});
