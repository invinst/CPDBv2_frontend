import React from 'react';
import ClipboardButton from 'react-clipboard.js';
import ShareableHeader from 'components/headers/shareable-header';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
  Simulate
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import { Link } from 'react-router';
import { stub } from 'sinon';
import config from 'config';


describe('ShareableHeader component', function () {
  let element;

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should close "share" menu by default', function () {
    element = renderIntoDocument(
      <ShareableHeader backLink='/'/>
    );

    element.state.shareMenuIsOpen.should.be.false();
  });

  it('should render Back to Home and Share link', function () {
    element = renderIntoDocument(
      <ShareableHeader backLink='/search/'/>
    );

    const links = scryRenderedComponentsWithType(element, Link);
    links.filter(link => link.props.children === 'Back to Search').should.have.length(1);

    findRenderedDOMComponentWithClass(element, 'test--shareable-header--share-link');
  });

  it('should toggle menu when user clicks "Share"', function () {
    element = renderIntoDocument(
      <ShareableHeader />
    );
    scryRenderedComponentsWithType(element, 'test--shareable-header--share-menu').should.have.length(0);
    const shareLink = findRenderedDOMComponentWithClass(element, 'test--shareable-header--share-link');
    Simulate.click(shareLink);
    findRenderedDOMComponentWithClass(element, 'test--shareable-header--share-menu');
    Simulate.click(shareLink);
    scryRenderedComponentsWithType(element, 'test--shareable-header--share-menu').should.have.length(0);
  });

  describe('global click listener', function () {
    beforeEach(function () {
      stub(document.body, 'addEventListener');
      stub(document.body, 'removeEventListener');
    });

    afterEach(function () {
      document.body.addEventListener.restore();
      document.body.removeEventListener.restore();
    });

    it('should assign global click handler to close share menu', function () {
      element = renderIntoDocument(
        <ShareableHeader />
      );
      document.body.addEventListener.calledWith('click', element.closeShareMenu).should.be.true();
    });

    it('should destroy global click handler on unmount', function () {
      element = renderIntoDocument(
        <ShareableHeader />
      );

      document.body.removeEventListener.called.should.be.false();
      unmountComponentSuppressError(element);
      document.body.removeEventListener.calledWith('click', element.closeShareMenu).should.be.true();
    });
  });

  describe('share menu', function () {
    beforeEach(function () {
      this.element = renderIntoDocument(
        <ShareableHeader />
      );
      this.shareLink = findRenderedDOMComponentWithClass(this.element, 'test--shareable-header--share-link');
      Simulate.click(this.shareLink);
      this.encodedLink = encodeURIComponent(window.location.href);
    });

    it('should render copy link', function () {
      const copyLink = findRenderedComponentWithType(this.element, ClipboardButton);
      copyLink.props.children.should.eql('Copy Link');
      copyLink.props.onClick.should.equal(this.element.closeShareMenu);
      copyLink.props['data-clipboard-text'].should.eql(window.location.href);
    });

    it('should render tweet link', function () {
      const link = findRenderedDOMComponentWithClass(this.element, 'test--shareable-header--tweet-link');
      link.textContent.should.containEql('Tweet');
      const href = `https://twitter.com/intent/tweet?url=${this.encodedLink}&via=${config.twitterBotName}`;
      link.getAttribute('href').should.eql(href);

      // should close menu on click
      Simulate.click(link);
      scryRenderedComponentsWithType(element, 'test--shareable-header--share-menu').should.have.length(0);
    });

    it('should render facebook share link', function () {
      const link = findRenderedDOMComponentWithClass(this.element, 'test--shareable-header--facebook-link');
      link.textContent.should.containEql('Share');
      link.getAttribute('href').should.eql('https://www.facebook.com/sharer/sharer.php?u=' + this.encodedLink);

      // should close menu on click
      Simulate.click(link);
      scryRenderedComponentsWithType(element, 'test--shareable-header--share-menu').should.have.length(0);
    });
  });
});
