import React from 'react';
import { mount } from 'enzyme';
import { spy, stub, useFakeTimers } from 'sinon';

import PinnedGrid from 'components/pinboard-page/pinned-type/pinned-grid';
import CRCard from 'components/pinboard-page/cards/cr-card';
import OfficerCard from 'components/pinboard-page/cards/officer-card';
import TRRCard from 'components/pinboard-page/cards/trr-card';
import * as vendors from 'utils/vendors';
import * as navigation from 'utils/navigation';


describe('PinnedGrid component', function () {
  it('should render CR cards', function () {
    const items = [{
      id: '1000001',
      type: 'CR',
      isPinned: true,
      incidentDate: '2010-01-01',
      category: 'Use Of Force',
      point: { 'lon': 1.0, 'lat': 1.0 },
      isPinStatusChanging: false,
    }, {
      id: '1000002',
      type: 'CR',
      isPinned: true,
      incidentDate: '2010-01-01',
      category: 'Use Of Force',
      point: { 'lon': 1.0, 'lat': 1.0 },
      isPinStatusChanging: false,
    }];
    const focusItem = spy();

    const wrapper = mount(
      <PinnedGrid type='CR' items={ items } focusItem={ focusItem }/>
    );

    const crCards = wrapper.find(CRCard);
    crCards.should.have.length(2);

    crCards.at(0).prop('item').should.eql(items[0]);
    crCards.at(0).prop('focusItem').should.eql(focusItem);

    crCards.at(1).prop('item').should.eql(items[1]);
    crCards.at(1).prop('focusItem').should.eql(focusItem);
  });

  it('should render OFFICER cards', function () {
    const items = [{
      id: 1,
      type: 'OFFICER',
      isPinned: true,
      officerId: 1,
      fullName: 'Daryl Mack',
      complaintCount: 0,
      sustainedCount: 0,
      allegationPercentile: 99.3450,
      birthYear: 1975,
      race: 'White',
      gender: 'Male',
      rank: 'Police Officer',
    }, {
      id: 2,
      type: 'OFFICER',
      isPinned: true,
      officerId: 2,
      fullName: 'Daryl Mack',
      complaintCount: 0,
      sustainedCount: 0,
      allegationPercentile: 99.3450,
      birthYear: 1975,
      race: 'White',
      gender: 'Male',
      rank: 'Police Officer',
    }];
    const focusItem = spy();

    const wrapper = mount(
      <PinnedGrid type='OFFICER' items={ items } focusItem={ focusItem }/>
    );

    const officerCards = wrapper.find(OfficerCard);
    officerCards.should.have.length(2);

    officerCards.at(0).prop('item').should.eql(items[0]);
    officerCards.at(0).prop('focusItem').should.eql(focusItem);

    officerCards.at(1).prop('item').should.eql(items[1]);
    officerCards.at(1).prop('focusItem').should.eql(focusItem);
  });

  it('should render TRR cards', function () {
    const items = [{
      id: 1,
      type: 'TRR',
      isPinned: true,
      category: 'Impact Weapon',
      trrDate: '2012-01-01',
      point: { 'lon': 1.0, 'lat': 1.0 },
      isPinStatusChanging: false,
    }, {
      id: 2,
      type: 'TRR',
      isPinned: true,
      category: 'Impact Weapon',
      trrDate: '2012-01-01',
      point: { 'lon': 1.0, 'lat': 1.0 },
      isPinStatusChanging: false,
    }];
    const focusItem = spy();

    const wrapper = mount(
      <PinnedGrid
        type='TRR'
        items={ items }
        focusItem={ focusItem }
      />
    );

    const trrCards = wrapper.find(TRRCard);
    trrCards.should.have.length(2);

    trrCards.at(0).prop('item').should.eql(items[0]);
    trrCards.at(0).prop('focusItem').should.eql(focusItem);

    trrCards.at(1).prop('item').should.eql(items[1]);
    trrCards.at(1).prop('focusItem').should.eql(focusItem);
  });

  it('should maintain the scroll position since second rerender', function () {
    stub(navigation, 'getPageYBottomOffset').returns(700);
    stub(navigation, 'scrollByBottomOffset');

    const wrapper = mount(
      <PinnedGrid type='TRR' items={ [{ 'id': '1' }] } />
    );

    const items = [{ 'id': '1' }, { 'id': '2' }];
    wrapper.setProps({ type: 'TRR', items });

    navigation.scrollByBottomOffset.should.not.be.called();

    const otherItems = [{ 'id': '1' }, { 'id': '2' }, { 'id': '3' }];
    wrapper.setProps({ type: 'TRR', items: otherItems });

    navigation.scrollByBottomOffset.should.be.calledOnce();
    navigation.scrollByBottomOffset.should.be.calledWith(700);

    navigation.scrollByBottomOffset.resetHistory();
    navigation.getPageYBottomOffset.restore();
    stub(navigation, 'getPageYBottomOffset').returns(400);

    wrapper.setProps({ type: 'TRR', items: [{ 'id': '2' }] });

    navigation.scrollByBottomOffset.should.be.calledOnce();
    navigation.scrollByBottomOffset.should.be.calledWith(400);
  });

  it('should init Muuri grid', function () {
    const onMuuriStub = stub();
    const MuuriStub = stub(vendors, 'Muuri').callsFake(() => ({ 'on': onMuuriStub }));

    const items = [{ 'id': '1' }, { 'id': '2' }];
    const wrapper = mount(
      <PinnedGrid type='OFFICER' items={ items }/>
    );
    const instance = wrapper.instance();

    MuuriStub.should.be.calledWith(instance.grid, {
      itemClass: 'pinned-grid-item',
      dragEnabled: true,
    });
    onMuuriStub.should.be.calledWith('dragEnd', instance.updateOrder);
  });

  it('should update grid when did update', function () {
    const onMuuriStub = stub();
    const addMuuriStub = stub();
    stub(vendors, 'Muuri').callsFake(() => ({
      'on': onMuuriStub,
      'add': addMuuriStub,
    }));

    const items = [{ 'id': '1' }, { 'id': '2' }];
    const wrapper = mount(
      <PinnedGrid type='OFFICER' items={ items }/>
    );

    onMuuriStub.resetHistory();
    addMuuriStub.should.not.be.called();

    const newItems = [{ 'id': '1' }, { 'id': '2' }, { 'id': '3' }];
    wrapper.setProps({ type: 'OFFICER', items: newItems });

    addMuuriStub.should.be.calledOnce();
    addMuuriStub.should.be.calledWith(wrapper.instance().itemElements['3']);
  });

  it('should remove item when removeItemInPinboardPage is called', function () {
    const clock = useFakeTimers();
    const removeItemInPinboardPage = stub();

    const items = [{ 'id': '1' }, { 'id': '2' }];
    const wrapper = mount(
      <PinnedGrid
        type='OFFICER'
        items={ items }
        removeItemInPinboardPage={ removeItemInPinboardPage }
      />
    );

    wrapper.instance().removeItemInPinboardPage({ 'id': '1' });
    removeItemInPinboardPage.should.not.be.called();

    clock.tick(250);
    removeItemInPinboardPage.should.be.calledWith({ 'id': '1' });
  });

  it('should remove item from the grid when completeRemoveItemInPinboardPage is called', function () {
    const muuri = new vendors.Muuri();
    muuri.remove.resetHistory();

    const completeRemoveItemFromPinboard = stub();

    const items = [{ 'id': '1' }, { 'id': '2' }];
    const wrapper = mount(
      <PinnedGrid
        type='OFFICER'
        items={ items }
        completeRemoveItemFromPinboard={ completeRemoveItemFromPinboard }
      />
    );
    const instance = wrapper.instance();

    instance.completeRemoveItemInPinboardPage({ 'id': '1' });

    muuri.remove.should.be.calledWith(instance.itemElements['1']);
    completeRemoveItemFromPinboard.should.be.calledWith({ 'id': '1' });

    muuri.remove.resetHistory();
  });

  it('should invoke orderPinboard with type OFFICER when dragEnd', function () {
    const muuri = new vendors.Muuri();
    muuri.on.resetHistory();

    const removeItemInPinboardPage = stub();
    const orderPinboard = stub();

    const items = [{ 'id': 1 }, { 'id': 2 }];
    const wrapper = mount(
      <PinnedGrid
        type='OFFICER'
        items={ items }
        removeItemInPinboardPage={ removeItemInPinboardPage }
        orderPinboard={ orderPinboard }
      />
    );
    const instance = wrapper.instance();

    muuri.on.should.be.calledWith('dragEnd', instance.updateOrder);
    instance.gridMuuri.getItems = () => [
      { 'getElement': () => ({ 'getAttribute': () => 2 }) },
      { 'getElement': () => ({ 'getAttribute': () => 1 }) },
    ];

    instance.updateOrder();

    orderPinboard.should.be.calledWith({ type: 'OFFICER', 'ids': [2, 1] });
  });

  it('should not invoke orderPinboard when no change', function () {
    const muuri = new vendors.Muuri();
    muuri.on.resetHistory();

    const removeItemInPinboardPage = stub();
    const orderPinboard = stub();

    const items = [{ 'id': 1 }, { 'id': 2 }];
    const wrapper = mount(
      <PinnedGrid
        type='OFFICER'
        items={ items }
        removeItemInPinboardPage={ removeItemInPinboardPage }
        orderPinboard={ orderPinboard }
      />
    );
    const instance = wrapper.instance();

    muuri.on.should.be.calledWith('dragEnd', instance.updateOrder);
    instance.gridMuuri.getItems = () => [
      { 'getElement': () => ({ 'getAttribute': () => 1 }) },
      { 'getElement': () => ({ 'getAttribute': () => 2 }) },
    ];

    instance.updateOrder();
    orderPinboard.should.not.be.called();
  });

  it('should invoke orderPinboard with type CR when dragEnd', function () {
    const muuri = new vendors.Muuri();

    const removeItemInPinboardPage = stub();
    const orderPinboard = stub();

    const items = [{ 'id': '1' }, { 'id': '2' }];
    const wrapper = mount(
      <PinnedGrid
        type='CR'
        items={ items }
        removeItemInPinboardPage={ removeItemInPinboardPage }
        orderPinboard={ orderPinboard }
      />
    );
    const instance = wrapper.instance();

    instance.gridMuuri.getItems = () => [
      { 'getElement': () => ({ 'getAttribute': () => '2' }) },
      { 'getElement': () => ({ 'getAttribute': () => '1' }) },
    ];

    muuri.on.should.be.calledWith('dragEnd', instance.updateOrder);
    instance.updateOrder();

    orderPinboard.should.be.calledWith({ type: 'CR', 'ids': ['2', '1'] });
  });

  it('should invoke orderPinboard with type TRR when dragEnd', function () {
    const muuri = new vendors.Muuri();

    const removeItemInPinboardPage = stub();
    const orderPinboard = stub();

    const items = [{ 'id': 1 }, { 'id': 2 }];
    const wrapper = mount(
      <PinnedGrid
        type='TRR'
        items={ items }
        removeItemInPinboardPage={ removeItemInPinboardPage }
        orderPinboard={ orderPinboard }
      />
    );
    const instance = wrapper.instance();

    instance.gridMuuri.getItems = () => [
      { 'getElement': () => ({ 'getAttribute': () => 2 }) },
      { 'getElement': () => ({ 'getAttribute': () => 1 }) },
    ];

    muuri.on.should.be.calledWith('dragEnd', instance.updateOrder);
    instance.updateOrder();

    orderPinboard.should.be.calledWith({ type: 'TRR', 'ids': [2, 1] });
  });

  it('should destroy muuri grid on componentWillUnmount', function () {
    const muuri = new vendors.Muuri();
    muuri.destroy.resetHistory();

    const items = [{ 'id': 1 }, { 'id': 2 }];
    const wrapper = mount(
      <PinnedGrid
        type='TRR'
        items={ items }
      />
    );
    wrapper.unmount();

    muuri.destroy.should.be.calledOnce();
  });
});
