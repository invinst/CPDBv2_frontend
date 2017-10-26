import items from 'reducers/officer-page/timeline/items';

import {
  OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS, OFFICER_TIMELINE_FIRST_ITEMS_REQUEST_SUCCESS, CHANGE_OFFICER_ID
} from 'utils/constants';


describe('items reducer', function () {
  it('should have initial state', function () {
    items(undefined, {}).should.eql([]);
  });

  it('should handle OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS', function () {
    items([1, 2], {
      type: OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS,
      payload: { results: [3, 4, 5] }
    }).should.eql([1, 2, 3, 4, 5]);
  });

  it('should handle OFFICER_TIMELINE_FIRST_ITEMS_REQUEST_SUCCESS', function () {
    items([1, 2], {
      type: OFFICER_TIMELINE_FIRST_ITEMS_REQUEST_SUCCESS,
      payload: { results: [11, 12, 13] }
    }).should.eql([11, 12, 13]);
  });

  it('should handle CHANGE_OFFICER_ID', function () {
    items([1, 2, 3], {
      type: CHANGE_OFFICER_ID
    }).should.eql([]);
  });
});
