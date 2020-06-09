import browserHistory from 'utils/history';
import {
  PINBOARD_FETCH_REQUEST_SUCCESS,
  PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS,
  PINBOARD_CREATE_REQUEST_SUCCESS,
  PINBOARD_UPDATE_FROM_SOURCE_REQUEST_SUCCESS,
  PINBOARD_UPDATE_REQUEST_SUCCESS,
  DEFAULT_PINBOARD_PATH,
} from 'utils/constants';
import {
  dispatchFetchPinboardPinnedItems,
  dispatchFetchPinboardPageData,
  generatePinboardUrl,
} from 'utils/pinboard';
import { updatePathName } from 'actions/path-name';
import { onPinboardPage } from 'utils/paths';
import { getPinboardID } from 'utils/location';


function getPinboardData(store, pinboardId) {
  dispatchFetchPinboardPinnedItems(store, pinboardId);
  dispatchFetchPinboardPageData(store, pinboardId);
}

export default store => next => action => {
  const result = next(action);

  if (
    action.type === PINBOARD_FETCH_REQUEST_SUCCESS ||
    action.type === PINBOARD_CREATE_REQUEST_SUCCESS ||
    action.type === PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS ||
    action.type === PINBOARD_UPDATE_FROM_SOURCE_REQUEST_SUCCESS
  ) {
    const pathname = browserHistory.location.pathname;
    const idOnPath = getPinboardID(pathname);

    if (onPinboardPage(pathname) || pathname === DEFAULT_PINBOARD_PATH) {
      const rawPinboard = action.payload;
      const newPinboardId = rawPinboard.id;
      if (newPinboardId) {
        const newPinboardPathName = generatePinboardUrl(rawPinboard);

        if (idOnPath !== newPinboardId) {
          browserHistory.replace(newPinboardPathName);
        } else {
          if (pathname !== newPinboardPathName) {
            store.dispatch(updatePathName(newPinboardPathName));
          }
          getPinboardData(store, newPinboardId);
        }
      }
    }
  }

  if (action.type === PINBOARD_UPDATE_REQUEST_SUCCESS) {
    const pathname = browserHistory.location.pathname;

    if (onPinboardPage(pathname)) {
      const newPinboardPathName = generatePinboardUrl(action.payload);
      if (pathname !== newPinboardPathName) {
        store.dispatch(updatePathName(newPinboardPathName));
      }
    }
  }

  return result;
};
