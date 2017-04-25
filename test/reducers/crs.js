import crs from 'reducers/crs';

import { CR_REQUEST_SUCCESS } from 'utils/constants';


describe('crs', function () {
  it('should return initial state', function () {
    crs(undefined, {}).should.eql({});
  });

  it('should handle CR_REQUEST_SUCCESS', function () {
    const prevState = { '1': { crid: 1 } };
    const action = { type: CR_REQUEST_SUCCESS, payload: { crid: 2 } };
    crs(prevState, action).should.eql({ '1': { crid: 1 }, '2': { crid: 2 } });
  });
});
