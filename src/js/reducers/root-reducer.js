import { combineReducers } from 'redux';

import faqPage from './faq-page';
import landingPage from './landing-page';
import storiesPage from './stories-page';
import editModeOn from './edit-mode-on';
import authentication from './authentication';


export default combineReducers({
  landingPage,
  faqPage,
  storiesPage,
  editModeOn,
  authentication
});
