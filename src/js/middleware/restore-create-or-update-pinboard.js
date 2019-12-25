import React from 'react';
import { Promise } from 'es6-promise';
import { get, keys, isNil, isEmpty, identity, noop, toLower, camelCase, startsWith } from 'lodash';

import config from 'config';

import {
  ADD_ITEM_IN_PINBOARD_PAGE,
  ADD_OR_REMOVE_ITEM_IN_PINBOARD,
  ORDER_PINBOARD,
  PINBOARD_UPDATE_FROM_SOURCE_REQUEST_SUCCESS,
  REMOVE_ITEM_IN_PINBOARD_PAGE,
  SAVE_PINBOARD,
  UPDATE_PINBOARD_INFO,
} from 'utils/constants';
import {
  addItemToPinboardState,
  createPinboard,
  fetchLatestRetrievedPinboard,
  orderPinboardState,
  performFetchPinboardRelatedData,
  removeItemFromPinboardState,
  savePinboard,
  updatePinboard,
  updatePinboardInfoState,
} from 'actions/pinboard';
import {
  dispatchFetchPinboardPageData,
  dispatchFetchPinboardPinnedItems,
  getRequestPinboard,
  isEmptyPinboard,
} from 'utils/pinboard';
import { isPinboardRestoredSelector } from 'selectors/pinboard-page/pinboard';
import {
  showInvalidParamToasts,
  showCreatedToasts,
  showPinboardToast,
  showAlertToast,
  showAddOrRemoveItemToast,
} from 'utils/toast';
import { Toastify } from 'utils/vendors';


const getIds = (query, key) => get(query, key, '').split(',').filter(identity);
const isParam = (param, validators) => validators.includes(toLower(camelCase(param)));

const getPinboardFromQuery = (query) => {
  const invalidParams = [];
  const pinboardFromQuery = {
    title: '',
    officerIds: [],
    crids: [],
    trrIds: [],
  };
  keys(query).forEach(param => {
    if (isParam(param, 'title')) {
      pinboardFromQuery.title = query[param];
    } else if (isParam(param, ['officerid', 'officerids'])) {
      pinboardFromQuery.officerIds = getIds(query, param).map(id => parseInt(id));
    } else if (isParam(param, ['crid', 'crids'])) {
      pinboardFromQuery.crids = getIds(query, param);
    } else if (isParam(param, ['trrid', 'trrids'])) {
      pinboardFromQuery.trrIds = getIds(query, param).map(id => parseInt(id));
    } else {
      invalidParams.push(param);
    }
  });
  return { pinboardFromQuery, invalidParams };
};

const RETRY_DELAY = config.requestRetryDelay || 1000;
const MAX_RETRIES = 60;
let retries = 0;

const CONNECTION_RETRY_DELAY = 100;
const MAX_CONNECTION_RETRIES = 3;
let internetConnectionRetries = 0;
let reconnectingToastId;

function handleConnectionLostOrRetry(store) {
  if (window.navigator.onLine) {
    if (retries < MAX_RETRIES) {
      retries += 1;
      setTimeout(() => store.dispatch(savePinboard()), RETRY_DELAY);
    } else {
      retries = 0;
      showAlertToast(
        'Failed to save pinboard. Click to try again!',
        () => store.dispatch(savePinboard())
      );
    }
  } else if (!reconnectingToastId) {
    if (internetConnectionRetries < MAX_CONNECTION_RETRIES) {
      internetConnectionRetries += 1;
      setTimeout(() => store.dispatch(savePinboard()), CONNECTION_RETRY_DELAY);
    } else {
      retries = 0;
      internetConnectionRetries = 0;
      reconnectingToastId = showAlertToast(
        'Connection lost. Trying to save ...',
        () => resumeSavingPinboard(store)
      );
    }
  }
}

function resumeSavingPinboard(store) {
  if (reconnectingToastId) {
    store.dispatch(savePinboard());
    reconnectingToastId && Toastify.toast.dismiss(reconnectingToastId);
    reconnectingToastId = undefined;
  }
}

