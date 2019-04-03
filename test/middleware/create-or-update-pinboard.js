import { Promise } from 'es6-promise';
import { stub } from 'sinon';

import createOrUpdatePinboard from 'middleware/create-or-update-pinboard';
import * as constants from 'utils/constants';
import { createPinboard, updatePinboard } from 'actions/pinboard';
import PinboardFactory from 'utils/test/factories/pinboard';


describe('createOrUpdatePinboard middleware', function () {
  const createStore = (pinboard) => ({
    getState: () => {
      return {
        pinboard
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
      ownedByCurrentUser: false,
    })).should.be.true();
  };

  it('should not dispatch any action if action is not ADD_ITEM_TO_PINBOARD', function () {
    const action = {
      type: 'other action'
    };
    const store = createStore();
    let dispatched;

    createOrUpdatePinboard(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);
    store.dispatch.called.should.be.false();
  });

  it('should dispatch createPinboard action if type is of cr or officer or trr', function () {
    const typesCanBePinned = [
      'CR', 'DATE > CR', 'INVESTIGATOR > CR',
      'OFFICER', 'UNIT > OFFICERS', 'DATE > OFFICERS',
      'TRR', 'DATE > TRR',
    ];

    for (let i = 0; i < typesCanBePinned.length; i++) {
      shouldDispatchWithType(typesCanBePinned[i]);
    }
  });

  context('when an item is added', function () {
    it('should dispatch updatePinboard if user owns the pinboard', function () {
      const action = createAddItemToPinboardAction({
        id: '1',
        type: 'CR',
        isPinned: false,
      });
      const store = createStore(PinboardFactory.build({
        id: '99',
        crids: ['2'],
        ownedByCurrentUser: true,
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
        ownedByCurrentUser: true,
      })).should.be.true();
    });

    it('should dispatch createPinboard if user does not own the pinboard', function () {
      const action = createAddItemToPinboardAction({
        id: '1',
        type: 'OFFICER',
        isPinned: false,
      });
      const store = createStore(PinboardFactory.build({
        id: '99',
        'officer_ids': ['2'],
        ownedByCurrentUser: false,
      }));
      let dispatched;

      createOrUpdatePinboard(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);
      store.dispatch.calledWith(createPinboard({
        id: '99',
        title: '',
        description: '',
        crids: [],
        officerIds: ['2', '1'],
        trrIds: [],
        url: '',
        itemsCount: 1,
        ownedByCurrentUser: false,
      })).should.be.true();
    });
  });

  context('when an item is removed', function () {
    it('should dispatch updatePinboard if user owns the pinboard', function () {
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
        ownedByCurrentUser: true,
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
        ownedByCurrentUser: true,
      })).should.be.true();
    });

    it('should dispatch createPinboard if user does not own the pinboard', function () {
      const action = createAddItemToPinboardAction({
        id: 'b',
        type: 'OFFICER',
        isPinned: true,
      });
      const store = createStore(PinboardFactory.build({
        id: '99',
        crids: ['1'],
        'officer_ids': ['a'],
        'trr_ids': ['1'],
        ownedByCurrentUser: false,
      }));
      let dispatched;

      createOrUpdatePinboard(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);
      store.dispatch.calledWith(createPinboard({
        id: '99',
        title: '',
        description: '',
        crids: ['1'],
        officerIds: ['a'],
        trrIds: ['1'],
        url: '',
        itemsCount: 2,
        ownedByCurrentUser: false,
      })).should.be.true();
    });
  });
});
