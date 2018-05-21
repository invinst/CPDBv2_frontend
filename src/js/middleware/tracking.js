import { reduce, values } from 'lodash';
import { CHANGE_SEARCH_QUERY, SUGGESTION_REQUEST_SUCCESS, SUGGESTION_SINGLE_REQUEST_SUCCESS } from 'utils/constants';
import { throttledGA } from 'utils/tracking';


const EVENTS = {
  '@@router/LOCATION_CHANGE': (store, action) => {
    global.ga('send', 'pageview', { page: action.payload.pathname });
  },

  [CHANGE_SEARCH_QUERY]: (store, action) => {
    throttledGA('send', 'event', {
      eventCategory: 'search',
      eventAction: 'change_query',
      eventLabel: action.payload
    });
  },

  [SUGGESTION_SINGLE_REQUEST_SUCCESS]: (store, action) => {
    global.ga('send', 'event', {
      eventCategory: 'search',
      eventAction: 'num_results',
      eventValue: action.payload.count
    });
  },

  [SUGGESTION_REQUEST_SUCCESS]: (store, action) => {
    const count = reduce(values(action.payload), (sum, array) => sum + array.length, 0);
    global.ga('send', 'event', {
      eventCategory: 'search',
      eventAction: 'num_results',
      eventValue: count
    });
  }
};


export default store => next => action => {
  if (EVENTS.hasOwnProperty(action.type)) {
    EVENTS[action.type](store, action);
  }

  return next(action);
};
