import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import configuredAxiosMiddleware from 'middleware/configured-axios-middleware';

import storyApp from 'reducers/story-app';
import faqApp from 'reducers/faq-app';
import bottomSheet from 'reducers/bottom-sheet';
import bodyScrollMiddleware from 'middleware/body-scroll-middleware';


const rootReducer = combineReducers({
  storyApp,
  faqApp,
  bottomSheet
});

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, configuredAxiosMiddleware, bodyScrollMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}
