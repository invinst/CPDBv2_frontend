import { Promise } from 'es6-promise';
import { stub, useFakeTimers } from 'sinon';
import { Toastify } from 'utils/vendors';

import createOrUpdatePinboard from 'middleware/create-or-update-pinboard';
import * as constants from 'utils/constants';
import {
  createPinboard,
  updatePinboard,
  orderPinboardState,
  savePinboard,
  addItemToPinboardState,
  removeItemFromPinboardState,
  fetchPinboardSocialGraph,
  fetchPinboardGeographic,
  fetchFirstPagePinboardGeographicCrs,
  fetchFirstPagePinboardGeographicTrrs,
  fetchPinboardRelevantDocuments,
  fetchPinboardRelevantCoaccusals,
  fetchPinboardRelevantComplaints,
  performFetchPinboardRelatedData,
  updatePinboardInfoState,
  savePinboardWithoutChangingState,
  handleRemovingItemInPinboardPage,
} from 'actions/pinboard';
import PinboardFactory from 'utils/test/factories/pinboard';


describe('createOrUpdatePinboard middleware', function () {
  const createStore = (pinboard, pathname='') => ({
    getState: () => {
      return {
        pinboardPage: {
          pinboard,
          officerItems: {
            items: [],
            removingItems: [],
            requesting: false,
          },
          crItems: {
            items: [],
            removingItems: [],
            requesting: false,
          },
          trrItems: {
            items: [],
            removingItems: [],
            requesting: false,
          },
        },
        pathname,
      };
    },
    dispatch: stub().usingPromise(Promise).resolves('abc'),
  });

  it('should not dispatch any action if action is not adding or removing items', function () {
    const action = {
      type: 'other action',
    };
    const store = createStore();
    let dispatched;

    createOrUpdatePinboard(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);
    store.dispatch.called.should.be.false();
  });

  it('should handle UPDATE_PINBOARD_INFO and dispatch updatePinboardInfoState', function (done) {
    const action = {
      type: constants.UPDATE_PINBOARD_INFO,
      payload: {
        'title': 'Updated Title',
        'description': 'Updated Description',
        'unit_id': '123',
      },
    };
    const store = createStore(PinboardFactory.build());
    let dispatched;
    createOrUpdatePinboard(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.should.be.calledWith(updatePinboardInfoState({
      'title': 'Updated Title',
      'description': 'Updated Description',
      'unit_id': '123',
    }));

    setTimeout(
      () => {
        store.dispatch.should.be.calledWith(savePinboard());
        done();
      },
      50
    );
  });

  it('should handle ORDER_PINBOARD and dispatch orderPinboardState', function (done) {
    const action = {
      type: constants.ORDER_PINBOARD,
      payload: {
        type: 'OFFICER',
        ids: ['123', '789', '456'],
      },
    };
    const store = createStore(PinboardFactory.build());

    let dispatched;
    createOrUpdatePinboard(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.should.be.calledWith(orderPinboardState({
      type: 'OFFICER',
      ids: ['123', '789', '456'],
    }));

    setTimeout(
      () => {
        store.dispatch.should.be.calledWith(savePinboard());
        done();
      },
      50
    );
  });

  it('should handle ADD_OR_REMOVE_ITEM_IN_PINBOARD and dispatch addItemToPinboardState', function (done) {
    const action = {
      type: constants.ADD_OR_REMOVE_ITEM_IN_PINBOARD,
      payload: {
        id: '123',
        type: 'CR',
        isPinned: false,
      },
    };
    const store = createStore(PinboardFactory.build());

    let dispatched;
    createOrUpdatePinboard(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.should.be.calledWith(addItemToPinboardState({
      id: '123',
      type: 'CR',
      isPinned: false,
    }));

    setTimeout(
      () => {
        store.dispatch.should.be.calledWith(savePinboard());
        done();
      },
      50
    );
  });

  it('should handle ADD_OR_REMOVE_ITEM_IN_PINBOARD and dispatch removeItemFromPinboardState', function (done) {
    const action = {
      type: constants.ADD_OR_REMOVE_ITEM_IN_PINBOARD,
      payload: {
        id: '123',
        type: 'CR',
        isPinned: true,
      },
    };
    const store = createStore(PinboardFactory.build());

    let dispatched;
    createOrUpdatePinboard(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.should.be.calledWith(removeItemFromPinboardState({
      id: '123',
      type: 'CR',
      isPinned: true,
    }));

    setTimeout(
      () => {
        store.dispatch.should.be.calledWith(savePinboard());
        done();
      },
      50
    );
  });

  it('should handle ADD_ITEM_IN_PINBOARD_PAGE and dispatch addItemToPinboardState', function (done) {
    const action = {
      type: constants.ADD_ITEM_IN_PINBOARD_PAGE,
      payload: {
        id: '123',
        type: 'CR',
      },
    };
    const store = createStore(PinboardFactory.build());

    let dispatched;
    createOrUpdatePinboard(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.should.be.calledWith(addItemToPinboardState({
      id: '123',
      type: 'CR',
    }));

    setTimeout(
      () => {
        store.dispatch.should.be.calledWith(savePinboard());
        done();
      },
      50
    );
  });

  it('should handle REMOVE_ITEM_IN_PINBOARD_PAGE and dispatch removeItemFromPinboardState', function (done) {
    const action = {
      type: constants.REMOVE_ITEM_IN_PINBOARD_PAGE,
      payload: {
        id: '123',
        type: 'CR',
      },
    };
    const store = createStore(PinboardFactory.build());

    let dispatched;
    createOrUpdatePinboard(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.should.be.calledWith(removeItemFromPinboardState({
      id: '123',
      type: 'CR',
    }));

    setTimeout(
      () => {
        store.dispatch.should.be.calledWith(savePinboard());
        done();
      },
      50
    );
  });

  it('should handle REMOVE_ITEM_IN_PINBOARD_PAGE with API_ONLY mode', function (done) {
    const action = {
      type: constants.REMOVE_ITEM_IN_PINBOARD_PAGE,
      payload: {
        id: '123',
        type: 'CR',
        mode: constants.PINBOARD_ITEM_REMOVE_MODE.API_ONLY,
      },
    };
    const store = createStore(PinboardFactory.build());

    let dispatched;
    createOrUpdatePinboard(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.should.be.calledWith(handleRemovingItemInPinboardPage({
      id: '123',
      type: 'CR',
      mode: constants.PINBOARD_ITEM_REMOVE_MODE.API_ONLY,
    }));

    setTimeout(
      () => {
        store.dispatch.should.be.calledWith(savePinboardWithoutChangingState(action.payload));
        done();
      },
      50
    );
  });

  it('should handle REMOVE_ITEM_IN_PINBOARD_PAGE with STATE_ONLY mode', function () {
    const action = {
      type: constants.REMOVE_ITEM_IN_PINBOARD_PAGE,
      payload: {
        id: '123',
        type: 'CR',
        mode: constants.PINBOARD_ITEM_REMOVE_MODE.STATE_ONLY,
      },
    };
    const store = createStore(PinboardFactory.build());

    let dispatched;
    createOrUpdatePinboard(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.should.be.calledWith(removeItemFromPinboardState(action.payload));
  });

  it('should handle SAVE_PINBOARD_WITHOUT_CHANGING_STATE', function (done) {
    const action = {
      type: constants.SAVE_PINBOARD_WITHOUT_CHANGING_STATE,
      payload: {
        type: 'OFFICER',
        id: '123',
      },
    };
    const store = {
      getState: () => {
        return {
          pinboardPage: {
            pinboard: PinboardFactory.build({
              'id': '66ef1560',
              'officer_ids': [123, 456],
              'saving': false,
              'needRefreshData': true,
            }),
            officerItems: {
              items: [],
              removingItems: ['123'],
              requesting: false,
            },
            crItems: {
              items: [],
              removingItems: [],
              requesting: false,
            },
            trrItems: {
              items: [],
              removingItems: [],
              requesting: false,
            },
          },
        };
      },
      dispatch: stub().usingPromise(Promise).resolves({
        payload: {
          id: '66ef1560',
          title: '',
          description: '',
          'officer_ids': ['456'],
          crids: [],
          'trr_ids': [],
        },
      }),
    };

    let dispatched;
    createOrUpdatePinboard(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.should.be.calledWith(updatePinboard({
      id: '66ef1560',
      title: '',
      description: '',
      officerIds: ['456'],
      crids: [],
      trrIds: [],
    }));

    setTimeout(
      () => {
        store.dispatch.should.be.calledWith(fetchPinboardSocialGraph('66ef1560'));
        store.dispatch.should.be.calledWith(fetchPinboardGeographic());
        store.dispatch.should.be.calledWith(fetchFirstPagePinboardGeographicCrs({ 'pinboard_id': '66ef1560' }));
        store.dispatch.should.be.calledWith(fetchFirstPagePinboardGeographicTrrs({ 'pinboard_id': '66ef1560' }));
        store.dispatch.should.be.calledWith(fetchPinboardRelevantDocuments('66ef1560'));
        store.dispatch.should.be.calledWith(fetchPinboardRelevantCoaccusals('66ef1560'));
        store.dispatch.should.be.calledWith(fetchPinboardRelevantComplaints('66ef1560'));
        store.dispatch.should.be.calledWith(performFetchPinboardRelatedData());
        done();
      },
      50
    );
  });

  describe('handling SAVE_PINBOARD', function () {
    it('should dispatch createPinboard', function (done) {
      const action = {
        type: constants.SAVE_PINBOARD,
        payload: null,
      };
      const store = createStore(PinboardFactory.build({
        'id': null,
        'officer_ids': [123, 456],
        'trr_ids': [789],
        'crids': ['abc'],
        'saving': false,
      }));

      let dispatched;
      createOrUpdatePinboard(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.be.calledWith(createPinboard({
        id: null,
        title: '',
        description: '',
        officerIds: ['123', '456'],
        crids: ['abc'],
        trrIds: ['789'],
      }));

      setTimeout(
        () => {
          store.dispatch.should.be.calledWith(savePinboard());
          done();
        },
        50
      );
    });

    it('should dispatch updatePinboard', function (done) {
      const action = {
        type: constants.SAVE_PINBOARD,
        payload: null,
      };
      const store = createStore(PinboardFactory.build({
        'id': '66ef1560',
        'officer_ids': [123, 456],
        'saving': false,
      }));

      let dispatched;
      createOrUpdatePinboard(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.be.calledWith(updatePinboard({
        id: '66ef1560',
        title: '',
        description: '',
        officerIds: ['123', '456'],
        crids: [],
        trrIds: [],
      }));

      setTimeout(
        () => {
          store.dispatch.should.be.calledWith(savePinboard());
          done();
        },
        50
      );
    });

    it('should dispatch nothing when saving is true', function () {
      const action = {
        type: constants.SAVE_PINBOARD,
        payload: null,
      };
      const store = createStore(PinboardFactory.build({
        'id': '66ef1560',
        'officer_ids': [123, 456],
        'saving': true,
      }));

      let dispatched;
      createOrUpdatePinboard(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.not.be.called();
    });

    it('should dispatch updatePinboard when not up to date', function (done) {
      const action = {
        type: constants.SAVE_PINBOARD,
        payload: PinboardFactory.build({
          'id': '66ef1560',
          'officer_ids': [123],
        }),
      };
      const store = createStore(PinboardFactory.build({
        'id': null,
        'officer_ids': [123, 456],
        'saving': false,
      }));

      let dispatched;
      createOrUpdatePinboard(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.be.called();
      store.dispatch.should.be.calledWith(createPinboard({
        id: null,
        title: '',
        description: '',
        officerIds: ['123', '456'],
        crids: [],
        trrIds: [],
      }));

      setTimeout(
        () => {
          store.dispatch.should.be.calledWith(savePinboard());
          done();
        },
        50
      );
    });

    it('should stop the loop if nothing else to save', function () {
      const action = {
        type: constants.SAVE_PINBOARD,
        payload: PinboardFactory.build({
          'id': '66ef1560',
          'officer_ids': [123, 456],
        }),
      };
      const store = createStore(PinboardFactory.build({
        'id': '66ef1560',
        'officer_ids': [123, 456],
        'saving': false,
      }));

      let dispatched;
      createOrUpdatePinboard(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.not.be.called();
    });

    it('should fetch data at end the loop when being on the pinboard page', function () {
      const action = {
        type: constants.SAVE_PINBOARD,
        payload: PinboardFactory.build({
          'id': '66ef1560',
          'officer_ids': [123, 456],
        }),
      };
      const store = createStore(
        PinboardFactory.build({
          'id': '66ef1560',
          'officer_ids': [123, 456],
          'saving': false,
          'needRefreshData': true,
        }),
        '/pinboard/66ef1560/'
      );

      let dispatched;
      createOrUpdatePinboard(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.be.calledWith(fetchPinboardSocialGraph('66ef1560'));
      store.dispatch.should.be.calledWith(fetchPinboardGeographic());
      store.dispatch.should.be.calledWith(fetchFirstPagePinboardGeographicCrs({ 'pinboard_id': '66ef1560' }));
      store.dispatch.should.be.calledWith(fetchFirstPagePinboardGeographicTrrs({ 'pinboard_id': '66ef1560' }));
      store.dispatch.should.be.calledWith(fetchPinboardRelevantDocuments('66ef1560'));
      store.dispatch.should.be.calledWith(fetchPinboardRelevantCoaccusals('66ef1560'));
      store.dispatch.should.be.calledWith(fetchPinboardRelevantComplaints('66ef1560'));
      store.dispatch.should.be.calledWith(performFetchPinboardRelatedData());
    });

    it('should retry saving on failure after 1 second', function (done) {
      const action = {
        type: constants.SAVE_PINBOARD,
        payload: PinboardFactory.build({ 'id': '66ef1560' }),
      };
      const store = {
        getState: () => {
          return {
            pinboardPage: {
              pinboard: PinboardFactory.build({
                'id': '66ef1560',
                'officer_ids': [123, 456],
                'saving': false,
              }),
              officerItems: {
                items: [],
                removingItems: [],
                requesting: false,
              },
              crItems: {
                items: [],
                removingItems: [],
                requesting: false,
              },
              trrItems: {
                items: [],
                removingItems: [],
                requesting: false,
              },
            },
          };
        },
        dispatch: stub().usingPromise(Promise).rejects(new Error('abc')),
      };

      const realSetTimeout = setTimeout;
      const clock = useFakeTimers();

      let dispatched;
      createOrUpdatePinboard(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.be.calledOnce();
      store.dispatch.should.be.calledWith(updatePinboard({
        id: '66ef1560',
        title: '',
        description: '',
        officerIds: ['123', '456'],
        crids: [],
        trrIds: [],
      }));

      realSetTimeout(
        () => {
          clock.tick(1500);

          store.dispatch.should.be.calledTwice();
          store.dispatch.should.be.calledWith(savePinboard());

          clock.restore();
          done();
        },
        50,
      );
    });

    it('should retry maximum 60 times', function (done) {
      const action = {
        type: constants.SAVE_PINBOARD,
        payload: null,
      };
      const store = {
        getState: () => {
          return {
            pinboardPage: {
              pinboard: PinboardFactory.build({
                'id': '66ef1560',
                'officer_ids': [123, 456],
                'saving': false,
              }),
            },
          };
        },
        dispatch: stub().usingPromise(Promise).resolves('abc'),
      };

      createOrUpdatePinboard(store)(action => action)(action);

      const failingStore = {
        getState: () => {
          return {
            pinboardPage: {
              pinboard: PinboardFactory.build({
                'id': '66ef1560',
                'officer_ids': [123, 456],
                'saving': false,
              }),
            },
          };
        },
        dispatch: stub().usingPromise(Promise).rejects(new Error('abc')),
      };

      const realSetTimeout = setTimeout;
      const clock = useFakeTimers();

      function repeatSave(count) {
        if (count < 61) {
          createOrUpdatePinboard(failingStore)(action => action)(action);
          realSetTimeout(
            () => {
              clock.tick(2000);
              repeatSave(count + 1);
            },
            10
          );
        } else {
          failingStore.dispatch.callCount.should.equal(121);
          clock.restore();
          done();
        }
      }

      repeatSave(0);
    });
  });

  it('should handle @@router/LOCATION_CHANGE and dispatch createPinboard', function (done) {
    const action = {
      type: '@@router/LOCATION_CHANGE',
      payload: {},
    };
    const store = createStore(PinboardFactory.build({
      'id': null,
      'officer_ids': [123, 456],
      'saving': true,
    }));

    let dispatched;
    createOrUpdatePinboard(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.should.be.calledWith(createPinboard({
      id: null,
      title: '',
      description: '',
      officerIds: ['123', '456'],
      crids: [],
      trrIds: [],
    }));

    setTimeout(
      () => {
        store.dispatch.should.be.calledWith(savePinboard());
        done();
      },
      50
    );
  });

  it('should handle @@router/LOCATION_CHANGE and dispatch updatePinboard', function (done) {
    const action = {
      type: '@@router/LOCATION_CHANGE',
      payload: {},
    };
    const store = createStore(PinboardFactory.build({
      'id': '66ef1560',
      'officer_ids': [123, 456],
      'saving': true,
    }));

    let dispatched;
    createOrUpdatePinboard(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.should.be.calledWith(updatePinboard({
      id: '66ef1560',
      title: '',
      description: '',
      officerIds: ['123', '456'],
      crids: [],
      trrIds: [],
    }));

    setTimeout(
      () => {
        store.dispatch.should.be.calledWith(savePinboard());
        done();
      },
      50
    );
  });

  it('should handle @@router/LOCATION_CHANGE and do nothing if not saving', function () {
    const action = {
      type: '@@router/LOCATION_CHANGE',
      payload: {},
    };
    const store = createStore(PinboardFactory.build({
      'id': '66ef1560',
      'officer_ids': [123, 456],
      'saving': false,
    }));

    let dispatched;
    createOrUpdatePinboard(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.should.not.be.called();
  });

  it('should handle @@router/LOCATION_CHANGE with no pinboard id but query', function () {
    const action = {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        query: {
          'officer-ids': '1,3,4,5,0',
          crids: '1053673',
          'trr-ids': ',0,1',
        },
      },
    };
    const store = createStore(PinboardFactory.build({
      'id': null,
      'officer_ids': [],
      'saving': false,
    }));

    let dispatched;
    createOrUpdatePinboard(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.should.be.calledWith(createPinboard({
      officerIds: [1, 3, 4, 5, 0],
      crids: ['1053673'],
      trrIds: [0, 1],
    }));
  });

  it('should handle PINBOARD_CREATE_REQUEST_SUCCESS and may show toast', function () {
    Toastify.toast.resetHistory();
    Toastify.toast.should.not.be.called();

    const action = {
      type: 'PINBOARD_CREATE_REQUEST_SUCCESS',
      payload: {
        id: 'abc123',
        'officer_ids': [1, 2, 3],
        crids: ['1053673'],
        'trr_ids': [1],
      },
    };
    const store = createStore(PinboardFactory.build({
      'id': null,
      'saving': false,
    }));

    let dispatched;
    createOrUpdatePinboard(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    Toastify.toast.should.be.calledThrice();
    Toastify.toast.should.be.calledWith('3 out of 3 officers were added to this pinboard.');
    Toastify.toast.should.be.calledWith('1 out of 1 allegation were added to this pinboard.');
    Toastify.toast.should.be.calledWith('1 out of 1 TRR were added to this pinboard.');

    Toastify.toast.resetHistory();
  });

  it('should handle PINBOARD_CREATE_REQUEST_SUCCESS and may not show any toast', function () {
    Toastify.toast.resetHistory();
    Toastify.toast.should.not.be.called();

    const action = {
      type: 'PINBOARD_CREATE_REQUEST_SUCCESS',
      payload: {
        id: 'abc123',
        'officer_ids': [],
        crids: [],
        'trr_ids': [],
      },
    };
    const store = createStore(PinboardFactory.build({
      'id': null,
      'saving': false,
    }));

    let dispatched;
    createOrUpdatePinboard(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    Toastify.toast.should.not.be.called();

    Toastify.toast.resetHistory();
  });

  it('should handle PINBOARD_CREATE_REQUEST_SUCCESS and may show not found toasts', function () {
    Toastify.toast.resetHistory();
    Toastify.toast.should.not.be.called();

    const action = {
      type: 'PINBOARD_CREATE_REQUEST_SUCCESS',
      payload: {
        id: 'abc123',
        'officer_ids': [],
        crids: ['1053673'],
        'trr_ids': [],
        'not_found_items': {
          'officer_ids': [],
          crids: ['xyz567', 'tyu890'],
          'trr_ids': [3, 99],
        },
      },
    };
    const store = createStore(PinboardFactory.build({
      'id': null,
      'saving': false,
    }));

    let dispatched;
    createOrUpdatePinboard(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    Toastify.toast.should.be.calledTwice();
    Toastify.toast.should.be.calledWith(
      '1 out of 3 allegations were added to this pinboard. ' +
      '2 out of 3 allegation IDS could not be recognized (xyz567, tyu890).'
    );
    Toastify.toast.should.be.calledWith('2 out of 2 TRR IDS could not be recognized (3, 99).');

    Toastify.toast.resetHistory();
  });
});
