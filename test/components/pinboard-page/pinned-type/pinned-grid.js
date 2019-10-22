import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';
import { stub, spy, useFakeTimers } from 'sinon';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import PinnedGrid from 'components/pinboard-page/pinned-type/pinned-grid';
import CRCard from 'components/pinboard-page/cards/cr-card';
import OfficerCard from 'components/pinboard-page/cards/officer-card';
import TRRCard from 'components/pinboard-page/cards/trr-card';
import * as vendors from 'utils/vendors';
import * as navigation from 'utils/navigation';
import { PINBOARD_ITEM_REMOVE_MODE } from 'utils/constants';


describe('PinnedGrid component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render CR cards', function () {
    const items = [{
      crid: '1000001',
      type: 'CR',
      isPinned: true,
      incidentDate: '2010-01-01',
      category: 'Use Of Force',
      point: { 'lon': 1.0, 'lat': 1.0 },
      isPinStatusChanging: false,
    }, {
      crid: '1000002',
      type: 'CR',
      isPinned: true,
      incidentDate: '2010-01-01',
      category: 'Use Of Force',
      point: { 'lon': 1.0, 'lat': 1.0 },
      isPinStatusChanging: false,
    }];
    const focusItem = spy();

    instance = renderIntoDocument(<PinnedGrid type='CR' items={ items } focusItem={ focusItem }/>);

    const crCards = scryRenderedComponentsWithType(instance, CRCard);
    crCards.should.have.length(2);

    crCards[0].props.item.should.eql(items[0]);
    crCards[0].props.focusItem.should.eql(focusItem);

    crCards[1].props.item.should.eql(items[1]);
    crCards[1].props.focusItem.should.eql(focusItem);
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
      complaintPercentile: 99.3450,
      birthYear: 1975,
      race: 'White',
      gender: 'Male',
      rank: 'Police Officer',
      percentile: {},
    }, {
      id: 2,
      type: 'OFFICER',
      isPinned: true,
      officerId: 2,
      fullName: 'Daryl Mack',
      complaintCount: 0,
      sustainedCount: 0,
      complaintPercentile: 99.3450,
      birthYear: 1975,
      race: 'White',
      gender: 'Male',
      rank: 'Police Officer',
      percentile: {},
    }];
    const focusItem = spy();

    instance = renderIntoDocument(<PinnedGrid type='OFFICER' items={ items } focusItem={ focusItem }/>);

    const officerCards = scryRenderedComponentsWithType(instance, OfficerCard);
    officerCards.should.have.length(2);

    officerCards[0].props.item.should.eql(items[0]);
    officerCards[0].props.focusItem.should.eql(focusItem);

    officerCards[1].props.item.should.eql(items[1]);
    officerCards[1].props.focusItem.should.eql(focusItem);
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

    instance = renderIntoDocument(
      <PinnedGrid
        type='TRR'
        items={ items }
        focusItem={ focusItem }
      />
    );

    const trrCards = scryRenderedComponentsWithType(instance, TRRCard);
    trrCards.should.have.length(2);

    trrCards[0].props.item.should.eql(items[0]);
    trrCards[0].props.focusItem.should.eql(focusItem);

    trrCards[1].props.item.should.eql(items[1]);
    trrCards[1].props.focusItem.should.eql(focusItem);
  });

  it('should maintain the scroll position since second rerender', function () {
    stub(navigation, 'getPageYBottomOffset').returns(700);
    stub(navigation, 'scrollByBottomOffset');

    instance = renderIntoDocument(<PinnedGrid type='TRR' items={ [{ 'id': '1' }] } />);

    const items = [{ 'id': '1' }, { 'id': '2' }];
    instance = reRender(<PinnedGrid type='TRR' items={ items } />, instance);

    navigation.scrollByBottomOffset.should.not.be.called();

    const otherItems = [{ 'id': '1' }, { 'id': '2' }, { 'id': '3' }];
    instance = reRender(<PinnedGrid type='TRR' items={ otherItems } />, instance);

    navigation.scrollByBottomOffset.should.be.calledOnce();
    navigation.scrollByBottomOffset.should.be.calledWith(700);

    navigation.scrollByBottomOffset.resetHistory();
    navigation.getPageYBottomOffset.restore();
    stub(navigation, 'getPageYBottomOffset').returns(400);

    instance = reRender(<PinnedGrid type='TRR' items={ [{ 'id': '2' }] } />, instance);

    navigation.scrollByBottomOffset.should.be.calledOnce();
    navigation.scrollByBottomOffset.should.be.calledWith(400);

    navigation.getPageYBottomOffset.restore();
    navigation.scrollByBottomOffset.restore();
  });

  it('should init Muuri grid', function () {
    const onMuuriStub = stub();
    const MuuriStub = stub(vendors, 'Muuri').callsFake(() => ({ 'on': onMuuriStub }));

    const items = [{ 'id': '1' }, { 'id': '2' }];
    instance = renderIntoDocument(<PinnedGrid type='OFFICER' items={ items } />);

    MuuriStub.should.be.calledWith(instance.grid, {
      itemClass: 'pinned-grid-item',
      dragEnabled: true,
    });
    onMuuriStub.should.be.calledWith('dragEnd', instance.updateOrder);

    MuuriStub.restore();
  });

  it('should update grid when did update', function () {
    const onMuuriStub = stub();
    const addMuuriStub = stub();
    const MuuriStub = stub(vendors, 'Muuri').callsFake(() => ({
      'on': onMuuriStub,
      'add': addMuuriStub,
    }));

    const items = [{ 'id': '1' }, { 'id': '2' }];
    instance = renderIntoDocument(<PinnedGrid type='OFFICER' items={ items } />);

    onMuuriStub.resetHistory();
    addMuuriStub.should.not.be.called();

    const newItems = [{ 'id': '1' }, { 'id': '2' }, { 'id': '3' }];
    instance = reRender(<PinnedGrid type='OFFICER' items={ newItems } />, instance);

    addMuuriStub.should.be.calledOnce();
    addMuuriStub.should.be.calledWith(instance.itemElements['3']);

    MuuriStub.restore();
  });

  it('should remove item from the grid when removeItemInPinboardPage is called', function () {
    const clock = useFakeTimers();
    const muuri = new vendors.Muuri();
    muuri.remove.resetHistory();

    const removeItemInPinboardPage = stub();

    const items = [{ 'id': '1' }, { 'id': '2' }];
    instance = renderIntoDocument(
      <PinnedGrid
        type='OFFICER'
        items={ items }
        removeItemInPinboardPage={ removeItemInPinboardPage }
      />
    );

    instance.removeItemInPinboardPage({ 'id': '1' });

    muuri.remove.should.be.calledWith(instance.itemElements['1']);
    removeItemInPinboardPage.should.not.be.called();

    clock.tick(250);

    removeItemInPinboardPage.should.be.calledWith({ 'id': '1' });

    muuri.remove.resetHistory();
    clock.restore();
  });

  it('should not remove item from the grid in API_ONLY mode', function () {
    const clock = useFakeTimers();
    const muuri = new vendors.Muuri();
    muuri.remove.resetHistory();

    const removeItemInPinboardPage = stub();

    const items = [{ 'id': '1' }, { 'id': '2' }];
    instance = renderIntoDocument(
      <PinnedGrid
        type='OFFICER'
        items={ items }
        removeItemInPinboardPage={ removeItemInPinboardPage }
      />
    );

    instance.removeItemInPinboardPage({
      id: '1',
      mode: PINBOARD_ITEM_REMOVE_MODE.API_ONLY,
    });

    muuri.remove.calledWith(instance.itemElements['1']).should.be.false();
    removeItemInPinboardPage.should.not.be.called();

    clock.tick(250);

    removeItemInPinboardPage.should.be.calledWith({
      id: '1',
      mode: PINBOARD_ITEM_REMOVE_MODE.API_ONLY,
    });

    muuri.remove.resetHistory();
    clock.restore();
  });

  it('should invoke orderPinboard with type OFFICER when dragEnd', function () {
    const muuri = new vendors.Muuri();
    muuri.on.resetHistory();

    const removeItemInPinboardPage = stub();
    const orderPinboard = stub();

    const items = [{ 'id': 1 }, { 'id': 2 }];
    instance = renderIntoDocument(
      <PinnedGrid
        type='OFFICER'
        items={ items }
        removeItemInPinboardPage={ removeItemInPinboardPage }
        orderPinboard={ orderPinboard }
      />
    );

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
    instance = renderIntoDocument(
      <PinnedGrid
        type='OFFICER'
        items={ items }
        removeItemInPinboardPage={ removeItemInPinboardPage }
        orderPinboard={ orderPinboard }
      />
    );

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
    instance = renderIntoDocument(
      <PinnedGrid
        type='CR'
        items={ items }
        removeItemInPinboardPage={ removeItemInPinboardPage }
        orderPinboard={ orderPinboard }
      />
    );
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
    instance = renderIntoDocument(
      <PinnedGrid
        type='TRR'
        items={ items }
        removeItemInPinboardPage={ removeItemInPinboardPage }
        orderPinboard={ orderPinboard }
      />
    );
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
    instance = renderIntoDocument(
      <PinnedGrid
        type='TRR'
        items={ items }
      />
    );
    unmountComponentSuppressError(instance);

    muuri.destroy.should.be.calledOnce();
  });
});
