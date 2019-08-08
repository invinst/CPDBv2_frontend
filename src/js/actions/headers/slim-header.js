import { createAction } from 'redux-actions';

import {
  TURN_ON_LOGO_EDIT_MODE,
  TURN_OFF_LOGO_EDIT_MODE,
  TURN_ON_DEMO_VIDEO_EDIT_MODE,
  TURN_OFF_DEMO_VIDEO_EDIT_MODE,
  VIDEO_INFO_REQUEST_START,
  VIDEO_INFO_REQUEST_SUCCESS,
  VIDEO_INFO_REQUEST_FAILURE,
  MODAL_VIDEO_INFO,
} from 'utils/constants';
import { withoutCredentialsGet } from 'actions/common/async-action';


export const turnOnLogoSectionEditMode = createAction(TURN_ON_LOGO_EDIT_MODE);
export const turnOffLogoSectionEditMode = createAction(TURN_OFF_LOGO_EDIT_MODE);

export const turnOnDemoVideoSectionEditMode = createAction(TURN_ON_DEMO_VIDEO_EDIT_MODE);
export const turnOffDemoVideoSectionEditMode = createAction(TURN_OFF_DEMO_VIDEO_EDIT_MODE);

export const fetchVideoInfo = withoutCredentialsGet(
  `https://vimeo.com/api/v2/video/${MODAL_VIDEO_INFO.VIDEO_ID}.json`,
  [
    VIDEO_INFO_REQUEST_START,
    VIDEO_INFO_REQUEST_SUCCESS,
    VIDEO_INFO_REQUEST_FAILURE,
  ]
);
