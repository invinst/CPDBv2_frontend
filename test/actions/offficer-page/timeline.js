import should from 'should';
import { spy, stub } from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as timelineSelectors from 'selectors/officer-page/timeline';
import * as timelineActions from 'actions/officer-page/timeline';
import {
  fetchTimelineItems, flipSortOrder, selectMinimapItem, hoverMinimapItem,
  fetchTimelineItemsWhenIndexOutOfBound, hoverTimelineItem, fetchTimelineFirstItems, changeTimelineFilters
} from 'actions/officer-page/timeline';

import {
  fetchMinimap,
  selectLatestMinimapItemInYear,
  fetchMinimapThenSelectTimelineItem
} from 'actions/officer-page/timeline-minimap';

import {
  OFFICER_URL, OFFICER_TIMELINE_MINIMAP_REQUEST_START, OFFICER_TIMELINE_MINIMAP_REQUEST_SUCCESS,
  OFFICER_TIMELINE_MINIMAP_REQUEST_FAILURE, OFFICER_TIMELINE_ITEMS_REQUEST_START,
  OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS, OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE, OFFICER_TIMELINE_FLIP_SORT_ORDER,
  OFFICER_TIMELINE_SELECT_MINIMAP_ITEM, OFFICER_TIMELINE_HOVER_MINIMAP_ITEM, DO_NOTHING_ACTION,
  OFFICER_TIMELINE_HOVER_TIMELINE_ITEM, OFFICER_TIMELINE_FIRST_ITEMS_REQUEST_SUCCESS, OFFICER_TIMELINE_CHANGE_FILTERS
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

  describe('changeTimelineFilters', function () {
    it('should return the right action', function () {
      changeTimelineFilters({ a: 'a' }).should.eql({
        type: OFFICER_TIMELINE_CHANGE_FILTERS,
        payload: {
          a: 'a'
        }
      });
    });
  });

  describe('fetchTimelineFirstItems', function () {
    it('should return the right action', function () {
      fetchTimelineFirstItems(123, { a: 'a', b: 'b' }).should.eql({
        types: [OFFICER_TIMELINE_ITEMS_REQUEST_START, OFFICER_TIMELINE_FIRST_ITEMS_REQUEST_SUCCESS,
          OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE],
        payload: {
          request: {
            url: `${OFFICER_URL}123/timeline-items/`,
            params: { a: 'a', b: 'b' },
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
        const index = 40;
        const officerId = 123;
        const params = { 'sort': 'asc' };
        const dispatch = spy(action => action);
        const getState = () => ({
          officerPage: {
            timeline: {
              items: new Array(20)
            }
          }
        });
        const expectedAction = {
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
        };

        fetchTimelineItemsWhenIndexOutOfBound(index, officerId, params)(dispatch, getState)
          .should.eql(expectedAction);
        dispatch.calledWith(expectedAction).should.be.true();
      });
    });
  });

  describe('index in bound', function () {
    it('should return the right action', function () {
      const index = 10;
      const officerId = 123;
      const params = { 'sort': 'asc' };
      const dispatch = action => action;
      const getState = () => ({
        officerPage: {
          timeline: {
            items: new Array(20)
          }
        }
      });
      const expectedAction = {
        type: DO_NOTHING_ACTION,
        payload: undefined
      };

      const promise = fetchTimelineItemsWhenIndexOutOfBound(index, officerId, params)(dispatch, getState);
      return promise.should.be.fulfilledWith(expectedAction);
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

  describe('fetchMinimapThenSelectTimelineItem', function () {
    it('should call fetchMinimap then selectLatestMinimapItemInYear', function () {
      const dispatch = spy(action => Promise.resolve(action));
      const promise = fetchMinimapThenSelectTimelineItem(1, 'query', 2000)(dispatch);
      promise.should.be.fulfilledWith(selectLatestMinimapItemInYear(2000));
      dispatch.calledWith(fetchMinimap(1, 'query')).should.be.true();
    });
  });

  describe('selectLatestMinimapItemInYear', function () {
    beforeEach(function () {
      const dummyState = {
        officerPage: {
          officerId: 111,
          timeline: {
            sortDescending: true,
            filters: {}
          }
        }
      };
      this.getState = spy(() => dummyState);
      stub(timelineSelectors, 'minimapSelector')
        .withArgs(dummyState)
        .returns([
          { year: '2000', items: [{ kind: 'Joined', index: 1 }] },
          { year: '2001', items: [{ kind: 'CR', index: 3 }, { kind: 'CR', index: 4 }] }
        ]);
    });

    afterEach(function () {
      timelineSelectors.minimapSelector.restore();
    });

    it('should do nothing if year is empty', function () {
      const dispatch = spy();
      const getState = spy();
      should(selectLatestMinimapItemInYear()(dispatch, getState)).be.undefined();
      dispatch.called.should.be.false();
      getState.called.should.be.false();
    });

    it('should not dispatch anything if no matching year', function () {
      const dispatch = spy();
      should(selectLatestMinimapItemInYear('2002')(dispatch, this.getState)).be.undefined();
      dispatch.called.should.be.false();
    });

    it('should not dispatch anything if there is no CR with matching year', function () {
      const dispatch = spy();
      should(selectLatestMinimapItemInYear('2002')(dispatch, this.getState)).be.undefined();
      should(selectLatestMinimapItemInYear('2000')(dispatch, this.getState)).be.undefined();
      dispatch.called.should.be.false();
    });

  });

  describe('selectLatestMinimapItemInYear', function () {
    beforeEach(function () {
      stub(timelineActions, 'fetchTimelineItemsWhenIndexOutOfBound');
      timelineActions.fetchTimelineItemsWhenIndexOutOfBound.returns(Promise.resolve('aaa'));
    });

    afterEach(function () {
      timelineActions.fetchTimelineItemsWhenIndexOutOfBound.restore();
    });

    it('should call fetchTimelineItemsWhenIndexOutOfBound then selectMinimapItem', function (done) {
      const middlewares = [thunk];
      const mockStore = configureMockStore(middlewares);
      const store = mockStore({
        officerPage: {
          officerId: 111,
          timeline: {
            sortDescending: true,
            filters: {},

            items: [
              {
                crs: 1,
                kind: 'YEAR',
                year: 2003
              },
              {
                crid: '123',
                kind: 'CR',
                year: 2003
              },
              {
                crs: 2,
                kind: 'YEAR',
                year: 2001
              },
              {
                crid: '231',
                kind: 'CR',
                year: 2001
              },
              {
                crid: '321',
                kind: 'CR',
                year: 2001
              },
            ],
            minimap: {
              minimap: [
                { 'kind': 'CR', year: 2003 },
                { 'kind': 'CR', year: 2001 },
                { 'kind': 'CR', year: 2001 }
              ]
            }
          }
        }
      });
      store.dispatch(selectLatestMinimapItemInYear('2001')).then(() => {
        store.getActions().should.containEql({
          type: 'OFFICER_TIMELINE_SELECT_MINIMAP_ITEM',
          payload: 3
        });
        timelineActions.fetchTimelineItemsWhenIndexOutOfBound.calledWith(3, 111, {}).should.be.true();
        done();
      }).catch(done);
    });
  });
});
