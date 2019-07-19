import React from 'react';
import { findDOMNode } from 'react-dom';

import { renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';
import { spy, useFakeTimers } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import * as constants from 'utils/constants';
import OfficerCard, { OfficerCardWithUndo } from 'components/pinboard-page/cards/officer-card';
import RelevantCoaccusalCard, { RelevantCoaccusalCardWithUndo }
  from 'components/pinboard-page/relevant/relevant-coaccusals/relevant-coaccusal-card';
import ItemUnpinButton from 'components/pinboard-page/cards/item-unpin-button';
import PlusButton from 'components/pinboard-page/relevant/common/plus-button';


describe('withUndoCard higher-order component', function () {
  let instance;
  const item = {
    type: 'OFFICER',
    isPinned: false,
    id: 123,
    rank: 'Officer as Detective',
    fullName: 'James David',
    complaintCount: '10',
    rawData: {
      'id': 123,
      'rank': 'Officer as Detective',
      'full_name': 'James David',
      'complaint_count': '10',
    }
  };

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render wrapped component', function () {
    instance = renderIntoDocument(
      <OfficerCardWithUndo item={ item } />
    );

    scryRenderedComponentsWithType(instance, OfficerCard).should.have.length(1);
    scryRenderedDOMComponentsWithClass(instance, 'test--undo-card').should.have.length(0);
  });

  it('should render undo card when user click remove', function () {
    instance = renderIntoDocument(
      <OfficerCardWithUndo item={ item } />
    );

    const unpinButton = findRenderedComponentWithType(instance, ItemUnpinButton);
    Simulate.click(findDOMNode(unpinButton));

    scryRenderedDOMComponentsWithClass(instance, 'test--undo-card').should.have.length(1);
    scryRenderedComponentsWithType(instance, OfficerCard).should.have.length(0);
  });

  context('animation', function () {
    let clock;

    beforeEach(function () {
      clock = useFakeTimers();
    });

    afterEach(function () {
      clock.restore();
    });
    context('isRequestDelay', function () {
      it('should render nothing when user click unpin but not undo', function () {
        const addItemInPinboardPage = spy();
        instance = renderIntoDocument(
          <RelevantCoaccusalCardWithUndo { ...item } addItemInPinboardPage={ addItemInPinboardPage }/>
        );

        const plusButton = findRenderedComponentWithType(instance, PlusButton);
        Simulate.click(findDOMNode(plusButton));

        clock.tick(constants.UNDO_CARD_VISIBLE_TIME);

        scryRenderedComponentsWithType(instance, RelevantCoaccusalCard).should.have.length(0);
        scryRenderedDOMComponentsWithClass(instance, 'undo-card-dark').should.have.length(0);
      });

      it('should trigger to remove item 4s after click on remove button', function () {
        const addItemInPinboardPage = spy();

        instance = renderIntoDocument(
          <RelevantCoaccusalCardWithUndo { ...item } addItemInPinboardPage={ addItemInPinboardPage } />
        );

        const plusButton = findRenderedComponentWithType(instance, PlusButton);
        Simulate.click(findDOMNode(plusButton));

        clock.tick(constants.UNDO_CARD_VISIBLE_TIME);

        addItemInPinboardPage.should.be.calledWith({
          id: 123,
          type: 'OFFICER',
          rawData: {
            'id': 123,
            'rank': 'Officer as Detective',
            'full_name': 'James David',
            'complaint_count': '10',
          }
        });
      });

      it('should cancel remove item if click on undo button', function () {
        const addItemInPinboardPage = spy();

        instance = renderIntoDocument(
          <RelevantCoaccusalCardWithUndo { ...item } addItemInPinboardPage={ addItemInPinboardPage } />
        );

        const plusButton = findRenderedComponentWithType(instance, PlusButton);
        Simulate.click(findDOMNode(plusButton));

        const undoButton = findRenderedDOMComponentWithClass(instance, 'undo-button');
        Simulate.click(undoButton);

        clock.tick(constants.UNDO_CARD_VISIBLE_TIME);

        addItemInPinboardPage.should.not.be.called();
      });
    });

    context('isRequestDelay false', function () {
      it('should trigger action right away when user click on unpin button', function () {
        const removeItemInPinboardPage = spy();
        const addItemInPinboardPage = spy();

        instance = renderIntoDocument(
          <OfficerCardWithUndo
            item={ item }
            removeItemInPinboardPage={ removeItemInPinboardPage }
            addItemInPinboardPage={ addItemInPinboardPage }
          />
        );

        const unpinButton = findRenderedComponentWithType(instance, ItemUnpinButton);
        Simulate.click(findDOMNode(unpinButton));

        removeItemInPinboardPage.should.be.calledWith({
          type: 'OFFICER',
          id: 123,
          mode: constants.PINBOARD_ITEM_REMOVE_MODE.API_ONLY,
        });

        clock.tick(constants.UNDO_CARD_VISIBLE_TIME);

        removeItemInPinboardPage.should.be.calledWith({
          type: 'OFFICER',
          id: 123,
          mode: constants.PINBOARD_ITEM_REMOVE_MODE.STATE_ONLY,
        });
      });

      it('should revert action if user click undo', function () {
        const removeItemInPinboardPage = spy();
        const addItemInPinboardPage = spy();

        instance = renderIntoDocument(
          <OfficerCardWithUndo
            item={ item }
            removeItemInPinboardPage={ removeItemInPinboardPage }
            addItemInPinboardPage={ addItemInPinboardPage }
          />
        );

        const unpinButton = findRenderedComponentWithType(instance, ItemUnpinButton);
        Simulate.click(findDOMNode(unpinButton));

        removeItemInPinboardPage.should.be.calledWith({
          type: 'OFFICER',
          id: 123,
          mode: constants.PINBOARD_ITEM_REMOVE_MODE.API_ONLY,
        });

        const undoButton = findRenderedDOMComponentWithClass(instance, 'undo-button');
        Simulate.click(undoButton);

        removeItemInPinboardPage.calledWith({
          type: 'OFFICER',
          id: 123,
          mode: constants.PINBOARD_ITEM_REMOVE_MODE.STATE_ONLY,
        }).should.be.false();

        addItemInPinboardPage.should.be.calledWith({
          type: 'OFFICER',
          id: 123,
          isPinned: false,
        });
      });
    });
  });
});
