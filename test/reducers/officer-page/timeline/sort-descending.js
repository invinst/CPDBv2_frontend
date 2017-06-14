import sortDescending from 'reducers/officer-page/timeline/sort-descending';

import { OFFICER_TIMELINE_FLIP_SORT_ORDER, CHANGE_OFFICER_ID } from 'utils/constants';


describe('sortDescending reducer', function () {
  it('should have initial state', function () {
    sortDescending(undefined, {}).should.eql(true);
  });

  it('should handle OFFICER_TIMELINE_FLIP_SORT_ORDER', function () {
    sortDescending(true, {
      type: OFFICER_TIMELINE_FLIP_SORT_ORDER
    }).should.eql(false);
    sortDescending(false, {
      type: OFFICER_TIMELINE_FLIP_SORT_ORDER
    }).should.eql(true);
  });

  it('should handle CHANGE_OFFICER_ID', function () {
    sortDescending(false, {
      type: CHANGE_OFFICER_ID
    }).should.eql(true);
  });
});
