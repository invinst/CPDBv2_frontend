import { Promise } from 'es6-promise';
import { stub } from 'sinon';

import createOrUpdatePinboard from 'middleware/create-or-update-pinboard';
import * as constants from 'utils/constants';
import {
  createPinboard,
  updatePinboard,
} from 'actions/pinboard';
import PinboardFactory from 'utils/test/factories/pinboard';


describe('createOrUpdatePinboard middleware', function () {
  const createStore = (pinboard, pathname='') => ({
    getState: () => {
      return {
        pinboard,
        pathname,
      };
    },
    dispatch: stub().usingPromise(Promise).resolves('abc')
  });

  const createAddItemToPinboardAction = (item) => ({
    type: constants.ADD_ITEM_TO_PINBOARD,
    payload: {
      id: item.id,
      type: item.type,
      isPinned: item.isPinned,
    }
  });

  const createRemoveItemInPinboardPageAction = (item) => ({
    type: constants.REMOVE_ITEM_IN_PINBOARD_PAGE,
    payload: {
      id: item.id,
      type: item.type,
      isPinned: item.isPinned,
    }
  });

  const createAddItemInPinboardPageAction = (item) => ({
    type: constants.ADD_ITEM_IN_PINBOARD_PAGE,
    payload: {
      id: item.id,
      type: item.type,
      isPinned: item.isPinned,
    }
  });

  const shouldDispatchWithType = (type) => {
    const itemId = '1';
    const action = createAddItemToPinboardAction({
      id: itemId,
      type: type,
      isPinned: false,
    });
    const store = createStore(PinboardFactory.build());
    let dispatched;

    createOrUpdatePinboard(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    const officerIds = (type.endsWith('OFFICER') || type.endsWith('OFFICERS')) ? [itemId] : [];
    const crids = type.endsWith('CR') ? [itemId] : [];
    const trrIds = type.endsWith('TRR') ? [itemId] : [];
    store.dispatch.calledWith(createPinboard({
      id: null,
      title: '',
      officerIds: officerIds,
      crids: crids,
      trrIds: trrIds,
      description: '',
      url: '',
      itemsCount: 0,
      crItems: [],
      officerItems: [],
      trrItems: [],
    })).should.be.true();
  };

  it('should not dispatch any action if action is not adding or removing items', function () {
    const action = {
      type: 'other action'
    };
    const store = createStore();
    let dispatched;

    createOrUpdatePinboard(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);
    store.dispatch.called.should.be.false();
  });

  context('handling ADD_ITEM_TO_PINBOARD action', function () {
    it('should dispatch createPinboard when a first item is added', function () {
      const typesCanBePinned = [
        'CR', 'DATE > CR', 'INVESTIGATOR > CR',
        'OFFICER', 'UNIT > OFFICERS', 'DATE > OFFICERS',
        'TRR', 'DATE > TRR',
      ];

      for (let i = 0; i < typesCanBePinned.length; i++) {
        shouldDispatchWithType(typesCanBePinned[i]);
      }
    });

    it('should dispatch updatePinboard if successive items are added', function () {
      const action = createAddItemToPinboardAction({
        id: '1',
        type: 'CR',
        isPinned: false,
      });
      const store = createStore(PinboardFactory.build({
        id: '99',
        crids: ['2'],
      }));
      let dispatched;

      createOrUpdatePinboard(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);
      store.dispatch.calledWith(updatePinboard({
        id: '99',
        title: '',
        crids: ['2', '1'],
        officerIds: [],
        trrIds: [],
        description: '',
        url: '',
        itemsCount: 1,
      })).should.be.true();
    });

    it('should dispatch updatePinboard if an item is removed', function () {
      const action = createAddItemToPinboardAction({
        id: '1',
        type: 'CR',
        isPinned: true,
      });
      const store = createStore(PinboardFactory.build({
        id: '99',
        crids: ['2', '1'],
        'officer_ids': ['a'],
        'trr_ids': ['1'],
      }));
      let dispatched;

      createOrUpdatePinboard(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);
      store.dispatch.calledWith(updatePinboard({
        id: '99',
        title: '',
        description: '',
        crids: ['2'],
        officerIds: ['a'],
        trrIds: ['1'],
        url: '',
        itemsCount: 3,
      })).should.be.true();
    });
  });

  context('handling REMOVE_ITEM_IN_PINBOARD_PAGE ', function () {
    it('should dispatch updatePinboard if an item is removed', function () {
      const action = createRemoveItemInPinboardPageAction({
        id: '1',
        type: 'CR',
        isPinned: true,
      });
      const store = createStore(PinboardFactory.build({
        id: '99',
        crids: ['2', '1'],
        'officer_ids': ['a'],
        'trr_ids': ['1'],
      }));
      let dispatched;

      createOrUpdatePinboard(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);
      store.dispatch.calledWith(updatePinboard({
        id: '99',
        title: '',
        description: '',
        crids: ['2'],
        officerIds: ['a'],
        trrIds: ['1'],
        url: '',
        itemsCount: 3,
      })).should.be.true();
    });
  });

  context('handling ADD_ITEM_IN_PINBOARD_PAGE', function () {
    it('should dispatch updatePinboard if an item is removed', function () {
      const action = createAddItemInPinboardPageAction({
        id: '1',
        type: 'CR',
        isPinned: false,
      });
      const store = createStore(PinboardFactory.build({
        id: '99',
        crids: ['2'],
        'officer_ids': ['a'],
        'trr_ids': ['1'],
      }));
      let dispatched;

      createOrUpdatePinboard(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);
      store.dispatch.calledWith(updatePinboard({
        id: '99',
        title: '',
        description: '',
        crids: ['2', '1'],
        officerIds: ['a'],
        trrIds: ['1'],
        url: '',
        itemsCount: 3,
      })).should.be.true();
    });
  });
});
