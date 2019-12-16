import should from 'should';

import requestingReducer from 'reducers/pinboard-page/geographic-data/trrs-requesting';
import {
  FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_START,
  FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS,
  FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_FAILURE,
} from 'utils/constants';


describe('requestingReducer', function () {
  it('should have initial state', function () {
    should(requestingReducer(undefined, {})).be.false();
  });

  it('should handle FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_START', function () {
    requestingReducer(
      false,
      { type: FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_START }
    ).should.be.true();
  });

  it('should handle FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS', function () {
    requestingReducer(
      true,
      { type: FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS }
    ).should.be.false();
  });

  it('should handle FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_FAILURE', function () {
    requestingReducer(
      true,
      { type: FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_FAILURE }
    ).should.be.false();
  });
});
