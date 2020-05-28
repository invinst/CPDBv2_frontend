import { stub } from 'sinon';
import { Promise } from 'es6-promise';
import { LOCATION_CHANGE } from 'connected-react-router';

import {
  PINBOARD_FETCH_REQUEST_SUCCESS,
  PINBOARD_CREATE_REQUEST_SUCCESS,
} from 'utils/constants';
import fetchPinboardsMiddleware from 'middleware/fetch-pinboards-middleware';
import browserHistory from 'utils/history';
import * as pinboardPageActions from 'actions/pinboard-page';


describe('fetchPinboardsMiddleware', function () {
  let store;
  beforeEach(function () {
    store = {
      _state: {
        pinboardPage: {
          pinboard: null,
          pinboards: [],
        },
      },
      getState() {
        return this._state;
      },
      dispatch: stub().usingPromise(Promise).resolves('abc'),
    };
    stub(pinboardPageActions, 'fetchPinboards')
      .withArgs({ detail: true }).returns(true);
  });

  context('on pinboard page', function () {
    context('on /pinboard/f27ab3/untitled-pinboard/', function () {
      beforeEach(function () {
        browserHistory.location = { pathname: '/pinboard/f27ab3/untitled-pinboard/' };
      });

      it('should fetch pinboards on LOCATION_CHANGE', function () {
        const action = { type: LOCATION_CHANGE };
        fetchPinboardsMiddleware(store)(() => {})(action);
        pinboardPageActions.fetchPinboards.should.be.calledOnce();
        store.dispatch.should.be.calledOnce();
      });
    });

    context('on /pinboard/', function () {
      beforeEach(function () {
        browserHistory.location = { pathname: '/pinboard/' };
      });

      it('should not fetch pinboards on LOCATION_CHANGE', function () {
        const action = { type: LOCATION_CHANGE };
        fetchPinboardsMiddleware(store)(() => {})(action);
        pinboardPageActions.fetchPinboards.should.not.be.called();
        store.dispatch.should.not.be.called();
      });
    });
  });

  context('on officer page', function () {
    beforeEach(function () {
      browserHistory.location = { pathname: '/officer/12074/keith-herrera/' };
      pinboardPageActions.fetchPinboards.resetHistory();
      store.dispatch.resetHistory();
    });

    const FETCH_DETAIL_PINBOARDS_ACTIONS = [
      PINBOARD_FETCH_REQUEST_SUCCESS,
      PINBOARD_CREATE_REQUEST_SUCCESS,
      LOCATION_CHANGE,
    ];

    FETCH_DETAIL_PINBOARDS_ACTIONS.forEach(actionType => (
      it(`should fetch detail pinboards on ${actionType}`, function () {
        const action = { type: actionType };
        fetchPinboardsMiddleware(store)(() => {})(action);
        pinboardPageActions.fetchPinboards.should.be.calledOnce();
        pinboardPageActions.fetchPinboards.should.be.calledWith({ detail: true });
        store.dispatch.should.be.calledOnce();
        store.dispatch.should.be.calledWith(true);
      })
    ));
  });

  context('on cr page', function () {
    beforeEach(function () {
      browserHistory.location = { pathname: '/complaint/12074/' };
      pinboardPageActions.fetchPinboards.resetHistory();
      store.dispatch.resetHistory();
    });

    const FETCH_DETAIL_PINBOARDS_ACTIONS = [
      PINBOARD_FETCH_REQUEST_SUCCESS,
      PINBOARD_CREATE_REQUEST_SUCCESS,
      LOCATION_CHANGE,
    ];

    FETCH_DETAIL_PINBOARDS_ACTIONS.forEach(actionType => (
      it(`should fetch detail pinboards on ${actionType}`, function () {
        const action = { type: actionType };
        fetchPinboardsMiddleware(store)(() => {})(action);
        pinboardPageActions.fetchPinboards.should.be.calledOnce();
        pinboardPageActions.fetchPinboards.should.be.calledWith({ detail: true });
        store.dispatch.should.be.calledOnce();
        store.dispatch.should.be.calledWith(true);
      })
    ));
  });

  context('on trr page', function () {
    beforeEach(function () {
      browserHistory.location = { pathname: '/trr/123/' };
      pinboardPageActions.fetchPinboards.resetHistory();
      store.dispatch.resetHistory();
    });

    it('should not fetch pinboards on PINBOARD_FETCH_REQUEST_SUCCESS', function () {
      const action = { type: PINBOARD_FETCH_REQUEST_SUCCESS };
      fetchPinboardsMiddleware(store)(() => {})(action);
      pinboardPageActions.fetchPinboards.should.not.be.called();
      store.dispatch.should.not.be.called();
    });
  });
});
