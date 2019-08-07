import persistState from 'redux-localstorage';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from 'reducers/root-reducer';
import configuredAxiosMiddleware from 'middleware/configured-axios-middleware';
import searchPath from 'middleware/search-path';
import tracking from 'middleware/tracking';
import localStorageConfig from './local-storage-config';
import fetchPageInitialData from 'middleware/fetch-page-initial-data';
import redirectOfficerAlias from 'middleware/redirect-officer-alias';
import updatePathName from 'middleware/path-name';
import retryOfficerDownloadMiddleware from 'middleware/retry-officer-downloads';
import createOrUpdatePinboard from 'middleware/create-or-update-pinboard';
import restorePinboardSession from 'middleware/restore-pinboard-session';
import config from 'config';

const localStorageVersion = localStorage.getItem('CPDB_LOCALSTORAGE_VERSION', null);
if (config.localStorageVersion !== localStorageVersion) {
  localStorage.clear();
  localStorage.setItem('CPDB_LOCALSTORAGE_VERSION', config.localStorageVersion);
}

function configureStore(initialState) {
  const composeArgs = [
    applyMiddleware(
      thunk,
      configuredAxiosMiddleware,
      searchPath,
      tracking,
      routerMiddleware(browserHistory),
      fetchPageInitialData,
      redirectOfficerAlias,
      updatePathName,
      retryOfficerDownloadMiddleware,
      createOrUpdatePinboard,
      restorePinboardSession,
    ),
    persistState(()=>{}, localStorageConfig)
  ];

  /* istanbul ignore next */
  if (config.appEnv === 'dev') {
    composeArgs.push(window.devToolsExtension ? window.devToolsExtension() : f => f);
  }

  return createStore(
    rootReducer,
    initialState,
    compose(...composeArgs)
  );
}

let store;

export default (...args) => {
  store = store || configureStore(...args);
  return store;
};
