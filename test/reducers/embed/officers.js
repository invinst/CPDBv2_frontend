import officersReducer from 'reducers/embed/officers';
import * as constants from 'utils/constants';


describe('officersReducer', function () {
  it('should return initial state', function () {
    officersReducer(undefined, {}).should.eql([]);
  });

  it('should handle EMBED_OFFICERS_REQUEST_SUCCESS', function () {
    officersReducer([], {
      type: constants.EMBED_OFFICERS_REQUEST_SUCCESS,
      payload: [1, 2, 3],
    }).should.eql([1, 2, 3]);
  });
});
