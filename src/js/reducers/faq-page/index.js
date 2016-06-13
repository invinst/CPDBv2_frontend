import { combineReducers } from 'redux';

import faqs from './faqs';
import isRequesting from './is-requesting';


export default combineReducers({
  faqs,
  isRequesting
});
