import should from 'should';

import requestingReducer from 'reducers/pinboard-page/trr-items/requesting';
import {
  PINBOARD_TRRS_FETCH_REQUEST_START,
  PINBOARD_TRRS_FETCH_REQUEST_SUCCESS,
  PINBOARD_TRRS_FETCH_REQUEST_FAILURE,
} from 'utils/constants';


describe('requestingReducer', function () {
  it('should have initial state', function () {
    should(requestingReducer(undefined, {})).be.false();
  });

  it('should handle PINBOARD_TRRS_FETCH_REQUEST_START', function () {
    requestingReducer(
      false,
      { type: PINBOARD_TRRS_FETCH_REQUEST_START }
    ).should.be.true();
  });

  it('should handle PINBOARD_TRRS_FETCH_REQUEST_SUCCESS', function () {
    requestingReducer(
      true,
      { type: PINBOARD_TRRS_FETCH_REQUEST_SUCCESS }
    ).should.be.false();
  });

  it('should handle PINBOARD_TRRS_FETCH_REQUEST_FAILURE', function () {
    requestingReducer(
      true,
      { type: PINBOARD_TRRS_FETCH_REQUEST_FAILURE }
    ).should.be.false();
  });
});
