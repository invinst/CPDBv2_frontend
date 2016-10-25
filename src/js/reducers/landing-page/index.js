import { combineReducers } from 'redux';

import faqApp from './faq-app';
import reportSection from './report-section';
import heroSection from './hero-section';
import vftgSection from './vftg-section';
import aboutSection from './about-section';
import collaborateSection from './collaborate-section';


export default combineReducers({
  faqApp,
  reportSection,
  heroSection,
  vftgSection,
  aboutSection,
  collaborateSection
});
