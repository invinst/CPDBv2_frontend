import { get } from 'actions/common/async-action';
import { createAction } from 'redux-actions';

import {
  CHANGE_OFFICER_ID,
  OFFICER_SUMMARY_REQUEST_FAILURE,
  OFFICER_SUMMARY_REQUEST_START,
  OFFICER_SUMMARY_REQUEST_SUCCESS,
  OFFICER_URL,
  CHANGE_OFFICER_TAB,
  OFFICER_EDIT_MODE,
  OFFICER_EDIT_TYPES,
  OFFICER_CREATE_ZIP_FILE_REQUEST_START,
  OFFICER_CREATE_ZIP_FILE_REQUEST_SUCCESS,
  OFFICER_CREATE_ZIP_FILE_REQUEST_FAILURE,
  OFFICER_FETCH_ZIP_FILE_URL_REQUEST_START,
  OFFICER_FETCH_ZIP_FILE_URL_REQUEST_SUCCESS,
  OFFICER_FETCH_ZIP_FILE_URL_REQUEST_FAILURE,
  OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_START,
  OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_SUCCESS,
  OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_FAILURE
} from 'utils/constants';


export const fetchOfficerSummary = officerId => (get(
  `${OFFICER_URL}${officerId}/summary/`,
  [OFFICER_SUMMARY_REQUEST_START, OFFICER_SUMMARY_REQUEST_SUCCESS, OFFICER_SUMMARY_REQUEST_FAILURE]
)());

export const changeOfficerId = createAction(CHANGE_OFFICER_ID);

export const changeOfficerTab = createAction(CHANGE_OFFICER_TAB);


const createChangeEditModeAction = (editType, mode) => createAction(
  OFFICER_EDIT_MODE,
  () => ({ editType, mode })
);

export const turnOnTriangleExplainEditMode = createChangeEditModeAction(OFFICER_EDIT_TYPES.TRIANGLE, true);
export const turnOffTriangleExplainEditMode = createChangeEditModeAction(OFFICER_EDIT_TYPES.TRIANGLE, false);

export const turnOnScaleExplainEditMode = createChangeEditModeAction(OFFICER_EDIT_TYPES.SCALE, true);
export const turnOffScaleExplainEditMode = createChangeEditModeAction(OFFICER_EDIT_TYPES.SCALE, false);

export const turnOnNoDataRadarChartExplainEditMode = createChangeEditModeAction(
  OFFICER_EDIT_TYPES.NO_DATA_RADAR_CHART, true);
export const turnOffNoDataRadarChartExplainEditMode = createChangeEditModeAction(
  OFFICER_EDIT_TYPES.NO_DATA_RADAR_CHART, false);

export const requestCreateOfficerZipFile = officerId => (get(
  `${ OFFICER_URL }${ officerId }/create_zip_file/`,
  [
    OFFICER_CREATE_ZIP_FILE_REQUEST_START,
    OFFICER_CREATE_ZIP_FILE_REQUEST_SUCCESS,
    OFFICER_CREATE_ZIP_FILE_REQUEST_FAILURE
  ]
)());

export const fetchOfficerZipWithDocsFileUrl = (officerId, retryCounter=0) => (get(
  `${ OFFICER_URL }${ officerId }/request_download/`,
  [
    OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_START,
    OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_SUCCESS,
    OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_FAILURE
  ]
)({ 'with-docs': true, 'retry-counter': retryCounter }));

export const fetchOfficerZipFileUrl = (officerId, retryCounter=0) => (get(
  `${ OFFICER_URL }${ officerId }/request_download/`,
  [
    OFFICER_FETCH_ZIP_FILE_URL_REQUEST_START,
    OFFICER_FETCH_ZIP_FILE_URL_REQUEST_SUCCESS,
    OFFICER_FETCH_ZIP_FILE_URL_REQUEST_FAILURE
  ]
)({ 'with-docs': false, 'retry-counter': retryCounter }));
