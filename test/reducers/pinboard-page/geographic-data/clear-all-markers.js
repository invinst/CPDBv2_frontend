import clearAllMarkers from 'reducers/pinboard-page/geographic-data/clear-all-markers';
import {
  PINBOARD_GEOGRAPHIC_FETCH_REQUEST_START,
  FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS,
  FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS,
} from 'utils/constants';


describe('clearAllMarkers reducer', function () {
  it('should have initial state', function () {
    clearAllMarkers(undefined, {}).should.be.false();
  });

  it('should handle PINBOARD_GEOGRAPHIC_FETCH_REQUEST_START', function () {
    clearAllMarkers(false, {
      type: PINBOARD_GEOGRAPHIC_FETCH_REQUEST_START,
    }).should.be.true();
  });

  it('should handle FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS', function () {
    clearAllMarkers(true, {
      type: FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS,
    }).should.be.false();
  });

  it('should handle FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS', function () {
    clearAllMarkers(true, {
      type: FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS,
    }).should.be.false();
  });
});
