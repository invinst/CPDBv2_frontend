import { createSelector } from 'reselect';
import { isEmpty, values, map } from 'lodash';
import { EditorState, ContentState, convertFromRaw } from 'draft-js';

const collaborateBodySelector = state => state.landingPage.collaborateSection.body;
const collaborateHeaderSelector = state => state.landingPage.collaborateSection.headerText;

export const collaborateSectionSelector = createSelector(
  collaborateHeaderSelector,
  collaborateBodySelector,
  (headerText, body) => ({
    headerText,
    body: isEmpty(body) ?
      [] :
      map(values(body.blocks), 'text'),
    headerEditorState: isEmpty(headerText) ?
      EditorState.createEmpty() :
      EditorState.createWithContent(ContentState.createFromText(headerText)),
    bodyEditorState: isEmpty(body) ?
      EditorState.createEmpty() :
      EditorState.createWithContent(convertFromRaw(body))
  }
));
