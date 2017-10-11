import filters from 'reducers/officer-page/timeline/filters';

import {
  OFFICER_TIMELINE_CHANGE_FILTERS
} from 'utils/constants';


describe('filters reducer', function () {
  it('should have initial state', function () {
    filters(undefined, {}).should.eql({});
  });

  it('should handle OFFICER_TIMELINE_CHANGE_FILTERS', function () {
    filters({}, {
      type: OFFICER_TIMELINE_CHANGE_FILTERS,
      payload: { category: 'Use of Force', age: '51+', race: 'White', gender: 'F' }
    }).should.eql({ category: 'Use of Force', age: '51+', race: 'White', gender: 'F' });
  });

  it('should skip un-allowed filters', function () {
    filters({}, {
      type: OFFICER_TIMELINE_CHANGE_FILTERS,
      payload: { category: 'Use of Force', notValid: 'XXX' }
    }).should.eql({ category: 'Use of Force' });
  });
});
