import { combineReducers } from 'redux';

import isRequesting from './is-requesting';
import faqsRequested from './faqs-requested';


export default combineReducers({
  isRequesting,
  faqsRequested
});
