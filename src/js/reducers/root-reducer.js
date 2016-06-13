import { combineReducers } from 'redux';

import faqPage from './faq-page';
import landingPage from './landing-page';


export default combineReducers({
  landingPage,
  faqPage
});
