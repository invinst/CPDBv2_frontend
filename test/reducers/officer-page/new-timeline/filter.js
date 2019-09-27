import filter from 'reducers/officer-page/new-timeline/filter';
import { CHANGE_OFFICER_ID, NEW_TIMELINE_ITEMS, OFFICER_NEW_TIMELINE_ITEMS_CHANGE_FILTER } from 'utils/constants';


describe('filter reducer', function () {
  it('should have initial state', function () {
    filter(undefined, {}).should.eql({
      label: 'All',
      kind: ['CR', 'FORCE', 'AWARD'],
    });
  });

  it('should handle OFFICER_NEW_TIMELINE_ITEMS_CHANGE_FILTER', function () {
    filter({
      label: 'All',
      kind: ['CR', 'FORCE', 'AWARD'],
    }, {
      type: OFFICER_NEW_TIMELINE_ITEMS_CHANGE_FILTER,
      payload: {
        label: 'COMPLAINTS',
        kind: [NEW_TIMELINE_ITEMS.CR],
      },
    }).should.eql({
      label: 'COMPLAINTS',
      kind: [NEW_TIMELINE_ITEMS.CR],
    });
  });

  it('should handle CHANGE_OFFICER_ID', function () {
    filter({
      label: 'COMPLAINTS',
      kind: [NEW_TIMELINE_ITEMS.CR],
    }, {
      type: CHANGE_OFFICER_ID,
    }).should.eql({
      label: 'All',
      kind: ['CR', 'FORCE', 'AWARD'],
    });
  });
});
