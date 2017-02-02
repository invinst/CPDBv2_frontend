import { combineReducers } from 'redux';

import isRequesting from './is-requesting';
import faqForm from './faq-form';


export default combineReducers({
  isRequesting,
  faqForm
});
