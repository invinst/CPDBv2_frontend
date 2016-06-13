import { combineReducers } from 'redux';

import faqApp from './faq-app';
import storyApp from './story-app';
import bottomSheet from './bottom-sheet';


export default combineReducers({
  faqApp,
  storyApp,
  bottomSheet
});
