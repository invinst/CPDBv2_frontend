import React from 'react';
import { browserHistory } from 'react-router';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  Simulate,
} from 'react-addons-test-utils';
import { Promise } from 'es6-promise';
import { spy, stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import PinboardItem from 'components/pinboard-page/pinboards/pinboard-item';


describe('PinboardItem component', function () {
  let instance;

  const pinboard = {
    id: '1',
    title: 'Pinboard Title',
    createdAt: 'Sep 12, 2019',
    url: '/pinboard/1/pinboard-title/',
  };

  beforeEach(function () {
    this.browserHistoryPush = stub(browserHistory, 'push');
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
    this.browserHistoryPush.restore();
  });

  it('should render correctly', function () {
    instance = renderIntoDocument(
      <PinboardItem pinboard={ pinboard } />
    );

    findRenderedDOMComponentWithClass(instance, 'pinboard-title').textContent.should.eql('Pinboard Title');
    findRenderedDOMComponentWithClass(instance, 'pinboard-created-at').textContent.should.eql('Created Sep 12, 2019');
  });

  it('should render duplicate-pinboard-btn', function (done) {
    const duplicatePinboardStub = stub().usingPromise(Promise).resolves({
      payload: {
        id: '5cd06f2b',
        title: 'Pinboard title',
      },
    });
    const handleCloseSpy = spy();
    instance = renderIntoDocument(
      <PinboardItem
        isShown={ true }
        pinboard={
          {
            id: '1',
            title: 'Pinboard Title',
            createdAt: 'Sep 12, 2019',
            url: '/pinboard/1/pinboard-title/',
          }
        }
        duplicatePinboard={ duplicatePinboardStub }
        handleClose={ handleCloseSpy }
      />
    );

    const duplicatePinboardBtn = findRenderedDOMComponentWithClass(instance, 'duplicate-pinboard-btn');
    Simulate.click(duplicatePinboardBtn);
    duplicatePinboardStub.should.be.called();

    setTimeout(() => {
      handleCloseSpy.should.be.called();
      this.browserHistoryPush.should.be.calledWith('/pinboard/5cd06f2b/pinboard-title/');
      done();
    }, 50);
  });

  it('should show pinboard detail page when clicking on pinboard item', function () {
    const handleCloseSpy = spy();
    instance = renderIntoDocument(
      <PinboardItem
        pinboard={
          {
            id: '1',
            title: 'Pinboard Title',
            createdAt: 'Sep 12, 2019',
            url: '/pinboard/1/pinboard-title/',
          }
        }
        handleClose={ handleCloseSpy }
      />
    );

    const pinboardItem = findRenderedDOMComponentWithClass(instance, 'pinboard-item');
    Simulate.click(pinboardItem);
    handleCloseSpy.should.be.called();

    this.browserHistoryPush.calledWith('/pinboard/1/pinboard-title/').should.be.true();
  });
});
