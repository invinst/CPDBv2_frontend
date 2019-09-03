import should from 'should';

import mapTrrsDataTotalCount from 'reducers/social-graph-page/geographic-data/map-trrs-data-total-count';
import { FIRST_PAGE_GEOGRAPHIC_TRRS_REQUEST_SUCCESS } from 'utils/constants';


describe('mapTrrsDataTotalCount reducer', function () {
  it('should have initial state', function () {
    should(mapTrrsDataTotalCount(undefined, {})).be.null();
  });

  it('should handle FIRST_PAGE_GEOGRAPHIC_CRS_REQUEST_SUCCESS', function () {
    mapTrrsDataTotalCount([], {
      type: FIRST_PAGE_GEOGRAPHIC_TRRS_REQUEST_SUCCESS,
      payload: {
        results: [
          {
            'date': '2007-04-25',
            'trr_id': '123456',
            'category': 'Use Of Force',
            'kind': 'TRR',
            'point': {
              'lon': -87,
              'lat': 35,
            },
          },
        ],
        count: 5,
      },
    }).should.eql(5);
  });
});
