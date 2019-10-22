import should from 'should';

import initialRequestedReducer from 'reducers/pinboard-page/initial-requested';
import {
  PINBOARD_FETCH_REQUEST_START,
  PINBOARD_FETCH_REQUEST_SUCCESS,
  PINBOARD_FETCH_REQUEST_FAILURE,
  PINBOARD_CREATE_REQUEST_START,
  PINBOARD_CREATE_REQUEST_SUCCESS,
  PINBOARD_CREATE_REQUEST_FAILURE,
} from 'utils/constants';


describe('initialRequestedReducer', function () {
  it('should have initial state', function () {
    should(initialRequestedReducer(undefined, {})).be.false();
  });

  it('should handle PINBOARD_FETCH_REQUEST_START', function () {
    initialRequestedReducer(
      false,
      { type: PINBOARD_FETCH_REQUEST_START }
    ).should.be.false();
  });

  it('should handle PINBOARD_FETCH_REQUEST_SUCCESS', function () {
    initialRequestedReducer(
      true,
      { type: PINBOARD_FETCH_REQUEST_SUCCESS }
    ).should.be.true();
  });

  it('should handle PINBOARD_FETCH_REQUEST_FAILURE', function () {
    initialRequestedReducer(
      true,
      { type: PINBOARD_FETCH_REQUEST_FAILURE }
    ).should.be.true();
  });

  it('should handle PINBOARD_CREATE_REQUEST_START', function () {
    initialRequestedReducer(
      false,
      { type: PINBOARD_CREATE_REQUEST_START }
    ).should.be.false();
  });

  it('should handle PINBOARD_CREATE_REQUEST_SUCCESS', function () {
    initialRequestedReducer(
      true,
      { type: PINBOARD_CREATE_REQUEST_SUCCESS }
    ).should.be.true();
  });

  it('should handle PINBOARD_CREATE_REQUEST_FAILURE', function () {
    initialRequestedReducer(
      true,
      { type: PINBOARD_CREATE_REQUEST_FAILURE }
    ).should.be.true();
  });
});
