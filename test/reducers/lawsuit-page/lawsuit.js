import lawsuitReducer from 'reducers/lawsuit-page/lawsuit';
import * as constants from 'utils/constants';


describe('lawsuitReducer', function () {
  it('should return initial state', function () {
    lawsuitReducer(undefined, {}).should.eql({});
  });

  it('should handle LAWSUIT_FETCH_SUCCESS', function () {
    lawsuitReducer({}, {
      type: constants.LAWSUIT_FETCH_SUCCESS,
      payload: { data: 'data' },
    }).should.eql({ data: 'data' });
  });
});
