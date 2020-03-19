import persistState from 'redux-localstorage';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';

import rootReducer from 'reducers/root-reducer';
import configuredAxiosMiddleware from 'middleware/configured-axios-middleware';
import searchPath from 'middleware/search-path';
import tracking from 'middleware/tracking';
import localStorageConfig from './local-storage-config';
import fetchPageInitialData from 'middleware/fetch-page-initial-data';
import redirectOfficerAlias from 'middleware/redirect-officer-alias';
import updatePathName from 'middleware/path-name';
import retryOfficerDownloadMiddleware from 'middleware/retry-officer-downloads';
import restoreCreateOrUpdatePinboard from 'middleware/restore-create-or-update-pinboard';
import forceEditModeWhenAuthenticated from 'middleware/force-edit-mode-when-authenticated';
import config from 'config';
import browserHistory from 'utils/history';

const localStorageVersion = localStorage.getItem('CPDB_LOCALSTORAGE_VERSION', null);
const { pinboard: enablePinboardFeature } = config.enableFeatures;
if (config.localStorageVersion !== localStorageVersion) {
  localStorage.clear();
  localStorage.setItem('CPDB_LOCALSTORAGE_VERSION', config.localStorageVersion);
}

function configureStore(initialState) {
  let middleware = [
    thunk,
    configuredAxiosMiddleware,
    searchPath,
    tracking,
    routerMiddleware(browserHistory),
    fetchPageInitialData,
    redirectOfficerAlias,
    updatePathName,
    retryOfficerDownloadMiddleware,
    forceEditModeWhenAuthenticated,
  ];
  if (enablePinboardFeature)
    middleware = [...middleware, restoreCreateOrUpdatePinboard];
  const composeArgs = [
    applyMiddleware(...middleware),
    persistState(()=>{}, localStorageConfig),
  ];

  /* istanbul ignore next */
  if (config.appEnv === 'dev') {
    composeArgs.push(window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f);
  }

  return createStore(
    rootReducer(browserHistory),
    initialState,
    compose(...composeArgs)
  );
}

let store;

export default (...args) => {
  store = store || configureStore(...args);
  return store;
};
