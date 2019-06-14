import should from 'should';

import requestingReducer from 'reducers/pinboard-page/geographic-data/requesting';
import {
  PINBOARD_GEOGRAPHIC_DATA_FETCH_REQUEST_START,
  PINBOARD_GEOGRAPHIC_DATA_FETCH_REQUEST_SUCCESS,
  PINBOARD_GEOGRAPHIC_DATA_FETCH_REQUEST_FAILURE,
} from 'utils/constants';


describe('requestingReducer', function () {
  it('should have initial state', function () {
    should(requestingReducer(undefined, {})).be.false();
  });

  it('should handle PINBOARD_GEOGRAPHIC_DATA_FETCH_REQUEST_START', function () {
    requestingReducer(
      false,
      { type: PINBOARD_GEOGRAPHIC_DATA_FETCH_REQUEST_START }
    ).should.be.true();
  });

  it('should handle PINBOARD_GEOGRAPHIC_DATA_FETCH_REQUEST_SUCCESS', function () {
    requestingReducer(
      true,
      { type: PINBOARD_GEOGRAPHIC_DATA_FETCH_REQUEST_SUCCESS }
    ).should.be.false();
  });

  it('should handle PINBOARD_GEOGRAPHIC_DATA_FETCH_REQUEST_FAILURE', function () {
    requestingReducer(
      true,
      { type: PINBOARD_GEOGRAPHIC_DATA_FETCH_REQUEST_FAILURE }
    ).should.be.false();
  });
});
