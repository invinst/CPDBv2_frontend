import items from 'reducers/officer-page/new-timeline/filter';
import { OFFICER_NEW_TIMELINE_ITEMS_CHANGE_FILTER } from 'utils/constants';


describe('filter reducer', function () {
  it('should have initial state', function () {
    items(undefined, {}).should.eql('ALL');
  });

  it('should handle OFFICER_NEW_TIMELINE_ITEMS_CHANGE_FILTER', function () {
    items('ALL', {
      type: OFFICER_NEW_TIMELINE_ITEMS_CHANGE_FILTER,
      payload: 'COMPLAINTS'
    }).should.eql('COMPLAINTS');
  });
});
