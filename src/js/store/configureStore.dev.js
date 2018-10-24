import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import configuredAxiosMiddleware from 'middleware/configured-axios-middleware';
import rootReducer from 'reducers/root-reducer';
import tracking from 'middleware/tracking';
import searchPath from 'middleware/search-path';
import localStorageConfig from './local-storage-config';
import fetchPageInitialData from 'middleware/fetch-page-initial-data';

export default function configureStore(initialState) {
  /* istanbul ignore next */
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        thunk, configuredAxiosMiddleware, searchPath, tracking,
        routerMiddleware(browserHistory), fetchPageInitialData
      ),
      persistState(()=>{}, localStorageConfig),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}
