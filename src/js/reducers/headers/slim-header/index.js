import { combineReducers } from 'redux';

import logoSectionEditModeOn from './logo-section-edit-mode-on';
import demoVideoSectionEditModeOn from './demo-video-section-edit-mode-on';
import videoInfo from './video-info';


export default combineReducers({
  logoSectionEditModeOn,
  demoVideoSectionEditModeOn,
  videoInfo,
});
