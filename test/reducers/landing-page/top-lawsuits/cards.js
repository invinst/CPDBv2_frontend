import cardsReducer from 'reducers/landing-page/top-lawsuits/cards';
import { TOP_LAWSUITS_REQUEST_SUCCESS } from 'utils/constants';


describe('cardsReducer', function () {
  it('should return initial state', function () {
    cardsReducer(undefined, {}).should.eql([]);
  });

  it('should handle TOP_LAWSUITS_REQUEST_SUCCESS', function () {
    cardsReducer([], {
      type: TOP_LAWSUITS_REQUEST_SUCCESS,
      payload: [1, 2, 3],
    }).should.eql([1, 2, 3]);
  });
});
