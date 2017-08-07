import {
  fetchMinimap, fetchTimelineItems, flipSortOrder, selectMinimapItem, hoverMinimapItem,
  fetchTimelineItemsWhenIndexOutOfBound, hoverTimelineItem
} from 'actions/officer-page/timeline';

import {
  OFFICER_URL, OFFICER_TIMELINE_MINIMAP_REQUEST_START, OFFICER_TIMELINE_MINIMAP_REQUEST_SUCCESS,
  OFFICER_TIMELINE_MINIMAP_REQUEST_FAILURE, OFFICER_TIMELINE_ITEMS_REQUEST_START,
  OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS, OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE, OFFICER_TIMELINE_FLIP_SORT_ORDER,
  OFFICER_TIMELINE_SELECT_MINIMAP_ITEM, OFFICER_TIMELINE_HOVER_MINIMAP_ITEM, DO_NOTHING_ACTION,
  OFFICER_TIMELINE_HOVER_TIMELINE_ITEM
} from 'utils/constants';

describe('officer timeline actions', function () {
  describe('fetchMinimap', function () {
    it('should return the right action', function () {
      fetchMinimap(123).should.eql({
        types: [OFFICER_TIMELINE_MINIMAP_REQUEST_START, OFFICER_TIMELINE_MINIMAP_REQUEST_SUCCESS,
          OFFICER_TIMELINE_MINIMAP_REQUEST_FAILURE],
        payload: {
          request: {
            url: `${OFFICER_URL}123/timeline-minimap/`,
            params: undefined,
            adapter: null
          }
        }
      });
    });
  });

  describe('fetchTimelineItems', function () {
    it('should return the right action', function () {
      fetchTimelineItems(123, { a: 'a' }).should.eql({
        types: [OFFICER_TIMELINE_ITEMS_REQUEST_START, OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS,
          OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE],
        payload: {
          request: {
            url: `${OFFICER_URL}123/timeline-items/`,
            params: { a: 'a' },
            adapter: null
          }
        }
      });
    });
  });

  describe('flipSortOrder', function () {
    it('should return the right action', function () {
      flipSortOrder().should.eql({
        type: OFFICER_TIMELINE_FLIP_SORT_ORDER,
        payload: undefined
      });
    });
  });

  describe('selectMinimapItem', function () {
    it('should return the right action', function () {
      selectMinimapItem(1).should.eql({
        type: OFFICER_TIMELINE_SELECT_MINIMAP_ITEM,
        payload: 1
      });
    });
  });

  describe('hoverMinimapItem', function () {
    it('should return the right action', function () {
      hoverMinimapItem(1).should.eql({
        type: OFFICER_TIMELINE_HOVER_MINIMAP_ITEM,
        payload: 1
      });
    });
  });

  describe('fetchTimelineItemsWhenIndexOutOfBound', function () {
    describe('index out of bound', function () {
      it('should return the right action', function () {
        const itemsLength = 20;
        const index = 40;
        const officerId = 123;
        const params = { 'sort': 'asc' };
        fetchTimelineItemsWhenIndexOutOfBound(itemsLength, index, officerId, params).should.eql({
          types: [OFFICER_TIMELINE_ITEMS_REQUEST_START, OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS,
            OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE],
          payload: {
            request: {
              url: `${OFFICER_URL}123/timeline-items/`,
              params: {
                'sort': 'asc',
                'limit': 20,
                'offset': 20
              },
              adapter: null
            }
          }
        });
      });
    });
  });

  describe('index in bound', function () {
    it('should return the right action', function () {
      const itemsLength = 20;
      const index = 10;
      const officerId = 123;
      const params = { 'sort': 'asc' };
      fetchTimelineItemsWhenIndexOutOfBound(itemsLength, index, officerId, params).should.eql({
        type: DO_NOTHING_ACTION,
        payload: undefined
      });
    });
  });

  describe('hoverTimelineItem', function () {
    it('should return the right action', function () {
      hoverTimelineItem(1).should.eql({
        type: OFFICER_TIMELINE_HOVER_TIMELINE_ITEM,
        payload: 1
      });
    });
  });
});
