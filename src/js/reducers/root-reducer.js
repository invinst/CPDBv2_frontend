import { combineReducers } from 'redux';

import faqPage from './faq-page';
import landingPage from './landing-page';
import authentication from './authentication';
import bottomSheet from './bottom-sheet';
import reportingPage from './reporting-page';
import reports from './reports';
import faqs from './faqs';
import { routerReducer } from 'react-router-redux';


export default combineReducers({
  landingPage,
  faqPage,
  authentication,
  bottomSheet,
  reportingPage,
  reports,
  faqs,
  routing: routerReducer
});
