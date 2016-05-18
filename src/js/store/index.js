import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import configuredAxiosMiddleware from 'middleware/configured-axios-middleware';

import storyApp from 'reducers/story-app';


const rootReducer = combineReducers({
  storyApp
});

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, configuredAxiosMiddleware)
  );
}
