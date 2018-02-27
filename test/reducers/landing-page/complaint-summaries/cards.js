import cardsReducer from 'reducers/landing-page/complaint-summaries/cards';
import * as constants from 'utils/constants';


describe('cardsReducer', function () {
  it('should return initial state', function () {
    cardsReducer(undefined, {}).should.eql([]);
  });

  it('should handle RECENT_COMPLAINT_SUMMARIES_REQUEST_SUCCESS', function () {
    cardsReducer([], {
      type: constants.RECENT_COMPLAINT_SUMMARIES_REQUEST_SUCCESS,
      payload: [1, 2, 3]
    }).should.eql([1, 2, 3]);
  });
});
