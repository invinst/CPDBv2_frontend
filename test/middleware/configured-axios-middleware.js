import MockStore from 'redux-mock-store';
import { CancelToken } from 'axios';

import configuredAxiosMiddleware, { onSuccess, onError } from 'middleware/configured-axios-middleware';
import { get } from 'actions/common/async-action';
import { REQUEST_CANCEL_MESSAGE } from 'utils/constants';


describe('configured-axios-middleware', function () {
  const next = (action) => (action);
  const action = {
    types: [
      'REQUEST_START',
      'REQUEST_SUCCESS',
      'REQUEST_FAILURE',
      'REQUEST_CANCELLED',
    ],
    payload: {
      request: {
        url: '/request-url',
      },
    },
  };

  describe('onSuccess', () => {
    const response = {
      data: [1, 2, 3],
      status: 200,
      config: {
        params: {
          a: 1,
        },
      },
    };

    it('should fire action with response as payload', () => {
      onSuccess({ action, next, response }).should.eql({
        type: 'REQUEST_SUCCESS',
        payload: response.data,
        statusCode: 200,
        request: {
          params: {
            a: 1,
          },
        },
      });
    });

    it('should fire cancelled action if response.cancelled is true', () => {
      const cancelledResponse = { cancelled: true };
      onSuccess({ action, next, response: cancelledResponse }).should.eql({
        type: 'REQUEST_CANCELLED',
        payload: undefined,
        statusCode: undefined,
        request: undefined,
      });
    });
  });

  describe('onError', () => {
    it('should fire action with error with response without message', function () {
      const error = {
        response: {
          status: 400,
        },
      };

      onError({ action, next, error }).should.eql({
        type: 'REQUEST_FAILURE',
        payload: {
          message: 'Request to /request-url failed with status code 400.',
        },
        statusCode: 400,
      });
    });

    it('should fire action with error object', function () {
      const message = 'Axios error message';
      const error = new Error(message);

      onError({ action, next, error }).should.eql({
        type: 'REQUEST_FAILURE',
        payload: {
          message,
        },
        statusCode: null,
      });
    });

    it('should fire action with error with message in response', function () {
      const message = 'You\'ve entered an incorrect password.';
      const error = new Error();
      error.response = {
        status: 400,
        data: { message },
      };

      onError({ action, next, error }).should.eql({
        type: 'REQUEST_FAILURE',
        payload: {
          message,
        },
        statusCode: 400,
      });
    });
  });

  it('should dispatch cancelled action when cancelling a request', function (done) {
    const mockStore = MockStore([configuredAxiosMiddleware]);
    const store = mockStore();

    const cancelSource = CancelToken.source();
    const fetchUsers = get(
      '/users',
      [
        'FETCH_USERS_START',
        'FETCH_USERS_SUCCESS',
        'FETCH_USERS_FAILURE',
        'FETCH_USERS_CANCELLED',
      ],
      cancelSource.token
    );

    store.dispatch(fetchUsers()).then(() => {
      store.getActions().map(action => action.type).should.eql(['FETCH_USERS_START', 'FETCH_USERS_CANCELLED']);
      done();
    });
    cancelSource.cancel(REQUEST_CANCEL_MESSAGE);
  });

  it('should not dispatch cancelled action when error', function (done) {
    const mockStore = MockStore([configuredAxiosMiddleware]);
    const store = mockStore();

    const cancelSource = CancelToken.source();
    const fetchUsers = get(
      '/users',
      [
        'FETCH_USERS_START',
        'FETCH_USERS_SUCCESS',
        'FETCH_USERS_FAILURE',
        'FETCH_USERS_CANCELLED',
      ],
      cancelSource.token
    );

    store.dispatch(fetchUsers()).catch(() => {
      store.getActions().map(action => action.type).should.eql(['FETCH_USERS_START', 'FETCH_USERS_FAILURE']);
      done();
    });
    cancelSource.cancel('ERROR');
  });
});
