import { createAction } from 'redux-actions';

import {
  OPEN_VIDEO_MODAL,
  CLOSE_VIDEO_MODAL,
} from 'utils/constants';

export const openVideoModal = createAction(OPEN_VIDEO_MODAL);
export const closeVideoModal = createAction(CLOSE_VIDEO_MODAL);
