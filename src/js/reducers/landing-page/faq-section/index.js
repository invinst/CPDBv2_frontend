import { combineReducers } from 'redux';

import faqs from './faqs';
import fields from './fields';
import editModeOn from './edit-mode-on';


const faqSection = combineReducers({
  faqs,
  fields,
  editModeOn
});

export default faqSection;
