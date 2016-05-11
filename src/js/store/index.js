import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import storyApp from 'reducers/story-app';

export default function configureStore(initialState) {
  return createStore(
    storyApp,
    initialState,
    applyMiddleware(thunk)
  );
}
