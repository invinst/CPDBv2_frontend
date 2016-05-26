import { handleActions } from 'redux-actions';

import { OPEN_BOTTOM_SHEET_WITH_STORY, CLOSE_BOTTOM_SHEET, STORY_TYPE } from 'actions/bottom-sheet';


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
  [CLOSE_BOTTOM_SHEET]: (state, action) => {
    return { content: null };
  }
}, { content: null });
