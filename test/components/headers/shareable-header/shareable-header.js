import React from 'react';
import { Provider } from 'react-redux';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import Breadcrumbs from 'redux-breadcrumb-trail';
import { unmountComponentSuppressError } from 'utils/test';
import { stub } from 'sinon';
import * as domUtils from 'utils/dom';

import ShareableHeader from 'components/headers/shareable-header';
import HeaderButton from 'components/headers/shareable-header/header-button';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';


describe('ShareableHeader component', function () {
  let element;
  let instance;
  const mockStore = MockStore();
  const store = mockStore({
    breadcrumb: {
      breadcrumbs: []
    }
  });

  class CustomMenu extends React.Component {
    render() {
      return <div/>;
    }
  }

  beforeEach (function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <ShareableHeaderContainer Menu={ CustomMenu }/>
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

describe('ShareableHeader component no HeaderButton', function () {
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
        <ShareableHeaderContainer hasHeaderButton={ false }/>
      </Provider>
    );
    element = findRenderedComponentWithType(instance, ShareableHeader);
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should not render HeaderButton if hasHeaderButton is False', function () {
    const headerButtons = scryRenderedComponentsWithType(element, HeaderButton);
    headerButtons.length.should.eql(0);
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



