import browserHistory from 'utils/history';
import {
  PINBOARD_FETCH_REQUEST_SUCCESS,
  PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS,
  PINBOARD_CREATE_REQUEST_SUCCESS,
  PINBOARD_UPDATE_FROM_SOURCE_REQUEST_SUCCESS,
  PINBOARD_UPDATE_REQUEST_SUCCESS,
  REMOVE_PINBOARD_REQUEST_SUCCESS,
  DEFAULT_PINBOARD_PATH,
} from 'utils/constants';
import {
  dispatchFetchPinboardPinnedItems,
  dispatchFetchPinboardPageData,
  generatePinboardUrl,
} from 'utils/pinboard';
import { updatePathName } from 'actions/path-name';
import { onPinboardPage } from 'utils/paths';
import { getPinboardIdFromRequestUrl } from 'utils/pinboard';
import { getPinboardID } from 'utils/location';
import { getPinboard } from 'selectors/pinboard-page/pinboard';
import { pinboardsSelector } from 'selectors/pinboard-page/pinboards';


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

  if (action.type === REMOVE_PINBOARD_REQUEST_SUCCESS) {
    const state = store.getState();
    const { id: currentPinboardId } = getPinboard(state);
    const removedPinboardId = getPinboardIdFromRequestUrl(action.request.url);
    if (removedPinboardId === currentPinboardId) {
      const pinboards = pinboardsSelector(state);
      if (pinboards.length > 0) {
        const newPinboardPathName = generatePinboardUrl(pinboards[0]);
        browserHistory.push(newPinboardPathName);
      } else {
        browserHistory.push(DEFAULT_PINBOARD_PATH);
      }
    }
  }

  return result;
};
