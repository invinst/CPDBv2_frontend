import persistState from 'redux-localstorage';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from 'reducers/root-reducer';
import configuredAxiosMiddleware from 'middleware/configured-axios-middleware';
import bodyScrollMiddleware from 'middleware/body-scroll-middleware';
import bottomSheetPath from 'middleware/bottom-sheet-path';
import localStorageConfig from './local-storage-config';
import intercomLogging from 'middleware/intercom-logging';


export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        thunk, configuredAxiosMiddleware, bodyScrollMiddleware, bottomSheetPath, intercomLogging,
        routerMiddleware(browserHistory)
      ),
      persistState(()=>{}, localStorageConfig)
    )
  );
}
