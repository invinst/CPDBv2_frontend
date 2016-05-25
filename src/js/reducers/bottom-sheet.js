import { handleActions } from 'redux-actions';

import { OPEN_BOTTOM_SHEET, CLOSE_BOTTOM_SHEET } from 'actions/bottom-sheet';


export default handleActions({
  [OPEN_BOTTOM_SHEET]: (state, action) => {
    return { open: true };
  },
  [CLOSE_BOTTOM_SHEET]: (state, action) => {
    return { open: false };
  }
}, { open: false });
