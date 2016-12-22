import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import configuredAxiosMiddleware from 'middleware/configured-axios-middleware';
import rootReducer from 'reducers/root-reducer';
import bodyScrollMiddleware from 'middleware/body-scroll-middleware';
import bottomSheetPath from 'middleware/bottom-sheet-path';
import localStorageConfig from './local-storage-config';


export default function configureStore(initialState) {
  /* istanbul ignore next */
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        thunk, configuredAxiosMiddleware, bodyScrollMiddleware, bottomSheetPath,
        routerMiddleware(browserHistory)
      ),
      persistState(()=>{}, localStorageConfig),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}
