import { combineReducers } from 'redux';

import faqs from './faqs';
import isRequesting from './is-requesting';
import fields from './fields';
import editModeOn from './edit-mode-on';


const faqSection = combineReducers({
  faqs,
  isRequesting,
  fields,
  editModeOn
});

export default faqSection;
