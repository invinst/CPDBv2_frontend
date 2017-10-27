import selectedItemIndex from 'reducers/officer-page/timeline/selected-item-index';
import should from 'should';

import {
  OFFICER_TIMELINE_SELECT_MINIMAP_ITEM, OFFICER_TIMELINE_SELECT_TIMELINE_ITEM, OFFICER_TIMELINE_FLIP_SORT_ORDER,
  CHANGE_OFFICER_ID, OFFICER_TIMELINE_CLEAR_SELECTED_ITEM_INDEX
} from 'utils/constants';


describe('selectedItemIndex reducer', function () {
  it('should have initial state', function () {
    should.not.exists(selectedItemIndex(undefined, {}));
  });

  it('should handle OFFICER_TIMELINE_SELECT_MINIMAP_ITEM', function () {
    selectedItemIndex(null, {
      type: OFFICER_TIMELINE_SELECT_MINIMAP_ITEM,
      payload: 1
    }).should.eql(1);
  });

  it('should handle OFFICER_TIMELINE_SELECT_TIMELINE_ITEM', function () {
    selectedItemIndex(null, {
      type: OFFICER_TIMELINE_SELECT_TIMELINE_ITEM,
      payload: 1
    }).should.eql(1);
  });

  it('should handle OFFICER_TIMELINE_FLIP_SORT_ORDER', function () {
    should.not.exists(selectedItemIndex(1, { type: OFFICER_TIMELINE_FLIP_SORT_ORDER }));
  });

  it('should handle CHANGE_OFFICER_ID', function () {
    should.not.exists(selectedItemIndex(1, { type: CHANGE_OFFICER_ID }));
  });

  it('should handle OFFICER_TIMELINE_CLEAR_SELECTED_ITEM_INDEX', function () {
    should.not.exists(selectedItemIndex(1, { type: OFFICER_TIMELINE_CLEAR_SELECTED_ITEM_INDEX }));
  });
});
