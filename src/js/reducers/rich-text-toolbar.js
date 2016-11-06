import { handleActions } from 'redux-actions';

import { OPEN_RICH_TEXT_TOOLBAR, CLOSE_RICH_TEXT_TOOLBAR } from 'actions/rich-text-editor';


export default handleActions({
  [OPEN_RICH_TEXT_TOOLBAR]: (state, action) => ({
    ...state,
    ...action.payload,
    show: true
  }),
  [CLOSE_RICH_TEXT_TOOLBAR]: (state, action) => ({
    ...state,
    ...action.payload,
    editorState: null,
    show: false
  })
}, { show: false, contentStateKey: null, editorState: null });
