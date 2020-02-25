import { LOCATION_CHANGE } from 'connected-react-router';

import isCrsRequested from 'reducers/social-graph-page/geographic-data/is-crs-requested';
import { FIRST_PAGE_GEOGRAPHIC_CRS_REQUEST_SUCCESS } from 'utils/constants';


describe('isCrsRequested reducer', function () {
  it('should have initial state', function () {
    isCrsRequested(undefined, {}).should.be.false();
  });

  it('should handle FIRST_PAGE_GEOGRAPHIC_CRS_REQUEST_SUCCESS', function () {
    isCrsRequested(false, {
      type: FIRST_PAGE_GEOGRAPHIC_CRS_REQUEST_SUCCESS,
    }).should.be.true();
  });

  it('should handle LOCATION_CHANGE', function () {
    isCrsRequested(true, {
      type: LOCATION_CHANGE,
    }).should.be.false();
  });
});
