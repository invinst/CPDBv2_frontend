import React from 'react';
import { stub } from 'sinon';
import ClipboardButton from 'react-clipboard.js';
import {
  findRenderedComponentWithType, renderIntoDocument,
  scryRenderedComponentsWithType, scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';
import config from 'config';

import { unmountComponentSuppressError } from 'utils/test';
import ShareMenu from 'components/headers/shareable-header/share-menu';


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
    const link = scryRenderedDOMComponentsWithClass(element, 'share-button-link-item')[0];
    link.textContent.should.eql('Twitter');
    const href = `https://twitter.com/intent/tweet?url=${this.encodedLink}&via=${config.twitterBotName}`;
    link.getAttribute('href').should.eql(href);

    // should close menu on click
    Simulate.click(link);
    scryRenderedComponentsWithType(element, 'share-button-item').should.have.length(0);
  });

  it('should render facebook share link', function () {
    const link = scryRenderedDOMComponentsWithClass(element, 'share-button-link-item')[1];
    link.textContent.should.eql('Facebook');
    link.getAttribute('href').should.eql('https://www.facebook.com/sharer/sharer.php?u=' + this.encodedLink);

    // should close menu on click
    Simulate.click(link);
    scryRenderedComponentsWithType(element, 'share-button-item').should.have.length(0);
  });
});
