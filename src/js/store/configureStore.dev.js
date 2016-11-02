import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import configuredAxiosMiddleware from 'middleware/configured-axios-middleware';
import rootReducer from 'reducers/root-reducer';
import bodyScrollMiddleware from 'middleware/body-scroll-middleware';
import gaMiddleware from 'middleware/ga';


export default function configureStore(initialState) {
  /* istanbul ignore next */
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        thunk, configuredAxiosMiddleware, bodyScrollMiddleware, gaMiddleware,
        routerMiddleware(browserHistory)
        ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}