function dispatchUpdateOrCreatePinboard(store, currentPinboard, successCallBack=noop) {
  const updateOrCreatePinboard = isNil(currentPinboard.id) ? createPinboard : updatePinboard;
  store.dispatch(updateOrCreatePinboard(currentPinboard)).then(result => {
    retries = 0;
    store.dispatch(savePinboard(result.payload));
    successCallBack(result.payload);
  }).catch(() => handleConnectionLostOrRetry(store));
}

export default store => {
  window.addEventListener('online', () => resumeSavingPinboard(store));
  return next => action => {
    if (action.type === ADD_OR_REMOVE_ITEM_IN_PINBOARD || action.type === ADD_ITEM_IN_PINBOARD_PAGE) {
      let promises = [];

      const addOrRemove = action.payload.isPinned ? removeItemFromPinboardState : addItemToPinboardState;
      promises.push(store.dispatch(addOrRemove(action.payload)));

      Promise.all(promises).finally(() => {
        store.dispatch(savePinboard());
        if (action.type === ADD_OR_REMOVE_ITEM_IN_PINBOARD) {
          showAddOrRemoveItemToast(store, action.payload);
        }
      });
    }

    if (action.type === REMOVE_ITEM_IN_PINBOARD_PAGE) {
      Promise.all([store.dispatch(removeItemFromPinboardState(action.payload))]).finally(() => {
        store.dispatch(savePinboard());
      });
    }

    if (action.type === UPDATE_PINBOARD_INFO) {
      Promise.all([store.dispatch(updatePinboardInfoState(action.payload))]).finally(() => {
        store.dispatch(savePinboard());
      });
    }

    if (action.type === ORDER_PINBOARD) {
      Promise.all([store.dispatch(orderPinboardState(action.payload))]).finally(() => {
        store.dispatch(savePinboard());
      });
    }

    if (action.type === SAVE_PINBOARD) {
      const state = store.getState();
      const pinboard = state.pinboardPage.pinboard;

      const currentPinboard = getRequestPinboard(pinboard);
      const pinboardId = currentPinboard.id;

      if (!pinboard.saving) {
        if (pinboard.hasPendingChanges) {
          dispatchUpdateOrCreatePinboard(store, currentPinboard);
        } else {
          if (startsWith(state.pathname, '/pinboard/') && pinboardId) {
            if (!state.pinboardPage.pinnedItemsRequested) {
              dispatchFetchPinboardPinnedItems(store, pinboardId);
            }
            if (pinboard.needRefreshData) {
              store.dispatch(performFetchPinboardRelatedData());
              dispatchFetchPinboardPageData(store, pinboardId);
            }
          }
        }
      }
    }

    if (action.type === PINBOARD_UPDATE_FROM_SOURCE_REQUEST_SUCCESS) {
      const state = store.getState();
      const pinboardId = state.pinboardPage.pinboard.id;

      dispatchFetchPinboardPinnedItems(store, pinboardId);
      dispatchFetchPinboardPageData(store, pinboardId);
    }

    if (action.type === '@@router/LOCATION_CHANGE') {
      const state = store.getState();
      const pinboard = state.pinboardPage.pinboard;
      const onPinboardPage = action.payload.pathname.match(/\/pinboard\//);
      const hasPinboardId = action.payload.pathname.match(/\/pinboard\/[a-fA-F0-9]+\//);
      if (onPinboardPage && !hasPinboardId && !pinboard.hasPendingChanges) {
        const { pinboardFromQuery, invalidParams } = getPinboardFromQuery(action.payload.query);
        isEmpty(invalidParams) || showInvalidParamToasts(invalidParams);

        if (!isEmptyPinboard(pinboardFromQuery) || pinboardFromQuery.title)
          dispatchUpdateOrCreatePinboard(store, pinboardFromQuery, showCreatedToasts);
        else {
          isEmpty(action.payload.query) || showPinboardToast('Redirected to latest pinboard.');
          store.dispatch(fetchLatestRetrievedPinboard({ create: true }));
        }
      } else if (!isPinboardRestoredSelector(state) && !onPinboardPage) {
        store.dispatch(fetchLatestRetrievedPinboard({ create: false }));
      }
    }

    return next(action);
  };
};
