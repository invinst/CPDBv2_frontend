import hoveredItemIndex from 'reducers/officer-page/timeline/hovered-item-index';
import should from 'should';

import { OFFICER_TIMELINE_HOVER_MINIMAP_ITEM, OFFICER_TIMELINE_SELECT_MINIMAP_ITEM } from 'utils/constants';


describe('hoveredItemIndex reducer', function () {
  it('should have initial state', function () {
    should.not.exists(hoveredItemIndex(undefined, {}));
  });

  it('should handle OFFICER_TIMELINE_HOVER_MINIMAP_ITEM', function () {
    hoveredItemIndex(undefined, {
      type: OFFICER_TIMELINE_HOVER_MINIMAP_ITEM,
      payload: { 'index': 3 }
    }).should.eql(3);
  });

  it('should handle OFFICER_TIMELINE_SELECT_MINIMAP_ITEM', function () {
    hoveredItemIndex(undefined, {
      type: OFFICER_TIMELINE_SELECT_MINIMAP_ITEM,
      payload: { 'index': 4 }
    }).should.eql(4);
  });

  it('should handle @@router/LOCATION_CHANGE', function () {
    should.not.exists(hoveredItemIndex(1, { type: '@@router/LOCATION_CHANGE' }));
  });
});
