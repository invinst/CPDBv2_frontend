import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  Simulate,
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { spy } from 'sinon';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import OfficerCard, { OfficerCardWithUndo } from 'components/pinboard-page/cards/officer-card';
import ItemUnpinButton from 'components/pinboard-page/cards/item-unpin-button';
import StaticRadarChart from 'components/common/radar-chart';
import ShortPress from 'components/common/short-press';
import { PINBOARD_ITEM_REMOVE_MODE } from 'utils/constants';


describe('OfficerCard component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    const item = {
      rank: 'Officer as Detective',
      fullName: 'James David',
      complaintCount: '10',
    };
    instance = renderIntoDocument(<OfficerCard item={ item } />);

    findRenderedComponentWithType(instance, ItemUnpinButton);
    findRenderedComponentWithType(instance, StaticRadarChart);

    findRenderedDOMComponentWithClass(instance, 'officer-rank').textContent.should.eql('Officer as Detective');
    findRenderedDOMComponentWithClass(instance, 'officer-name').textContent.should.eql('James David');
    findRenderedDOMComponentWithClass(instance, 'officer-complaints-count').textContent.should.eql('10 complaints');
  });

  it('should invoke removeItemInPinboardPage when clicking on ItemUnpinButton', function () {
    const removeItemInPinboardPage = spy();

    const item = {
      type: 'OFFICER',
      isPinned: false,
      id: 123,
      rank: 'Officer as Detective',
      fullName: 'James David',
      complaintCount: '10',
    };
    instance = renderIntoDocument(
      <OfficerCard
        item={ item }
        removeItemInPinboardPage={ removeItemInPinboardPage }
      />
    );
    const unpinButton = findRenderedComponentWithType(instance, ItemUnpinButton);

    Simulate.click(findDOMNode(unpinButton));

    removeItemInPinboardPage.should.be.calledOnce();
    removeItemInPinboardPage.should.be.calledWith({
      type: 'OFFICER',
      id: 123,
    });
  });

  it('should be focusable', function () {
    const item = {
      type: 'OFFICER',
      isPinned: false,
      id: 123,
      rank: 'Officer as Detective',
      fullName: 'James David',
      complaintCount: '10',
    };

    instance = renderIntoDocument(
      <OfficerCard
        item={ item }
      />
    );

    findRenderedComponentWithType(instance, ShortPress).should.be.ok();
  });

  it('should handle on focus', function () {
    const item = {
      type: 'OFFICER',
      isPinned: false,
      id: 123,
      rank: 'Officer as Detective',
      fullName: 'James David',
      complaintCount: '10',
    };
    const focusItem = spy();

    instance = renderIntoDocument(
      <OfficerCard
        item={ item }
        focusItem={ focusItem }
      />
    );

    const card = findRenderedDOMComponentWithClass(instance, 'officer-card-body');
    const cardNode = findDOMNode(card);

    Simulate.mouseDown(cardNode, { screenX: 0, screenY: 0 });
    Simulate.mouseUp(cardNode, { screenX: 0, screenY: 0 });

    focusItem.calledWith({ type: 'OFFICER', 'id': 123 }).should.be.true();
  });

  it('should remove item if pin status changed', function () {
    const item = {
      id: 123,
      type: 'OFFICER',
      rank: 'Officer as Detective',
      fullName: 'James David',
      complaintCount: '10',
    };
    const removeItemInPinboardPage = spy();
    instance = renderIntoDocument(
      <OfficerCard
        item={ item }
        removeItemInPinboardPage={ removeItemInPinboardPage }
      />
    );

    item.isPinStatusChanging = true;
    reRender(
      <OfficerCard
        item={ item }
        removeItemInPinboardPage={ removeItemInPinboardPage }
      />,
      instance
    );

    removeItemInPinboardPage.should.be.calledWith({
      id: 123,
      type: 'OFFICER',
    });
  });
});

describe('OfficerCardWithUndo component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render remove text correctly', function () {
    const item = {
      type: 'OFFICER',
      isPinned: false,
      id: 123,
      rank: 'Officer as Detective',
      fullName: 'James David',
      complaintCount: '10',
    };
    instance = renderIntoDocument(<OfficerCardWithUndo item={ item } />);
    const unpinButton = findRenderedComponentWithType(instance, ItemUnpinButton);

    Simulate.click(findDOMNode(unpinButton));

    findRenderedDOMComponentWithClass(instance, 'text').textContent.should.eql('James David removed.');
  });

  it('should call action right away when user click on unpin button', function () {
    const item = {
      id: 123,
      type: 'OFFICER',
      rank: 'Officer as Detective',
      fullName: 'James David',
      complaintCount: '10',
    };
    const removeItemInPinboardPage = spy();
    instance = renderIntoDocument(
      <OfficerCardWithUndo
        item={ item }
        removeItemInPinboardPage={ removeItemInPinboardPage }
      />
    );

    const unpinButton = findRenderedComponentWithType(instance, ItemUnpinButton);
    Simulate.click(findDOMNode(unpinButton));

    removeItemInPinboardPage.should.be.calledWith({
      id: 123,
      type: 'OFFICER',
      mode: PINBOARD_ITEM_REMOVE_MODE.API_ONLY,
    });
  });
});
