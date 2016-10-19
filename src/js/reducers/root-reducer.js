import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import faqPage from './faq-page';
import landingPage from './landing-page';
import storiesPage from './stories-page';
import authentication from './authentication';
import bottomSheet from './bottom-sheet';


export default combineReducers({
  landingPage,
  faqPage,
  storiesPage,
  authentication,
  bottomSheet,
  routing: routerReducer
});
