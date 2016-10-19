import { combineReducers } from 'redux';

import faqApp from './faq-app';
import storyApp from './story-app';
import heroSection from './hero-section';
import vftgSection from './vftg-section';
import aboutSection from './about-section';
import collaborateSection from './collaborate-section';


export default combineReducers({
  faqApp,
  storyApp,
  heroSection,
  vftgSection,
  aboutSection,
  collaborateSection
});
