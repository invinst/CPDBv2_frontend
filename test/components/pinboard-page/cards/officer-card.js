import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

import OfficerCard, { OfficerCardWithUndo } from 'components/pinboard-page/cards/officer-card';
import ItemUnpinButton from 'components/pinboard-page/cards/item-unpin-button';
import StaticRadarChart from 'components/common/radar-chart';
import ShortPress from 'components/common/short-press';


describe('OfficerCard component', function () {
  it('should render correctly', function () {
    const item = {
      rank: 'Officer as Detective',
      fullName: 'James David',
      complaintCount: '10',
    };
    const wrapper = shallow(<OfficerCard item={ item } />);

    wrapper.find(ItemUnpinButton).exists().should.be.true();
    wrapper.find(StaticRadarChart).exists().should.be.true();

    wrapper.find('.officer-rank').text().should.equal('Officer as Detective');
    wrapper.find('.officer-name').text().should.equal('James David');
    wrapper.find('.officer-complaints-count').text().should.equal('10 complaints');
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
    const wrapper = shallow(
      <OfficerCard
        item={ item }
        removeItemInPinboardPage={ removeItemInPinboardPage }
      />
    );
    const unpinButton = wrapper.find(ItemUnpinButton);

    unpinButton.simulate('click');

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

    const wrapper = shallow(
      <OfficerCard
        item={ item }
      />
    );

    wrapper.find(ShortPress).exists().should.be.true();
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

    const wrapper = mount(
      <OfficerCard
        item={ item }
        focusItem={ focusItem }
      />
    );

    const card = wrapper.find('.officer-card-body');
    card.simulate('mouseDown', { screenX: 0, screenY: 0 });
    card.simulate('mouseUp', { screenX: 0, screenY: 0 });

    focusItem.should.be.calledWith({ type: 'OFFICER', 'id': 123 });
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
    const wrapper = mount(
      <OfficerCard
        item={ item }
        removeItemInPinboardPage={ removeItemInPinboardPage }
      />
    );

    item.isPinStatusChanging = true;
    wrapper.setProps({
      item: item,
      removeItemInPinboardPage: removeItemInPinboardPage,
    });

    removeItemInPinboardPage.should.be.calledWith({
      id: 123,
      type: 'OFFICER',
    });
  });
});

describe('OfficerCardWithUndo component', function () {
  it('should render remove text correctly', function () {
    const item = {
      type: 'OFFICER',
      isPinned: false,
      id: 123,
      rank: 'Officer as Detective',
      fullName: 'James David',
      complaintCount: '10',
    };
    const wrapper = shallow(<OfficerCardWithUndo item={ item } />);
    const unpinButton = wrapper.dive().find(ItemUnpinButton).dive();

    unpinButton.simulate('click');
    wrapper.update();

    wrapper.find('.text').text().should.equal('James David removed.');
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
    const wrapper = shallow(
      <OfficerCardWithUndo
        item={ item }
        removeItemInPinboardPage={ removeItemInPinboardPage }
      />
    );

    const unpinButton = wrapper.dive().find(ItemUnpinButton).dive();
    unpinButton.simulate('click');

    removeItemInPinboardPage.should.be.calledWith({
      id: 123,
      type: 'OFFICER',
    });
  });
});
