import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import { stub } from 'sinon';
import * as ReactRouter from 'react-router';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import PinboardPage from 'components/pinboard-page';
import PinnedSection from 'components/pinboard-page/pinned-section';


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
    instance = renderIntoDocument(<PinboardPage />);

    findRenderedComponentWithType(instance, PinnedSection).should.be.ok();
  });
});
