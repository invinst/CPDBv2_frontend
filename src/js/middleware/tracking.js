import { reduce, values } from 'lodash';
import { CHANGE_SEARCH_QUERY, SUGGESTION_REQUEST_SUCCESS, SUGGESTION_SINGLE_REQUEST_SUCCESS } from 'utils/constants';
import * as GATracking from 'utils/google_analytics_tracking';


const EVENTS = {
  '@@router/LOCATION_CHANGE': (store, action) => {
    GATracking.trackPageView(action.payload.pathname);
  },

  [CHANGE_SEARCH_QUERY]: (store, action) => {
    GATracking.trackSearchQuery(action.payload);
  },

  [SUGGESTION_SINGLE_REQUEST_SUCCESS]: (store, action) => {
    const { contentType, term } = action.request.params;
    GATracking.trackSearchResultsCount(action.payload.count);
    GATracking.trackSingleSearchResults(contentType, term, action.payload.results.length);
  },

  [SUGGESTION_REQUEST_SUCCESS]: (store, action) => {
    const count = reduce(values(action.payload), (sum, array) => sum + array.length, 0);
    GATracking.trackSearchResultsCount(count);
  },
};


export default store => next => action => {
  if (EVENTS.hasOwnProperty(action.type)) {
    EVENTS[action.type](store, action);
  }

  return next(action);
};
