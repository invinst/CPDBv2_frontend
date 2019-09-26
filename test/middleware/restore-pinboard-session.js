import { Promise } from 'es6-promise';
import { stub } from 'sinon';

import restorePinboardSession from 'middleware/restore-pinboard-session';
import { fetchLatestRetrievedPinboard } from 'actions/pinboard';
import extractQuery from 'utils/extract-query';


const createLocationChangeAction = (pathname) => ({
  type: '@@router/LOCATION_CHANGE',
  payload: {
    pathname: pathname,
    query: extractQuery(pathname),
  },
});


const buildStore = () => ({
  _state: {
    pinboardPage: {
      pinboard: {
        id: 'id',
      },
    },
  },
  getState() {
    return this._state;
  },
  dispatch: stub().usingPromise(Promise).resolves('abc'),
});

describe('fetchLatestRetrievedPinboard middleware', () => {
  let store;

  beforeEach(() => {
    store = buildStore();
    store.dispatch.resetHistory();
  });

  it('should not dispatch if action is not location change', () => {
    const action = {
      type: 'another action',
    };
    let dispatched;

    restorePinboardSession(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.called.should.be.false();
  });

  it('should not dispatch if pinboard is restored', () => {
    store.getState().pinboardPage.pinboard.isPinboardRestored = true;
    const action = createLocationChangeAction('');

    let dispatched;
    restorePinboardSession(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.called.should.be.false();
  });

  it('should dispatch fetchLatestRetrievedPinboard with create is false if not on no id pinboard page', () => {
    const action = createLocationChangeAction('');

    let dispatched;
    restorePinboardSession(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.calledWith(fetchLatestRetrievedPinboard({ create: false })).should.be.true();
  });

  it('should dispatch fetchLatestRetrievedPinboard with create is true if on no id pinboard page', () => {
    const action = createLocationChangeAction('/pinboard/');

    let dispatched;
    restorePinboardSession(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.calledWith(fetchLatestRetrievedPinboard({ create: true })).should.be.true();
  });

  it('should not dispatch fetchLatestRetrievedPinboard if there is no pinboard id but query exists', () => {
    const action = createLocationChangeAction('/pinboard/?officer-ids=1,3,4,5,0&crids=1053673&trr-ids=,0,1');

    let dispatched;
    restorePinboardSession(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.should.not.be.called();
  });

  it('should fetchLatestRetrievedPinboard if there is query but not on pinboard page', () => {
    const action = createLocationChangeAction('/search/?officer-ids=1,3,4,5,0&crids=1053673&trr-ids=,0,1');

    let dispatched;
    restorePinboardSession(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.should.be.called();
  });
});
