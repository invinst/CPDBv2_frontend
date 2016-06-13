import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import configuredAxiosMiddleware from 'middleware/configured-axios-middleware';

import rootReducer from 'reducers/root-reducer';
import bodyScrollMiddleware from 'middleware/body-scroll-middleware';


export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, configuredAxiosMiddleware, bodyScrollMiddleware)
  );
}
