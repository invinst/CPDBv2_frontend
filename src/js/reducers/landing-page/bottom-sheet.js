import { handleActions } from 'redux-actions';

import {
  OPEN_BOTTOM_SHEET_WITH_STORY,
  OPEN_BOTTOM_SHEET_WITH_FAQ,
  CLOSE_BOTTOM_SHEET,
  STORY_TYPE,
  FAQ_TYPE
} from 'actions/landing-page/bottom-sheet';


export default handleActions({
  [OPEN_BOTTOM_SHEET_WITH_STORY]: (state, action) => {
    return {
      content: {
        type: STORY_TYPE,
        props: {
          story: action.payload
        }
      }
    };
  },
  [OPEN_BOTTOM_SHEET_WITH_FAQ]: (state, action) => {
    return {
      content: {
        type: FAQ_TYPE,
        props: {
          faq: action.payload
        }
      }
    };
  },
  [CLOSE_BOTTOM_SHEET]: (state, action) => {
    return { content: null };
  }
}, { content: null });
