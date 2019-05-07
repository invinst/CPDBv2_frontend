import { Promise } from 'es6-promise';
import { stub, useFakeTimers } from 'sinon';

import createOrUpdatePinboard from 'middleware/create-or-update-pinboard';
import * as constants from 'utils/constants';
import {
  createPinboard,
  updatePinboard,
  updatePinboardOrder,
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

  const createAddOrRemoveItemInPinboardAction = (item) => ({
    type: constants.ADD_OR_REMOVE_ITEM_IN_PINBOARD,
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
    const action = createAddOrRemoveItemInPinboardAction({
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

  it('should handle ORDER_PINBOARD and dispatch createPinboard', function (done) {
    const action = {
      type: constants.ORDER_PINBOARD,
      payload: {
        officerIds: [123, 789, 456]
      }
    };

    const store = createStore(PinboardFactory.build({
      id: null,
      'officer_ids': [2],
      'crids': ['2', '9'],
    }));

    let dispatched;
    createOrUpdatePinboard(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    setTimeout(
      () => {
        store.dispatch.should.be.calledWith(createPinboard({
          id: '99',
          title: '',
          description: '',
          officerIds: [123, 789, 456],
          crids: ['2', '9'],
          trrIds: [],
        }));
        done();
      },
      100
    );
  });

  it('should handle ORDER_PINBOARD and dispatch updatePinboardOrder', function (done) {
    const action = {
      type: constants.ORDER_PINBOARD,
      payload: {
        officerIds: [123, 789, 456]
      }
    };

    const store = createStore(PinboardFactory.build({
      id: '99',
      'officer_ids': [2],
      'crids': ['2', '9'],
    }));

    let dispatched;
    createOrUpdatePinboard(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    setTimeout(
      () => {
        store.dispatch.should.be.calledWith(updatePinboardOrder({
          id: '99',
          title: '',
          description: '',
          officerIds: [123, 789, 456],
          crids: ['2', '9'],
          trrIds: [],
        }));
        done();
      },
      100
    );
  });

  it('should handle ORDER_PINBOARD actions with debounced mode', function (done) {
    const clock = useFakeTimers();

    const action1 = {
      type: constants.ORDER_PINBOARD,
      payload: {
        officerIds: [123, 789, 456]
      }
    };

    const action2 = {
      type: constants.ORDER_PINBOARD,
      payload: {
        officerIds: [123, 789, 456]
      }
    };

    const action3 = {
      type: constants.ORDER_PINBOARD,
      payload: {
        officerIds: [123, 456, 789]
      }
    };

    const store = createStore(PinboardFactory.build({
      id: '99',
      'officer_ids': [2],
      'crids': ['2', '9'],
    }));

    let dispatched;
    createOrUpdatePinboard(store)(action => dispatched = action)(action1);
    clock.tick(80);
    createOrUpdatePinboard(store)(action => dispatched = action)(action2);
    clock.tick(80);
    createOrUpdatePinboard(store)(action => dispatched = action)(action3);
    clock.tick(200);
    dispatched.should.eql(action3);
    clock.restore();

    setTimeout(() => {
      store.dispatch.should.be.calledOnce();
      store.dispatch.should.be.calledWith(updatePinboardOrder({
        id: '99',
        title: '',
        description: '',
        officerIds: [123, 456, 789],
        crids: ['2', '9'],
        trrIds: [],
      }));
      done();
    },
    200);
  });

  context('handling ADD_OR_REMOVE_ITEM_IN_PINBOARD action', function () {
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
      const action = createAddOrRemoveItemInPinboardAction({
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
      const action = createAddOrRemoveItemInPinboardAction({
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
