import browserHistory from 'utils/history';
import {
  PINBOARD_FETCH_REQUEST_SUCCESS,
  PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS,
  PINBOARD_CREATE_REQUEST_SUCCESS,
  PINBOARD_UPDATE_FROM_SOURCE_REQUEST_SUCCESS,
  PINBOARD_UPDATE_REQUEST_SUCCESS,
} from 'utils/constants';
import {
  dispatchFetchPinboardPinnedItems,
  dispatchFetchPinboardPageData,
  generatePinboardUrl,
} from 'utils/pinboard';
import { updatePathName } from 'actions/path-name';
import { DEFAULT_PINBOARD_PATH } from 'utils/constants';
import { getPinboardID } from 'utils/location';


const pinboardPageUrlPattern = /^\/pinboard\/([a-fA-F0-9]+)\/.*/;

function getPinboardData(store, pinboardId) {
  dispatchFetchPinboardPinnedItems(store, pinboardId);
  dispatchFetchPinboardPageData(store, pinboardId);
}

function onPinboardPage(pathname) {
  return pathname.match(pinboardPageUrlPattern) || pathname === DEFAULT_PINBOARD_PATH;
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

    if (onPinboardPage(pathname)) {
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
