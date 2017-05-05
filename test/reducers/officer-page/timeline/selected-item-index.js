import selectedItemIndex from 'reducers/officer-page/timeline/selected-item-index';
import should from 'should';

import { OFFICER_TIMELINE_SELECT_MINIMAP_ITEM } from 'utils/constants';


describe('selectedItemIndex reducer', function () {
  it('should have initial state', function () {
    should.not.exists(selectedItemIndex(undefined, {}));
  });

  it('should handle OFFICER_TIMELINE_SELECT_MINIMAP_ITEM', function () {
    selectedItemIndex(null, {
      type: OFFICER_TIMELINE_SELECT_MINIMAP_ITEM,
      payload: { index: 1 }
    }).should.eql(1);
  });
});
