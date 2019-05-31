import React from 'react';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithTag,
} from 'react-addons-test-utils';
import { stub, useFakeTimers } from 'sinon';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import PinnedType from 'components/pinboard-page/pinned-type';
import PinnedOfficersContainer from 'containers/pinboard-page/pinned-officers';
import PinnedCRsContainer from 'containers/pinboard-page/pinned-crs';
import PinnedTRRsContainer from 'containers/pinboard-page/pinned-trrs';
import CRCard from 'components/pinboard-page/cards/cr-card';
import OfficerCard from 'components/pinboard-page/cards/officer-card';
import TRRCard from 'components/pinboard-page/cards/trr-card';
import * as vendors from 'utils/vendors';
import * as navigation from 'utils/navigation';


describe('PinnedType component', function () {
  let instance;
  const mockStore = MockStore();
  const store = mockStore({
    pinboardPage: {
      officerItems: [{
        id: 1,
        'full_name': 'Daryl Mack',
        'complaint_count': 0,
        'sustained_count': 0,
        'birth_year': 1975,
        'complaint_percentile': 99.3450,
        race: 'White',
        gender: 'Male',
        rank: 'Police Officer',
        percentile: {}
      }, {
        id: 2,
        'full_name': 'Daryl Mack',
        'complaint_count': 0,
        'sustained_count': 0,
        'birth_year': 1975,
        'complaint_percentile': 99.3450,
        race: 'White',
        gender: 'Male',
        rank: 'Police Officer',
        percentile: {}
      }],
      crItems: [{
        crid: '1000001',
        'incident_date': '2010-01-01',
        point: { 'lon': 1.0, 'lat': 1.0 },
        'most_common_category': 'Use Of Force',
      }, {
        crid: '1000002',
        'incident_date': '2010-01-01',
        point: { 'lon': 1.0, 'lat': 1.0 },
        'most_common_category': 'Use Of Force',
      }],
      trrItems: [{
        id: 1,
        'trr_datetime': '2012-01-01',
        category: 'Impact Weapon',
        point: { 'lon': 1.0, 'lat': 1.0 },
      }, {
        id: 2,
        'trr_datetime': '2012-01-01',
        category: 'Impact Weapon',
        point: { 'lon': 1.0, 'lat': 1.0 },
      }],
    }
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render nothing if items is empty', function () {
    instance = renderIntoDocument(<PinnedType type='CR' items={ [] } />);

    scryRenderedDOMComponentsWithTag(instance, 'div').should.have.length(0);
  });

  it('should render CR cards', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <PinnedCRsContainer/>
      </Provider>
    );

    const crCards = scryRenderedComponentsWithType(instance, CRCard);
    crCards.should.have.length(2);
    crCards[0].props.item.id.should.eql('1000001');
    crCards[1].props.item.id.should.eql('1000002');
  });

  it('should render OFFICER cards', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <PinnedOfficersContainer/>
      </Provider>
    );

    const officerCards = scryRenderedComponentsWithType(instance, OfficerCard);
    officerCards.should.have.length(2);
    officerCards[0].props.item.id.should.eql('1');
    officerCards[1].props.item.id.should.eql('2');
  });

  it('should render TRR cards', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <PinnedTRRsContainer/>
      </Provider>
    );

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

  it('should maintain the scroll position since second rerender', function () {
    stub(navigation, 'getPageYBottomOffset').returns(700);
    stub(navigation, 'scrollByBottomOffset');

    instance = renderIntoDocument(<PinnedType type='TRR' items={ [{ 'id': '1' }] } />);

    const items = [{ 'id': '1' }, { 'id': '2' }];
    instance = reRender(<PinnedType type='TRR' items={ items } />, instance);

    navigation.scrollByBottomOffset.should.not.be.called();

    const otherItems = [{ 'id': '1' }, { 'id': '2' }, { 'id': '3' }];
    instance = reRender(<PinnedType type='TRR' items={ otherItems } />, instance);

    navigation.scrollByBottomOffset.should.be.calledOnce();
    navigation.scrollByBottomOffset.should.be.calledWith(700);

    navigation.scrollByBottomOffset.resetHistory();
    navigation.getPageYBottomOffset.restore();
    stub(navigation, 'getPageYBottomOffset').returns(400);

    instance = reRender(<PinnedType type='TRR' items={ [] } />, instance);

    navigation.scrollByBottomOffset.should.be.calledOnce();
    navigation.scrollByBottomOffset.should.be.calledWith(400);

    navigation.getPageYBottomOffset.restore();
    navigation.scrollByBottomOffset.restore();
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

  it('should reset grid when did update', function () {
    const onMuuriStub = stub();
    const destroyMuuriStub = stub();
    const MuuriStub = stub(vendors, 'Muuri').callsFake(() => ({
      'on': onMuuriStub,
      'destroy': destroyMuuriStub,
    }));

    const items = [{ 'id': '1' }, { 'id': '2' }];
    instance = renderIntoDocument(<PinnedType type='OFFICER' items={ items } />);

    MuuriStub.resetHistory();
    onMuuriStub.resetHistory();
    destroyMuuriStub.should.not.be.called();

    const newItems = [{ 'id': '1' }, { 'id': '2' }, { 'id': '3' }];
    instance = reRender(<PinnedType type='OFFICER' items={ newItems } />, instance);

    MuuriStub.should.be.calledWith(instance.grid, {
      itemClass: 'pinned-grid-item',
      dragEnabled: true,
    });
    destroyMuuriStub.should.be.calledOnce();
    onMuuriStub.should.be.calledWith('dragEnd', instance.updateOrder);

    MuuriStub.restore();
  });

  it('should remove item from the grid when removeItemInPinboardPage is called', function () {
    const clock = useFakeTimers();
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
    removeItemInPinboardPage.should.not.be.called();

    clock.tick(250);

    removeItemInPinboardPage.should.be.calledWith({ 'id': '1' });

    muuri.remove.resetHistory();
    clock.restore();
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
      { 'getElement': () => ({ 'getAttribute': () => 2 }) },
      { 'getElement': () => ({ 'getAttribute': () => 1 }) },
    ];

    instance.updateOrder();

    orderPinboard.should.be.calledWith({ type: 'OFFICER', 'ids': [2, 1] });
  });

  it('should not invoke orderPinboard when no change', function () {
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
    orderPinboard.should.not.be.called();
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
      <PinnedType
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
});
