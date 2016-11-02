import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from 'reducers/root-reducer';
import configuredAxiosMiddleware from 'middleware/configured-axios-middleware';
import bodyScrollMiddleware from 'middleware/body-scroll-middleware';
import gaMiddleware from 'middleware/ga';


export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      thunk, configuredAxiosMiddleware, bodyScrollMiddleware, gaMiddleware,
      routerMiddleware(browserHistory)
    )
  );
}
