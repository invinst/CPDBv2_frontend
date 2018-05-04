import persistState from 'redux-localstorage';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from 'reducers/root-reducer';
import configuredAxiosMiddleware from 'middleware/configured-axios-middleware';
import bodyScrollMiddleware from 'middleware/body-scroll-middleware';
import searchPath from 'middleware/search-path';
import bottomSheetPath from 'middleware/bottom-sheet-path';
import tracking from 'middleware/tracking';
import localStorageConfig from './local-storage-config';
import fetchPageInitialData from 'middleware/fetch-page-initial-data';


export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        thunk, configuredAxiosMiddleware, bodyScrollMiddleware, bottomSheetPath, searchPath, tracking,
        routerMiddleware(browserHistory), fetchPageInitialData
      ),
      persistState(()=>{}, localStorageConfig)
    )
  );
}
