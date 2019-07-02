import should from 'should';

import crid from 'reducers/social-graph-page/geographic-data/crid';
import { UPDATE_GEOGRAPHIC_CRID } from 'utils/constants';


describe('crid reducer', function () {
  it('should return initial state', function () {
    should(crid(undefined, {})).be.null();
  });

  it('should handle UPDATE_GEOGRAPHIC_CRID', function () {
    crid([], {
      type: UPDATE_GEOGRAPHIC_CRID,
      payload: 123
    }).should.eql(123);
  });
});

