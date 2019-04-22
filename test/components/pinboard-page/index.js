import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';
import { stub } from 'sinon';
import * as ReactRouter from 'react-router';

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

  it('should replace url on id change', function () {
    const replaceStub = stub(ReactRouter.browserHistory, 'replace');

    instance = renderIntoDocument(<PinboardPage pinboard={ { 'id': '1' } } />);
    reRender(<PinboardPage pinboard={ { 'id': '2' } } />, instance);

    replaceStub.calledWith('/pinboard/2/').should.be.true();
    replaceStub.restore();
  });

  it('should not replace url if id is not changed', function () {
    const replaceStub = stub(ReactRouter.browserHistory, 'replace');

    instance = renderIntoDocument(<PinboardPage pinboard={ { 'id': '1' } } />);
    reRender(<PinboardPage pinboard={ { 'id': '1' } } />, instance);

    replaceStub.called.should.be.false();
    replaceStub.restore();
  });

  it('should render PinnedSection component', function () {
    instance = renderIntoDocument(<PinboardPage pinboard={ {} }/>);

    findRenderedComponentWithType(instance, PinnedSection);
  });

  it('should render SearchBar component', function () {
    instance = renderIntoDocument(<PinboardPage />);

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
