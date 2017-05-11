import sortDescending from 'reducers/officer-page/timeline/sort-descending';

import { OFFICER_TIMELINE_FLIP_SORT_ORDER } from 'utils/constants';


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

  it('should handle @@router/LOCATION_CHANGE', function () {
    sortDescending(false, {
      type: '@@router/LOCATION_CHANGE'
    }).should.eql(true);

    sortDescending(true, {
      type: '@@router/LOCATION_CHANGE'
    }).should.eql(true);
  });
});
