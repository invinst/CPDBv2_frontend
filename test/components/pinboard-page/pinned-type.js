import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';
import { stub } from 'sinon';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import PinnedType from 'components/pinboard-page/pinned-type';
import CRCard from 'components/pinboard-page/cards/cr-card';
import OfficerCard from 'components/pinboard-page/cards/officer-card';
import TRRCard from 'components/pinboard-page/cards/trr-card';
import * as vendors from 'utils/vendors';


describe('PinnedType component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render CR cards', function () {
    const items = [{ 'id': '1' }, { 'id': '2' }];
    instance = renderIntoDocument(<PinnedType type='CR' items={ items } />);

    const crCards = scryRenderedComponentsWithType(instance, CRCard);
    crCards.should.have.length(2);
    crCards[0].props.item.id.should.eql('1');
    crCards[1].props.item.id.should.eql('2');
  });

  it('should render OFFICER cards', function () {
    const items = [{ 'id': '1' }, { 'id': '2' }];
    instance = renderIntoDocument(<PinnedType type='OFFICER' items={ items } />);

    const officerCards = scryRenderedComponentsWithType(instance, OfficerCard);
    officerCards.should.have.length(2);
    officerCards[0].props.item.id.should.eql('1');
    officerCards[1].props.item.id.should.eql('2');
  });

  it('should render TRR cards', function () {
    const items = [{ 'id': '1' }, { 'id': '2' }];
    instance = renderIntoDocument(<PinnedType type='TRR' items={ items } />);

    const trrCards = scryRenderedComponentsWithType(instance, TRRCard);
    trrCards.should.have.length(2);
    trrCards[0].props.item.id.should.eql('1');
    trrCards[1].props.item.id.should.eql('2');
  });

  it('should render newly added item with correct props', function () {
    const items = [{ 'id': '1' }, { 'id': '2' }];
    instance = renderIntoDocument(<PinnedType type='TRR' items={ items } />);
    const newItems = [{ 'id': '1' }, { 'id': '2' }, { 'id': '3' }];
    instance = reRender(<PinnedType type='TRR' items={ newItems } />, instance);

    const trrCards = scryRenderedComponentsWithType(instance, TRRCard);
    trrCards.should.have.length(3);
    trrCards[0].props.item.id.should.eql('1');
    trrCards[0].props.isAdded.should.be.false();
    trrCards[1].props.item.id.should.eql('2');
    trrCards[1].props.isAdded.should.be.false();
    trrCards[2].props.item.id.should.eql('3');
    trrCards[2].props.isAdded.should.be.true();
  });

  it('should init Muuri grid', function () {
    const onMuuriStub = stub();
    const MuuriStub = stub(vendors, 'Muuri').callsFake(() => ({ 'on': onMuuriStub }));

    const items = [{ 'id': '1' }, { 'id': '2' }];
    instance = renderIntoDocument(<PinnedType type='OFFICER' items={ items } />);

    MuuriStub.should.be.calledWith(instance.grid, {
      itemClass: 'pinned-grid-item',
      dragEnabled: true,
    });
    onMuuriStub.should.be.calledWith('dragEnd', instance.updateOrder);

    MuuriStub.restore();
  });

  it('should add new item to the grid', function () {
    const muuri = new vendors.Muuri();
    muuri.add.resetHistory();

    const items = [{ 'id': '1' }, { 'id': '2' }];
    instance = renderIntoDocument(<PinnedType type='OFFICER' items={ items } />);

    const newItems = [{ 'id': '1' }, { 'id': '2' }, { 'id': '3' }];
    instance = reRender(<PinnedType type='OFFICER' items={ newItems } />, instance);

    muuri.add.should.calledWith(instance.itemElements['3']);

    muuri.add.resetHistory();
  });

  it('should remove item from the grid when removeItemInPinboardPage is called', function () {
    const muuri = new vendors.Muuri();
    muuri.remove.resetHistory();

    const removeItemInPinboardPage = stub();

    const items = [{ 'id': '1' }, { 'id': '2' }];
    instance = renderIntoDocument(
      <PinnedType
        type='OFFICER'
        items={ items }
        removeItemInPinboardPage={ removeItemInPinboardPage }
      />
    );

    instance.removeItemInPinboardPage({ 'id': '1' });

    muuri.remove.should.be.calledWith(instance.itemElements['1']);
    removeItemInPinboardPage.should.be.calledWith({ 'id': '1' });

    muuri.remove.resetHistory();
  });

  it('should invoke orderPinboard with type OFFICER when dragEnd', function () {
    const muuri = new vendors.Muuri();

    const removeItemInPinboardPage = stub();
    const orderPinboard = stub();

    const items = [{ 'id': 1 }, { 'id': 2 }];
    instance = renderIntoDocument(
      <PinnedType
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

    orderPinboard.should.be.calledWith({ 'officerIds': [1, 2] });
  });

  it('should invoke orderPinboard with type CR when dragEnd', function () {
    const muuri = new vendors.Muuri();

    const removeItemInPinboardPage = stub();
    const orderPinboard = stub();

    const items = [{ 'id': '1' }, { 'id': '2' }];
    instance = renderIntoDocument(
      <PinnedType
        type='CR'
        items={ items }
        removeItemInPinboardPage={ removeItemInPinboardPage }
        orderPinboard={ orderPinboard }
      />
    );
    instance.gridMuuri.getItems = () => [
      { 'getElement': () => ({ 'getAttribute': () => '1' }) },
      { 'getElement': () => ({ 'getAttribute': () => '2' }) },
    ];

    muuri.on.should.be.calledWith('dragEnd', instance.updateOrder);
    instance.updateOrder();

    orderPinboard.should.be.calledWith({ 'crids': ['1', '2'] });
  });

  it('should invoke orderPinboard with type OFFICER when dragEnd', function () {
    const muuri = new vendors.Muuri();

    const removeItemInPinboardPage = stub();
    const orderPinboard = stub();

    const items = [{ 'id': 1 }, { 'id': 2 }];
    instance = renderIntoDocument(
      <PinnedType
        type='TRR'
        items={ items }
        removeItemInPinboardPage={ removeItemInPinboardPage }
        orderPinboard={ orderPinboard }
      />
    );
    instance.gridMuuri.getItems = () => [
      { 'getElement': () => ({ 'getAttribute': () => 1 }) },
      { 'getElement': () => ({ 'getAttribute': () => 2 }) },
    ];

    muuri.on.should.be.calledWith('dragEnd', instance.updateOrder);
    instance.updateOrder();

    orderPinboard.should.be.calledWith({ 'trrIds': [1, 2] });
  });
});
