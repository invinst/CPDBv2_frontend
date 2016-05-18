import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import configuredAxiosMiddleware from 'middleware/configured-axios-middleware';

import storyApp from 'reducers/story-app';
import bottomSheet from 'reducers/bottom-sheet';


const rootReducer = combineReducers({
  storyApp,
  bottomSheet
});

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, configuredAxiosMiddleware)
  );
}
