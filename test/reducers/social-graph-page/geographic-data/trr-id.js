import should from 'should';

import trrId from 'reducers/social-graph-page/geographic-data/trr-id';
import { UPDATE_GEOGRAPHIC_TRR_ID } from 'utils/constants';


describe('trrId reducer', function () {
  it('should return initial state', function () {
    should(trrId(undefined, {})).be.null();
  });

  it('should handle UPDATE_GEOGRAPHIC_TRR_ID', function () {
    trrId([], {
      type: UPDATE_GEOGRAPHIC_TRR_ID,
      payload: 123
    }).should.eql(123);
  });
});

