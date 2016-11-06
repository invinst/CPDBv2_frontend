import { handleActions } from 'redux-actions';
import { convertToRaw } from 'draft-js';

import {
  REPORTS_REQUEST_SUCCESS, UPDATE_REPORT_REQUEST_SUCCESS
} from 'actions/reporting-page';
import {
  CREATE_LINK_ENTITY, REMOVE_LINK_ENTITY
} from 'actions/rich-text-editor';
import { LANDING_PAGE_REQUEST_SUCCESS } from 'actions/landing-page';
import { createLinkEntity, removeLinkEntity } from 'utils/draft';
import { extractedReportRichTextFields } from 'utils/rich-text';


export default handleActions({
  [REPORTS_REQUEST_SUCCESS]: (state, action) => ({
    ...state, ...extractedReportRichTextFields(action.payload.results)
  }),
  [UPDATE_REPORT_REQUEST_SUCCESS]: (state, action) => ({
    ...state, ...extractedReportRichTextFields([action.payload])
  }),
  [LANDING_PAGE_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    ...extractedReportRichTextFields(
      find(action.payload.fields, ({ name }) => (name === 'reports')).value
    )
  }),

  [CREATE_LINK_ENTITY]: (state, action) => {
    const { data, key, editorState } = action.payload;
    const newEditorState = createLinkEntity(editorState, data);
    return {
      ...state,
      [key]: convertToRaw(newEditorState.getCurrentContent())
    };
  },
  [REMOVE_LINK_ENTITY]: (state, action) => {
    const { key, editorState } = action.payload;
    const newEditorState = removeLinkEntity(editorState);
    return {
      ...state,
      [key]: convertToRaw(newEditorState.getCurrentContent())
    };
  }
}, {});
