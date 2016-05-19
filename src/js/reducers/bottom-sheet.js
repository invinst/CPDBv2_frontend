import { handleActions } from 'redux-actions';

import { OPEN_BOTTOM_SHEET, CLOSE_BOTTOM_SHEET } from 'actions/bottom-sheet';
import { disableBodyScroll, enableBodyScroll } from 'utils/dom';


export default handleActions({
  [OPEN_BOTTOM_SHEET]: (state, action) => {
    disableBodyScroll();
    return { open: true };
  },
  [CLOSE_BOTTOM_SHEET]: (state, action) => {
    enableBodyScroll();
    return { open: false };
  }
}, { open: false });
