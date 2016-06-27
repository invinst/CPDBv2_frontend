import { combineReducers } from 'redux';

import faqs from './faqs';
import isRequesting from './is-requesting';
import faqForm from './faq-form';


export default combineReducers({
  faqs,
  isRequesting,
  faqForm
});
