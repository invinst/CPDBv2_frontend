import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';
import { stub } from 'sinon';
import * as ReactRouter from 'react-router';
import should from 'should';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import PinboardPage from 'components/pinboard-page';
import PinnedSection from 'components/pinboard-page/pinned-section';
import SearchBar from 'components/pinboard-page/search-bar';
import PinboardPaneSection from 'components/pinboard-page/pinboard-pane-section';


describe('PinboardPage component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render nothing when isInitiallyLoading is true', function () {
    instance = renderIntoDocument(
      <PinboardPage isInitiallyLoading={ true } />
    );

    should(findDOMNode(instance)).be.null();
  });

  it('should replace url when shouldRedirect is True after updating', function () {
    const replaceStub = stub(ReactRouter.browserHistory, 'replace');

    instance = renderIntoDocument(
      <PinboardPage pinboard={ { } } shouldRedirect={ true } />
    );
    reRender(
      <PinboardPage pinboard={ { url: '/pinboard/5cd06f2b/' } } shouldRedirect={ true } />,
      instance,
    );

    replaceStub.calledWith('/pinboard/5cd06f2b/').should.be.true();
    replaceStub.restore();
  });

  it('should not replace url when pinboard url is empty', function () {
    const replaceStub = stub(ReactRouter.browserHistory, 'replace');

    instance = renderIntoDocument(<PinboardPage
      pinboard={ { url: '/pinboard/5cd06f2b/' } } shouldRedirect={ true } />);
    reRender(
      <PinboardPage pinboard={ { url: '' } } shouldRedirect={ true } />,
      instance
    );

    replaceStub.called.should.be.false();
    replaceStub.restore();
  });

  it('should render PinnedSection component', function () {
    instance = renderIntoDocument(<PinboardPage pinboard={ {} }/>);

    findRenderedComponentWithType(instance, PinnedSection);
  });

  it('should render SearchBar component', function () {
    instance = renderIntoDocument(<PinboardPage pinboard={ {} }/>);

    findRenderedComponentWithType(instance, SearchBar);
  });

  it('should render pinboard page correctly', function () {
    const pinboard = {
      title: 'This is pinboard title',
      description: 'This is pinboard description'
    };

    instance = renderIntoDocument(<PinboardPage pinboard={ pinboard } />);

    findRenderedComponentWithType(instance, PinboardPaneSection);
    findRenderedDOMComponentWithClass(instance, 'pinboard-title').textContent.should.eql(
      'This is pinboard title'
    );
    findRenderedDOMComponentWithClass(instance, 'pinboard-description').textContent.should.eql(
      'This is pinboard description'
    );
  });
});
