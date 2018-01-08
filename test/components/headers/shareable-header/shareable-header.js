import React from 'react';
import ClipboardButton from 'react-clipboard.js/dist/react-clipboard';
import ShareableHeader from 'components/headers/shareable-header';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Breadcrumbs from 'redux-breadcrumb-trail';

import { unmountComponentSuppressError } from 'utils/test/index';
import { stub } from 'sinon';
import * as domUtils from 'utils/dom';

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
        <ShareableHeaderContainer />
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
    scryRenderedDOMComponentsWithClass(element, 'test--shareable-header--share-menu').should.have.length(0);
    const shareLink = findRenderedDOMComponentWithClass(element, 'test--shareable-header--share-link');
    Simulate.click(shareLink);
    findRenderedDOMComponentWithClass(element, 'test--shareable-header--share-menu');
    Simulate.click(shareLink);
    scryRenderedDOMComponentsWithClass(element, 'test--shareable-header--share-menu').should.have.length(0);
  });

  it('should render the breadCrumbs', function () {
    findRenderedComponentWithType(element, Breadcrumbs);
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

  describe('handleScroll', function () {
    beforeEach(function () {
      stub(domUtils, 'calculatePosition');
    });

    afterEach(function () {
      domUtils.calculatePosition.restore();
    });

    it('should remain in top position', function () {
      domUtils.calculatePosition.returns('top');
      element.handleScroll();
      element.state.position.should.eql('top');
    });

    it('should transition to middle position', function () {
      domUtils.calculatePosition.returns('middle');
      element.handleScroll();
      element.state.position.should.eql('middle');
    });

    it('should transition to bottom position', function () {
      domUtils.calculatePosition.returns('bottom');
      element.handleScroll();
      element.state.position.should.eql('bottom');
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
        <ShareableHeaderContainer />
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

describe('ShareableHeader global scroll listener', function () {
  let element;
  let instance;
  const mockStore = MockStore();
  const store = mockStore({
    breadcrumb: {
      breadcrumbs: []
    }
  });

  beforeEach(function () {
    stub(window, 'addEventListener');
    stub(window, 'removeEventListener');
    instance = renderIntoDocument(
      <Provider store={ store }>
        <ShareableHeaderContainer />
      </Provider>
    );
    element = findRenderedComponentWithType(instance, ShareableHeader);
  });

  afterEach(function () {
    window.addEventListener.restore();
    window.removeEventListener.restore();
    unmountComponentSuppressError(instance);
  });

  it('should assign global scroll handler to close share menu', function () {
    window.addEventListener.calledWith('scroll', element.handleScroll).should.be.true();
  });

  it('should destroy global click handler on unmount', function () {
    window.removeEventListener.called.should.be.false();
    unmountComponentSuppressError(instance);
    window.removeEventListener.calledWith('scroll', element.handleScroll).should.be.true();
  });
});



