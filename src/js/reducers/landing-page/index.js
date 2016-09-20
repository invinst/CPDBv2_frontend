import { combineReducers } from 'redux';

import faqApp from './faq-app';
import storyApp from './story-app';
import bottomSheet from './bottom-sheet';
import heroSection from './hero-section';
import vftgSection from './vftg-section';
import aboutSection from './about-section';
import collaborateSection from './collaborate-section';


export default combineReducers({
  faqApp,
  storyApp,
  bottomSheet,
  heroSection,
  vftgSection,
  aboutSection,
  collaborateSection
});
