import { handleActions } from 'redux-actions';

import {
  OPEN_BOTTOM_SHEET_TO_CREATE_FAQ,
  OPEN_BOTTOM_SHEET_TO_CREATE_REPORT,
  OPEN_BOTTOM_SHEET_WITH_REPORT,
  OPEN_BOTTOM_SHEET_WITH_FAQ,
  CLOSE_BOTTOM_SHEET,
  REPORT_TYPE,
  FAQ_TYPE
} from 'actions/bottom-sheet';


export default handleActions({
  [OPEN_BOTTOM_SHEET_WITH_REPORT]: (state, action) => ({
    content: {
      type: REPORT_TYPE,
      id: action.payload
    }
  }),
  [OPEN_BOTTOM_SHEET_WITH_FAQ]: (state, action) => ({
    content: {
      type: FAQ_TYPE,
      id: action.payload
    }
  }),
  [OPEN_BOTTOM_SHEET_TO_CREATE_FAQ]: (state, action) => ({
    content: {
      type: FAQ_TYPE
    }
  }),
  [OPEN_BOTTOM_SHEET_TO_CREATE_REPORT]: (state, action) => ({
    content: {
      type: REPORT_TYPE
    }
  }),
  [CLOSE_BOTTOM_SHEET]: (state, action) => ({ content: null })
}, { content: null });
