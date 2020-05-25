import { LOCATION_CHANGE } from 'connected-react-router';
import { includes } from 'lodash';

import {
  PINBOARD_FETCH_REQUEST_SUCCESS,
  PINBOARD_CREATE_REQUEST_SUCCESS,
} from 'utils/constants';
import { onPinboardPage, onOfficerPage, onCrPage } from 'utils/paths';
import { fetchPinboards } from 'actions/pinboard-page';
import browserHistory from 'utils/history';


const FETCH_DETAIL_PINBOARDS_ACTIONS = [
  PINBOARD_FETCH_REQUEST_SUCCESS,
  PINBOARD_CREATE_REQUEST_SUCCESS,
  LOCATION_CHANGE,
];

const fetchPinboardsMiddleware = store => next => action => {
  const result = next(action);
  const pathname = browserHistory.location.pathname;
  if (action.type === LOCATION_CHANGE && onPinboardPage(pathname)) {
    store.dispatch(fetchPinboards());
  }

  if (includes(FETCH_DETAIL_PINBOARDS_ACTIONS, action.type) && (onOfficerPage(pathname) || onCrPage(pathname))) {
    store.dispatch(fetchPinboards({ detail: true }));
  }

  return result;
};

export default fetchPinboardsMiddleware;
