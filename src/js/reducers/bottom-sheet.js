import { handleActions } from 'redux-actions';

import {
  OPEN_BOTTOM_SHEET_WITH_REPORT,
  OPEN_BOTTOM_SHEET_WITH_FAQ,
  CLOSE_BOTTOM_SHEET,
  REPORT_TYPE,
  FAQ_TYPE
} from 'actions/bottom-sheet';


export default handleActions({
  [OPEN_BOTTOM_SHEET_WITH_REPORT]: (state, action) => {
    return {
      content: {
        type: REPORT_TYPE,
        id: action.payload
      }
    };
  },
  [OPEN_BOTTOM_SHEET_WITH_FAQ]: (state, action) => {
    return {
      content: {
        type: FAQ_TYPE,
        id: action.payload
      }
    };
  },
  [CLOSE_BOTTOM_SHEET]: (state, action) => {
    return { content: null };
  }
}, { content: null });
