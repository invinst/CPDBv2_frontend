import { combineReducers } from 'redux';

import faqPage from './faq-page';
import landingPage from './landing-page';
import storiesPage from './stories-page';


export default combineReducers({
  landingPage,
  faqPage,
  storiesPage
});
