import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import faqPage from './faq-page';
import landingPage from './landing-page';
import searchPage from './search-page';
import authentication from './authentication';
import appContent from './app-content';
import reportingPage from './reporting-page';
import reports from './reports';
import faqs from './faqs';


export default combineReducers({
  landingPage,
  searchPage,
  faqPage,
  authentication,
  appContent,
  reportingPage,
  reports,
  faqs,
  routing: routerReducer
});
