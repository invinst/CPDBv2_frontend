import isTrrsRequested from 'reducers/social-graph-page/geographic-data/is-trrs-requested';
import { FIRST_PAGE_GEOGRAPHIC_TRRS_REQUEST_SUCCESS, LOCATION_CHANGE } from 'utils/constants';


describe('isTrrsRequested reducer', function () {
  it('should have initial state', function () {
    isTrrsRequested(undefined, {}).should.be.false();
  });

  it('should handle FIRST_PAGE_GEOGRAPHIC_TRRS_REQUEST_SUCCESS', function () {
    isTrrsRequested(false, {
      type: FIRST_PAGE_GEOGRAPHIC_TRRS_REQUEST_SUCCESS,
    }).should.be.true();
  });

  it('should handle LOCATION_CHANGE', function () {
    isTrrsRequested(true, {
      type: LOCATION_CHANGE,
    }).should.be.false();
  });
});
