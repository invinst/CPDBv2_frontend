import {
  changeOfficerId,
  changeOfficerTab,
  fetchOfficerSummary,
  turnOnTriangleExplainEditMode,
  turnOffTriangleExplainEditMode,
  turnOnScaleExplainEditMode,
  turnOffScaleExplainEditMode,
  turnOnNoDataRadarChartExplainEditMode,
  turnOffNoDataRadarChartExplainEditMode,
  requestCreateOfficerZipFile,
  fetchOfficerZipWithDocsFileUrl,
  fetchOfficerZipFileUrl,
} from 'actions/officer-page';
import {
  CHANGE_OFFICER_ID,
  CHANGE_OFFICER_TAB,
  OFFICER_SUMMARY_REQUEST_FAILURE,
  OFFICER_SUMMARY_REQUEST_START,
  OFFICER_SUMMARY_REQUEST_SUCCESS,
  OFFICER_URL,
  OFFICER_EDIT_MODE,
  OFFICER_EDIT_TYPES,
  OFFICER_CREATE_ZIP_FILE_REQUEST_START,
  OFFICER_CREATE_ZIP_FILE_REQUEST_SUCCESS,
  OFFICER_CREATE_ZIP_FILE_REQUEST_FAILURE,
  OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_START,
  OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_SUCCESS,
  OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_FAILURE,
  OFFICER_FETCH_ZIP_FILE_URL_REQUEST_START,
  OFFICER_FETCH_ZIP_FILE_URL_REQUEST_SUCCESS,
  OFFICER_FETCH_ZIP_FILE_URL_REQUEST_FAILURE,
} from 'utils/constants';


describe('officerPage actions', function () {
  describe('fetchOfficerSummary', function () {
    it('should return the right action', function () {
      fetchOfficerSummary(123).should.eql({
        types: [OFFICER_SUMMARY_REQUEST_START, OFFICER_SUMMARY_REQUEST_SUCCESS, OFFICER_SUMMARY_REQUEST_FAILURE],
        payload: {
          request: {
            url: `${OFFICER_URL}123/summary/`,
            params: undefined,
            adapter: null,
            cancelToken: undefined,
          },
        },
      });
    });
  });

  describe('changeOfficerId', function () {
    it('should return the right action', function () {
      changeOfficerId(123).should.eql({
        type: CHANGE_OFFICER_ID,
        payload: 123,
      });
    });
  });

  describe('changeOfficerTab', function () {
    it('should return the right action', function () {
      changeOfficerTab('TIMELINE').should.eql({
        type: CHANGE_OFFICER_TAB,
        payload: 'TIMELINE',
      });
    });
  });

  describe('turnOnTriangleExplainEditMode action', function () {
    it('should return correct action', function () {
      turnOnTriangleExplainEditMode().should.eql({
        type: OFFICER_EDIT_MODE,
        payload: { editType: OFFICER_EDIT_TYPES.TRIANGLE, mode: true },
      });
    });
  });

  describe('turnOffTriangleExplainEditMode action', function () {
    it('should return correct action', function () {
      turnOffTriangleExplainEditMode().should.eql({
        type: OFFICER_EDIT_MODE,
        payload: { editType: OFFICER_EDIT_TYPES.TRIANGLE, mode: false },
      });
    });
  });

  describe('turnOnScaleExplainEditMode action', function () {
    it('should return correct action', function () {
      turnOnScaleExplainEditMode().should.eql({
        type: OFFICER_EDIT_MODE,
        payload: { editType: OFFICER_EDIT_TYPES.SCALE, mode: true },
      });
    });
  });

  describe('turnOffScaleExplainEditMode action', function () {
    it('should return correct action', function () {
      turnOffScaleExplainEditMode().should.eql({
        type: OFFICER_EDIT_MODE,
        payload: { editType: OFFICER_EDIT_TYPES.SCALE, mode: false },
      });
    });
  });

  describe('turnOnNoDataRadarChartExplainEditMode action', function () {
    it('should return correct action', function () {
      turnOnNoDataRadarChartExplainEditMode().should.eql({
        type: OFFICER_EDIT_MODE,
        payload: { editType: OFFICER_EDIT_TYPES.NO_DATA_RADAR_CHART, mode: true },
      });
    });
  });

  describe('turnOffNoDataRadarChartExplainEditMode action', function () {
    it('should return correct action', function () {
      turnOffNoDataRadarChartExplainEditMode().should.eql({
        type: OFFICER_EDIT_MODE,
        payload: { editType: OFFICER_EDIT_TYPES.NO_DATA_RADAR_CHART, mode: false },
      });
    });
  });

  describe('requestCreateOfficerZipFile action', function () {
    it('should return the right action', function () {
      requestCreateOfficerZipFile(123).should.eql({
        types: [
          OFFICER_CREATE_ZIP_FILE_REQUEST_START,
          OFFICER_CREATE_ZIP_FILE_REQUEST_SUCCESS,
          OFFICER_CREATE_ZIP_FILE_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${OFFICER_URL}123/create-zip-file/`,
            params: undefined,
            adapter: null,
            cancelToken: undefined,
          },
        },
      });
    });
  });

  describe('fetchOfficerZipWithDocsFileUrl action', function () {
    it('should return the right action', function () {
      fetchOfficerZipWithDocsFileUrl(123, 1).should.eql({
        types: [
          OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_START,
          OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_SUCCESS,
          OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${OFFICER_URL}123/request-download/`,
            params: { 'with-docs': true, 'retry-counter': 1 },
            adapter: null,
            cancelToken: undefined,
          },
        },
      });
    });
  });

  describe('fetchOfficerZipFileUrl action', function () {
    it('should return the right action', function () {
      fetchOfficerZipFileUrl(123, 1).should.eql({
        types: [
          OFFICER_FETCH_ZIP_FILE_URL_REQUEST_START,
          OFFICER_FETCH_ZIP_FILE_URL_REQUEST_SUCCESS,
          OFFICER_FETCH_ZIP_FILE_URL_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${OFFICER_URL}123/request-download/`,
            params: { 'with-docs': false, 'retry-counter': 1 },
            adapter: null,
            cancelToken: undefined,
          },
        },
      });
    });
  });
});
