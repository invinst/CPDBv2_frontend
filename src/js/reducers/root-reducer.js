import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import faqPage from './faq-page';
import landingPage from './landing-page';
import storiesPage from './stories-page';
import authentication from './authentication';


export default combineReducers({
  landingPage,
  faqPage,
  storiesPage,
  authentication,
  routing: routerReducer
});
