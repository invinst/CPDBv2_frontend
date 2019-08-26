import should from 'should';

import mapCrsDataTotalCount from 'reducers/pinboard-page/geographic-data/map-crs-data-total-count';
import { FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS } from 'utils/constants';


describe('mapCrsDataTotalCount reducer', function () {
  it('should have initial state', function () {
    should(mapCrsDataTotalCount(undefined, {})).be.null();
  });

  it('should handle FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS', function () {
    mapCrsDataTotalCount([], {
      type: FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS,
      payload: {
        results: [
          {
            'date': '2007-04-25',
            'crid': '123456',
            'category': 'Award',
            'kind': 'CR',
            'point': {
              'lon': -87,
              'lat': 35,
            },
          },
        ],
        count: 10,
      },
    }).should.eql(10);
  });
});
