import React from 'react';
import { findDOMNode } from 'react-dom';
import { browserHistory } from 'react-router';
import {
  renderIntoDocument,
  Simulate,
} from 'react-addons-test-utils';
import should from 'should';
import { spy, stub } from 'sinon';

import PinboardButton from 'components/search-page/pinboard/pinboard-button';
import { unmountComponentSuppressError } from 'utils/test';


describe('PinboardButton component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should not display "Your pinboard is empty" when there is no pinned item and emptyText is true', function () {
    instance = renderIntoDocument(
      <PinboardButton
        pinboard={
          {
            itemsCount: 0,
            isPinboardRestored: true,
          }
        }
        emptyText={ true }
      />
    );

    findDOMNode(instance).textContent.should.eql('Your pinboard is empty');
  });

  it('should display "Pinboard (count)" when there are pinned items', function () {
    instance = renderIntoDocument(
      <PinboardButton pinboard={ {
        itemsCount: 2,
        url: '/pinboard/1/title/',
        isPinboardRestored: true,
      } } />
    );

    findDOMNode(instance).textContent.should.eql('Pinboard (2)');
  });

  it('should not render if isPinboardRestored is false', function () {
    instance = renderIntoDocument(
      <PinboardButton pinboard={ { isPinboardRestored: false } } />
    );
    should(findDOMNode(instance)).be.null();
  });

  it('should call onEmptyPinboardButtonClick if we click on the button when pinboard id is null', function () {
    const onEmptyPinboardButtonClick = spy();
    instance = renderIntoDocument(
      <PinboardButton
        onEmptyPinboardButtonClick={ onEmptyPinboardButtonClick }
      />
    );

    Simulate.click(findDOMNode(instance));
    onEmptyPinboardButtonClick.called.should.be.true();
  });

  it('should redirect if we click on the button when pinboard exists', function () {
    const browserHistoryPush = stub(browserHistory, 'push');

    instance = renderIntoDocument(
      <PinboardButton pinboard={ {
        id: '5cd06f2b',
        itemsCount: 2,
        url: '/pinboard/1/title/',
        isPinboardRestored: true,
      } }/>
    );

    Simulate.click(findDOMNode(instance));
    browserHistoryPush.should.be.calledWith('/pinboard/1/title/');
    browserHistoryPush.restore();
  });

  it('should redirect to /pinboard/ if pinboard_id is null and hasPendingChanges when clicking on button', function () {
    const browserHistoryPush = stub(browserHistory, 'push');

    instance = renderIntoDocument(
      <PinboardButton pinboard={ {
        id: null,
        itemsCount: 2,
        url: '/pinboard/1/title/',
        isPinboardRestored: true,
        hasPendingChanges: true,
      } }/>
    );

    Simulate.click(findDOMNode(instance));
    browserHistoryPush.should.be.calledWith('/pinboard/');
    browserHistoryPush.restore();
  });
});
