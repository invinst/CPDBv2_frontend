import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from 'reducers/root-reducer';
import configuredAxiosMiddleware from 'middleware/configured-axios-middleware';
import bodyScrollMiddleware from 'middleware/body-scroll-middleware';
import bottomSheetPath from 'middleware/bottom-sheet-path';
import tracking from 'middleware/tracking';


export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      thunk, configuredAxiosMiddleware, bodyScrollMiddleware, bottomSheetPath, tracking,
      routerMiddleware(browserHistory)
    )
  );
}
