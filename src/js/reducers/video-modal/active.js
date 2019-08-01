import { handleActions } from 'redux-actions';
import {
  OPEN_VIDEO_MODAL,
  CLOSE_VIDEO_MODAL,
} from 'utils/constants';

export default handleActions({
  [OPEN_VIDEO_MODAL]: (state, action) => true,
  [CLOSE_VIDEO_MODAL]: (state, action) => false,
}, false);
