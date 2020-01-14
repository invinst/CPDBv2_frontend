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
import config from 'config';
import history from 'utils/history';

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
    routerMiddleware(history),
    fetchPageInitialData,
    redirectOfficerAlias,
    updatePathName,
    retryOfficerDownloadMiddleware,
  ];
  if (enablePinboardFeature)
    middleware = [...middleware, restoreCreateOrUpdatePinboard];
  const composeArgs = [
    applyMiddleware(...middleware),
    persistState(()=>{}, localStorageConfig),
  ];

  /* istanbul ignore next */
  if (config.appEnv === 'dev') {
    composeArgs.push(window.devToolsExtension ? window.devToolsExtension() : f => f);
  }

  return createStore(
    rootReducer(history),
    initialState,
    compose(...composeArgs)
  );
}

let store;

export default (...args) => {
  store = store || configureStore(...args);
  return store;
};
