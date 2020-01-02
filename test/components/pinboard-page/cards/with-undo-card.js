import React from 'react';
import { mount } from 'enzyme';
import { spy, useFakeTimers } from 'sinon';

import * as constants from 'utils/constants';
import OfficerCard, { OfficerCardWithUndo } from 'components/pinboard-page/cards/officer-card';
import RelevantCoaccusalCard, { RelevantCoaccusalCardWithUndo }
  from 'components/pinboard-page/relevant/relevant-coaccusals/relevant-coaccusal-card';
import ItemUnpinButton from 'components/pinboard-page/cards/item-unpin-button';
import PlusButton from 'components/pinboard-page/relevant/common/plus-button';


describe('withUndoCard higher-order component', function () {
  const item = {
    type: 'OFFICER',
    isPinned: false,
    id: 123,
    rank: 'Officer as Detective',
    fullName: 'James David',
    complaintCount: 10,
    rawData: {
      'id': 123,
      'rank': 'Officer as Detective',
      'full_name': 'James David',
      'complaint_count': '10',
    },
  };

  it('should render wrapped component', function () {
    const wrapper = mount(
      <OfficerCardWithUndo item={ item } />
    );

    wrapper.find(OfficerCard).exists().should.be.true();
    wrapper.find('.test--undo-card').exists().should.be.false();
  });

  it('should render undo card when user click remove', function () {
    const wrapper = mount(
      <OfficerCardWithUndo item={ item } />
    );

    const unpinButton = wrapper.find(ItemUnpinButton);
    unpinButton.simulate('click');

    wrapper.find('.test--undo-card').exists().should.be.true();
    wrapper.find(OfficerCard).exists().should.be.false();
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
        const wrapper = mount(
          <RelevantCoaccusalCardWithUndo { ...item } addItemInPinboardPage={ addItemInPinboardPage }/>
        );

        const plusButton = wrapper.find(PlusButton);
        plusButton.simulate('click');

        clock.tick(constants.UNDO_CARD_VISIBLE_TIME);

        wrapper.find(RelevantCoaccusalCard).exists().should.be.false();
        wrapper.find('.undo-card-dark').exists().should.be.false();
      });

      it('should trigger to remove item 4s after click on remove button', function () {
        const addItemInPinboardPage = spy();

        const wrapper = mount(
          <RelevantCoaccusalCardWithUndo { ...item } addItemInPinboardPage={ addItemInPinboardPage } />
        );

        const plusButton = wrapper.find(PlusButton);
        plusButton.simulate('click');

        clock.tick(constants.UNDO_CARD_VISIBLE_TIME);

        addItemInPinboardPage.should.be.calledWith({
          id: 123,
          type: 'OFFICER',
          rawData: {
            'id': 123,
            'rank': 'Officer as Detective',
            'full_name': 'James David',
            'complaint_count': '10',
          },
        });
      });

      it('should cancel remove item if click on undo button', function () {
        const addItemInPinboardPage = spy();

        const wrapper = mount(
          <RelevantCoaccusalCardWithUndo { ...item } addItemInPinboardPage={ addItemInPinboardPage } />
        );

        const plusButton = wrapper.find(PlusButton);
        plusButton.simulate('click');

        const undoButton = wrapper.find('.undo-button');
        undoButton.simulate('click');

        clock.tick(constants.UNDO_CARD_VISIBLE_TIME);

        addItemInPinboardPage.should.not.be.called();
      });
    });

    context('isRequestDelay false', function () {
      it('should trigger action right away when user click on unpin button', function () {
        const removeItemInPinboardPage = spy();
        const addItemInPinboardPage = spy();

        const wrapper = mount(
          <OfficerCardWithUndo
            item={ item }
            removeItemInPinboardPage={ removeItemInPinboardPage }
            addItemInPinboardPage={ addItemInPinboardPage }
          />
        );

        const unpinButton = wrapper.find(ItemUnpinButton);
        unpinButton.simulate('click');

        removeItemInPinboardPage.should.be.calledWith({
          type: 'OFFICER',
          id: 123,
        });

        clock.tick(constants.UNDO_CARD_VISIBLE_TIME);
      });

      it('should revert action if user click undo', function () {
        const removeItemInPinboardPage = spy();
        const addItemInPinboardPage = spy();

        const wrapper = mount(
          <OfficerCardWithUndo
            item={ item }
            removeItemInPinboardPage={ removeItemInPinboardPage }
            addItemInPinboardPage={ addItemInPinboardPage }
          />
        );

        const unpinButton = wrapper.find(ItemUnpinButton);
        unpinButton.simulate('click');

        removeItemInPinboardPage.should.be.calledWith({
          type: 'OFFICER',
          id: 123,
        });

        const undoButton = wrapper.find('.undo-button');
        undoButton.simulate('click');

        addItemInPinboardPage.should.be.calledWith({
          type: 'OFFICER',
          id: 123,
          isPinned: false,
        });
      });
    });
  });
});
