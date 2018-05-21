import persistState from 'redux-localstorage';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from 'reducers/root-reducer';
import configuredAxiosMiddleware from 'middleware/configured-axios-middleware';
import searchPath from 'middleware/search-path';
import openPage from 'middleware/open-page-middleware';
import tracking from 'middleware/tracking';
import localStorageConfig from './local-storage-config';
import fetchPageInitialData from 'middleware/fetch-page-initial-data';


export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        thunk, configuredAxiosMiddleware, openPage, searchPath, tracking,
        routerMiddleware(browserHistory), fetchPageInitialData
      ),
      persistState(()=>{}, localStorageConfig)
    )
  );
}
