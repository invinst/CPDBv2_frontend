import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import configuredAxiosMiddleware from 'middleware/configured-axios-middleware';

import rootReducer from 'reducers/root-reducer';
import bodyScrollMiddleware from 'middleware/body-scroll-middleware';


export default function configureStore(initialState) {
  /* istanbul ignore next */
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, configuredAxiosMiddleware, bodyScrollMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}
