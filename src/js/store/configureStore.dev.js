import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import configuredAxiosMiddleware from 'middleware/configured-axios-middleware';
import rootReducer from 'reducers/root-reducer';
import bodyScrollMiddleware from 'middleware/body-scroll-middleware';
import bottomSheetPath from 'middleware/bottom-sheet-path';
import tracking from 'middleware/tracking';


export default function configureStore(initialState) {
  /* istanbul ignore next */
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        thunk, configuredAxiosMiddleware, bodyScrollMiddleware, bottomSheetPath, tracking,
        routerMiddleware(browserHistory)
        ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}
