import items from 'reducers/officer-page/coaccusals/items';
import { CHANGE_OFFICER_ID, OFFICER_COACCUSALS_REQUEST_SUCCESS } from 'utils/constants';


describe('items reducer', function () {
  it('should have initial state', function () {
    items(undefined, {}).should.eql([]);
  });

  it('should handle OFFICER_COACCUSALS_REQUEST_SUCCESS', function () {
    items([1, 2], {
      type: OFFICER_COACCUSALS_REQUEST_SUCCESS,
      payload: {
        id: 1,
        coaccusals: [3, 4, 5]
      },
    }).should.eql([3, 4, 5]);
  });

  it('should handle CHANGE_OFFICER_ID', function () {
    items([1, 2, 3], {
      type: CHANGE_OFFICER_ID
    }).should.eql([]);
  });
});
