import { createAction } from 'redux-actions';
import { chain } from 'lodash';

import { authenticatedGet, authenticatedPatch, get } from 'actions/common/async-action';
import {
  DOCUMENTS_URL,
  DOCUMENT_REQUEST_START,
  DOCUMENT_REQUEST_SUCCESS,
  DOCUMENT_REQUEST_FAILURE,
  TURN_ON_DOCUMENT_TITLE_EDIT_MODE,
  TURN_OFF_DOCUMENT_TITLE_EDIT_MODE,
  TURN_ON_TAGS_EDIT_MODE,
  TURN_OFF_TAGS_EDIT_MODE,
  UPDATE_DOCUMENT_PAGE_REQUEST_START,
  UPDATE_DOCUMENT_PAGE_REQUEST_SUCCESS,
  UPDATE_DOCUMENT_PAGE_REQUEST_FAILURE,
  DOCUMENT_SUGGESTION_TAGS_API_URL,
  FETCH_DOCUMENT_SUGGESTION_TAGS_START,
  FETCH_DOCUMENT_SUGGESTION_TAGS_SUCCESS,
  FETCH_DOCUMENT_SUGGESTION_TAGS_FAILURE,
} from 'utils/constants';
import { trackDocumentEdit } from 'utils/tracking';


export const fetchDocument = documentId => (authenticatedGet(
  `${DOCUMENTS_URL}${documentId}/`,
  [DOCUMENT_REQUEST_START, DOCUMENT_REQUEST_SUCCESS, DOCUMENT_REQUEST_FAILURE]
)());

export const turnOnDocumentPageTitleEditMode = createAction(TURN_ON_DOCUMENT_TITLE_EDIT_MODE, () => {});

export const turnOffDocumentPageTitleEditMode = createAction(TURN_OFF_DOCUMENT_TITLE_EDIT_MODE, () => {});

export const turnOnDocumentTagsEditMode = createAction(TURN_ON_TAGS_EDIT_MODE, () => {});

export const turnOffDocumentTagsEditMode = createAction(TURN_OFF_TAGS_EDIT_MODE, () => {});

export const fetchDocumentSuggestionTags = () => get(
  DOCUMENT_SUGGESTION_TAGS_API_URL,
  [
    FETCH_DOCUMENT_SUGGESTION_TAGS_START,
    FETCH_DOCUMENT_SUGGESTION_TAGS_SUCCESS,
    FETCH_DOCUMENT_SUGGESTION_TAGS_FAILURE,
  ]
)();

export const updateDocument = fieldName => obj => {
  const data = chain(obj.fields)
    .keyBy('key')
    .mapValues('value')
    .value();

  trackDocumentEdit(data.id, fieldName);

  return authenticatedPatch(
    `${DOCUMENTS_URL}${data.id}/`,
    [
      UPDATE_DOCUMENT_PAGE_REQUEST_START,
      UPDATE_DOCUMENT_PAGE_REQUEST_SUCCESS,
      UPDATE_DOCUMENT_PAGE_REQUEST_FAILURE,
    ]
  )(data);
};
