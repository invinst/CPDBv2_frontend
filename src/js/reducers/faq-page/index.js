import { combineReducers } from 'redux';

import isRequesting from './is-requesting';
import faqForm from './faq-form';
import faqsRequested from './faqs-requested';


export default combineReducers({
  isRequesting,
  faqsRequested,
  faqForm
});
