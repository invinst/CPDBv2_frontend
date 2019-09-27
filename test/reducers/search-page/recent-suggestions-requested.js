import {
  FETCH_RECENT_SEARCH_ITEMS_START,
  FETCH_RECENT_SEARCH_ITEMS_SUCCESS,
  FETCHED_EMPTY_RECENT_SEARCH_ITEMS,
} from 'utils/constants';

import recentSuggestionsRequested from 'reducers/search-page/recent-suggestions-requested';


describe('recentSuggestionsRequested reducer', function () {
  it('should have initial state', function () {
    recentSuggestionsRequested(undefined, {}).should.be.false();
  });

  it('should handle FETCH_RECENT_SEARCH_ITEMS_START', function () {
    recentSuggestionsRequested(true, {
      type: FETCH_RECENT_SEARCH_ITEMS_START,
      payload: {},
    }).should.be.false();
  });

  it('should handle FETCH_RECENT_SEARCH_ITEMS_SUCCESS', function () {
    recentSuggestionsRequested(false, {
      type: FETCH_RECENT_SEARCH_ITEMS_SUCCESS,
      payload: {},
    }).should.be.true();
  });

  it('should handle FETCHED_EMPTY_RECENT_SEARCH_ITEMS', function () {
    recentSuggestionsRequested(false, {
      type: FETCHED_EMPTY_RECENT_SEARCH_ITEMS,
      payload: {},
    }).should.be.true();
  });
});
