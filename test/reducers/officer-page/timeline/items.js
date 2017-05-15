import items from 'reducers/officer-page/timeline/items';

import { OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS, OFFICER_TIMELINE_FLIP_SORT_ORDER } from 'utils/constants';


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

  it('should handle OFFICER_TIMELINE_FLIP_SORT_ORDER', function () {
    items([1, 2, 3], {
      type: OFFICER_TIMELINE_FLIP_SORT_ORDER
    }).should.eql([]);
  });

  it('should handle @@router/LOCATION_CHANGE', function () {
    items([1, 2, 3], {
      type: '@@router/LOCATION_CHANGE',
      payload: { pathname: '/officer/1234/timeline/' }
    }).should.eql([]);
  });
});
