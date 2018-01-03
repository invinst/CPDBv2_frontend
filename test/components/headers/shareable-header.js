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
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { unmountComponentSuppressError } from 'utils/test';
import { stub } from 'sinon';

describe('ShareableHeader component', function () {
  let element;
  let instance;
  const mockStore = MockStore();
  const store = mockStore({
    breadcrumb: {
      breadcrumbs: []
    }
  });

  beforeEach (function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <ShareableHeader />
      </Provider>
    );
    element = findRenderedComponentWithType(instance, ShareableHeader);
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should close "share" menu by default', function () {
    element.state.shareMenuIsOpen.should.be.false();
  });

  it('should render Share link', function () {
    findRenderedDOMComponentWithClass(element, 'test--shareable-header--share-link');
  });

  it('should toggle menu when user clicks "Share"', function () {
    scryRenderedComponentsWithType(element, 'test--shareable-header--share-menu').should.have.length(0);
    const shareLink = findRenderedDOMComponentWithClass(element, 'test--shareable-header--share-link');
    Simulate.click(shareLink);
    findRenderedDOMComponentWithClass(element, 'test--shareable-header--share-menu');
    Simulate.click(shareLink);
    scryRenderedComponentsWithType(element, 'test--shareable-header--share-menu').should.have.length(0);
  });

  describe('share menu', function () {
    beforeEach(function () {
      this.shareLink = findRenderedDOMComponentWithClass(element, 'test--shareable-header--share-link');
      Simulate.click(this.shareLink);
      this.encodedLink = encodeURIComponent(window.location.href);
    });

    it('should render copy link', function () {
      const copyLink = findRenderedComponentWithType(element, ClipboardButton);
      copyLink.props.children.should.eql('Copy Link');
      copyLink.props.onClick.should.equal(element.closeShareMenu);
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
});

describe('ShareableHeader global click listener', function () {
  let element;
  let instance;
  const mockStore = MockStore();
  const store = mockStore({
    breadcrumb: {
      breadcrumbs: []
    }
  });

  beforeEach(function () {
    stub(document.body, 'addEventListener');
    stub(document.body, 'removeEventListener');
    instance = renderIntoDocument(
      <Provider store={ store }>
        <ShareableHeader />
      </Provider>
    );
    element = findRenderedComponentWithType(instance, ShareableHeader);
  });

  afterEach(function () {
    document.body.addEventListener.restore();
    document.body.removeEventListener.restore();
    unmountComponentSuppressError(instance);
  });

  it('should assign global click handler to close share menu', function () {
    document.body.addEventListener.calledWith('click', element.closeShareMenu).should.be.true();
  });

  it('should destroy global click handler on unmount', function () {
    document.body.removeEventListener.called.should.be.false();
    unmountComponentSuppressError(element);
    document.body.removeEventListener.calledWith('click', element.closeShareMenu).should.be.true();
  });
});

