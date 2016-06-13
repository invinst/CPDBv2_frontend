import { combineReducers } from 'redux';

import faqs from './faqs';
import isRequesting from './is-requesting';


const faqApp = combineReducers({
  faqs,
  isRequesting
});

export default faqApp;
