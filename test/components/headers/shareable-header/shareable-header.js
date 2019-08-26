import React from 'react';
import { Provider } from 'react-redux';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import Breadcrumbs from 'redux-breadcrumb-trail';
import { unmountComponentSuppressError } from 'utils/test';
import { stub } from 'sinon';
import * as domUtils from 'utils/dom';

import ShareableHeader from 'components/headers/shareable-header';
import HeaderButton from 'components/headers/shareable-header/header-button';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import LinkHeaderButton from 'components/headers/shareable-header/link-header-button';
import * as constants from 'utils/constants';
import { SHAREABLE_HEADER_BUTTON_TYPE } from 'utils/constants';


describe('ShareableHeader component', function () {
  let element;
  let instance;
  const mockStore = MockStore();
  const store = mockStore({
    breadcrumb: {
      breadcrumbs: [],
    },
  });

  class CustomMenu extends React.Component {
    render() {
      return <div/>;
    }
  }

  beforeEach (function () {
    this.stubOnOpen = stub();
    this.stubOnClose = stub();
    instance = renderIntoDocument(
      <Provider store={ store }>
        <ShareableHeaderContainer
          buttonType={ SHAREABLE_HEADER_BUTTON_TYPE.MENU }
          Menu={ CustomMenu }
          onOpen={ this.stubOnOpen }
          onClose={ this.stubOnClose }
        />
      </Provider>
    );
    element = findRenderedComponentWithType(instance, ShareableHeader);
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render HeaderButton, breadCrumbs and other contents', function () {
    const headerButton = findRenderedComponentWithType(element, HeaderButton);
    headerButton.props.Menu.should.eql(CustomMenu);
    headerButton.props.onOpen.should.eql(this.stubOnOpen);
    headerButton.props.onClose.should.eql(this.stubOnClose);

    const breadcrumbs = findRenderedComponentWithType(element, Breadcrumbs);
    breadcrumbs.props.className.should.eql('breadcrumbs');

    findRenderedDOMComponentWithClass(element, 'shareable-header-header-placeholder');
    findRenderedDOMComponentWithClass(element, 'shareable-header-nav-bar');
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

describe('ShareableHeader component with button components', function () {
  let instance;
  const mockStore = MockStore();
  const store = mockStore({
    breadcrumb: {
      breadcrumbs: [],
    },
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render LinkHeaderButton component if buttonType is LINK', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <ShareableHeaderContainer buttonType={ constants.SHAREABLE_HEADER_BUTTON_TYPE.LINK }/>
      </Provider>
    );
    findRenderedComponentWithType(instance, LinkHeaderButton).should.be.ok();
  });

  it('should render HeaderButton component if buttonType is MENU', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <ShareableHeaderContainer buttonType={ constants.SHAREABLE_HEADER_BUTTON_TYPE.MENU }/>
      </Provider>
    );
    findRenderedComponentWithType(instance, HeaderButton).should.be.ok();
  });

  it('should not render button if buttonType is NONE', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <ShareableHeaderContainer buttonType={ constants.SHAREABLE_HEADER_BUTTON_TYPE.NONE }/>
      </Provider>
    );

    scryRenderedComponentsWithType(instance, LinkHeaderButton).length.should.equal(0);
    scryRenderedComponentsWithType(instance, HeaderButton).length.should.equal(0);
  });
});

describe('ShareableHeader global click listener', function () {
  let element;
  let instance;
  const mockStore = MockStore();
  const store = mockStore({
    breadcrumb: {
      breadcrumbs: [],
    },
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
      breadcrumbs: [],
    },
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

