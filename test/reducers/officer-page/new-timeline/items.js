import items from 'reducers/officer-page/new-timeline/items';
import {
  OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS,
  CHANGE_OFFICER_ID,
} from 'utils/constants';


describe('items reducer', function () {
  it('should have initial state', function () {
    items(undefined, {}).should.eql([]);
  });

  it('should handle OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS', function () {
    items([1, 2], {
      type: OFFICER_NEW_TIMELINE_ITEMS_REQUEST_SUCCESS,
      payload: [3, 4, 5],
    }).should.eql([3, 4, 5]);
  });

  it('should handle CHANGE_OFFICER_ID', function () {
    items([1, 2, 3], {
      type: CHANGE_OFFICER_ID,
    }).should.eql([]);
  });
});
