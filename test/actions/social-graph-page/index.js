import {
  requestSocialGraphNetwork,
  requestSocialGraphAllegations,
  requestFirstPageSocialGraphGeographicCrs,
  requestOtherPagesSocialGraphGeographicCrs,
  requestFirstPageSocialGraphGeographicTrrs,
  requestOtherPagesSocialGraphGeographicTrrs,
  requestFirstPageSocialGraphGeographicCrsPreviewPane,
  requestOtherPagesSocialGraphGeographicCrsPreviewPane,
  requestFirstPageSocialGraphGeographicTrrsPreviewPane,
  requestOtherPagesSocialGraphGeographicTrrsPreviewPane,
  requestSocialGraphOfficers,
  updateSocialGraphTimelineIdx,
  updateSocialGraphTimelineIdxFromTimelineTab,
  updateSocialGraphRefreshIntervalId,
} from 'actions/social-graph-page';
import * as constants from 'utils/constants';


describe('socialGraph actions', function () {
  describe('requestSocialGraphNetwork', function () {
    it('should return the right action', function () {
      requestSocialGraphNetwork({ 'unit_id': 123, 'threshold': 2, 'complaint_origin': 'CIVILIAN' }).should.eql({
        types: [
          constants.SOCIAL_GRAPH_NETWORK_REQUEST_START,
          constants.SOCIAL_GRAPH_NETWORK_REQUEST_SUCCESS,
          constants.SOCIAL_GRAPH_NETWORK_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: constants.SOCIAL_GRAPH_NETWORK_API_URL,
            params: { 'unit_id': 123, 'threshold': 2, 'complaint_origin': 'CIVILIAN' },
            cancelToken: undefined,
          },
        },
      });
    });
  });

  describe('requestSocialGraphAllegations', function () {
    it('should return the right action', function () {
      requestSocialGraphAllegations({ 'unit_id': 123, 'threshold': 2, 'complaint_origin': 'CIVILIAN' }).should.eql({
        types: [
          constants.SOCIAL_GRAPH_ALLEGATIONS_REQUEST_START,
          constants.SOCIAL_GRAPH_ALLEGATIONS_REQUEST_SUCCESS,
          constants.SOCIAL_GRAPH_ALLEGATIONS_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: constants.SOCIAL_GRAPH_ALLEGATIONS_API_URL,
            params: { 'unit_id': 123, 'threshold': 2, 'complaint_origin': 'CIVILIAN' },
            cancelToken: undefined,
          },
        },
      });
    });
  });

  describe('requestFirstPageSocialGraphGeographicCrs', function () {
    it('should return the right action', function () {
      requestFirstPageSocialGraphGeographicCrs({ 'unit_id': 123 }).should.eql({
        types: [
          constants.FIRST_PAGE_GEOGRAPHIC_CRS_REQUEST_START,
          constants.FIRST_PAGE_GEOGRAPHIC_CRS_REQUEST_SUCCESS,
          constants.FIRST_PAGE_GEOGRAPHIC_CRS_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: constants.SOCIAL_GRAPH_GEOGRAPHIC_CRS_API_URL,
            params: { 'unit_id': 123 },
            cancelToken: undefined,
          },
        },
      });
    });
  });

  describe('requestOtherPagesSocialGraphGeographicCrs', function () {
    it('should return the right action', function () {
      requestOtherPagesSocialGraphGeographicCrs({ 'unit_id': 123 }).should.eql({
        types: [
          constants.GEOGRAPHIC_CRS_REQUEST_START,
          constants.GEOGRAPHIC_CRS_REQUEST_SUCCESS,
          constants.GEOGRAPHIC_CRS_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: constants.SOCIAL_GRAPH_GEOGRAPHIC_CRS_API_URL,
            params: { 'unit_id': 123 },
            cancelToken: undefined,
          },
        },
      });
    });
  });

  describe('requestFirstPageSocialGraphGeographicTrrs', function () {
    it('should return the right action', function () {
      requestFirstPageSocialGraphGeographicTrrs({ 'unit_id': 123 }).should.eql({
        types: [
          constants.FIRST_PAGE_GEOGRAPHIC_TRRS_REQUEST_START,
          constants.FIRST_PAGE_GEOGRAPHIC_TRRS_REQUEST_SUCCESS,
          constants.FIRST_PAGE_GEOGRAPHIC_TRRS_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: constants.SOCIAL_GRAPH_GEOGRAPHIC_TRRS_API_URL,
            params: { 'unit_id': 123 },
            cancelToken: undefined,
          },
        },
      });
    });
  });

  describe('requestOtherPagesSocialGraphGeographicTrrs', function () {
    it('should return the right action', function () {
      requestOtherPagesSocialGraphGeographicTrrs({ 'unit_id': 123 }).should.eql({
        types: [
          constants.GEOGRAPHIC_TRRS_REQUEST_START,
          constants.GEOGRAPHIC_TRRS_REQUEST_SUCCESS,
          constants.GEOGRAPHIC_TRRS_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: constants.SOCIAL_GRAPH_GEOGRAPHIC_TRRS_API_URL,
            params: { 'unit_id': 123 },
            cancelToken: undefined,
          },
        },
      });
    });
  });

  describe('requestFirstPageSocialGraphGeographicCrsPreviewPane', function () {
    it('should return the right action', function () {
      requestFirstPageSocialGraphGeographicCrsPreviewPane({ 'unit_id': 123 }).should.eql({
        types: [
          constants.FIRST_PAGE_GEOGRAPHIC_CRS_PREVIEW_PANE_REQUEST_START,
          constants.FIRST_PAGE_GEOGRAPHIC_CRS_PREVIEW_PANE_REQUEST_SUCCESS,
          constants.FIRST_PAGE_GEOGRAPHIC_CRS_PREVIEW_PANE_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: constants.SOCIAL_GRAPH_GEOGRAPHIC_CRS_API_URL,
            params: { 'unit_id': 123, 'detail': true },
            cancelToken: undefined,
          },
        },
      });
    });
  });

  describe('requestOtherPagesSocialGraphGeographicCrsPreviewPane', function () {
    it('should return the right action', function () {
      requestOtherPagesSocialGraphGeographicCrsPreviewPane({ 'unit_id': 123 }).should.eql({
        types: [
          constants.GEOGRAPHIC_CRS_PREVIEW_PANE_REQUEST_START,
          constants.GEOGRAPHIC_CRS_PREVIEW_PANE_REQUEST_SUCCESS,
          constants.GEOGRAPHIC_CRS_PREVIEW_PANE_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: constants.SOCIAL_GRAPH_GEOGRAPHIC_CRS_API_URL,
            params: { 'unit_id': 123, 'detail': true },
            cancelToken: undefined,
          },
        },
      });
    });
  });

  describe('requestFirstPageSocialGraphGeographicTrrsPreviewPane', function () {
    it('should return the right action', function () {
      requestFirstPageSocialGraphGeographicTrrsPreviewPane({ 'unit_id': 123 }).should.eql({
        types: [
          constants.FIRST_PAGE_GEOGRAPHIC_TRRS_PREVIEW_PANE_REQUEST_START,
          constants.FIRST_PAGE_GEOGRAPHIC_TRRS_PREVIEW_PANE_REQUEST_SUCCESS,
          constants.FIRST_PAGE_GEOGRAPHIC_TRRS_PREVIEW_PANE_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: constants.SOCIAL_GRAPH_GEOGRAPHIC_TRRS_API_URL,
            params: { 'unit_id': 123, 'detail': true },
            cancelToken: undefined,
          },
        },
      });
    });
  });

  describe('requestOtherPagesSocialGraphGeographicTrrsPreviewPane', function () {
    it('should return the right action', function () {
      requestOtherPagesSocialGraphGeographicTrrsPreviewPane({ 'unit_id': 123 }).should.eql({
        types: [
          constants.GEOGRAPHIC_TRRS_PREVIEW_PANE_REQUEST_START,
          constants.GEOGRAPHIC_TRRS_PREVIEW_PANE_REQUEST_SUCCESS,
          constants.GEOGRAPHIC_TRRS_PREVIEW_PANE_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: constants.SOCIAL_GRAPH_GEOGRAPHIC_TRRS_API_URL,
            params: { 'unit_id': 123, 'detail': true },
            cancelToken: undefined,
          },
        },
      });
    });
  });

  describe('requestSocialGraphOfficers', function () {
    it('should return the right action', function () {
      requestSocialGraphOfficers({ 'unit_id': 123 }).should.eql({
        types: [
          constants.SOCIAL_GRAPH_OFFICERS_REQUEST_START,
          constants.SOCIAL_GRAPH_OFFICERS_REQUEST_SUCCESS,
          constants.SOCIAL_GRAPH_OFFICERS_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: constants.SOCIAL_GRAPH_OFFICERS_API_URL,
            params: { 'unit_id': 123 },
            cancelToken: undefined,
          },
        },
      });
    });
  });

  describe('updateSocialGraphTimelineIdx', function () {
    it('should return correct payload', function () {
      updateSocialGraphTimelineIdx(20).should.eql({
        type: constants.UPDATE_SOCIAL_GRAPH_TIMELINE_IDX,
        payload: 20,
      });
    });
  });

  describe('updateSocialGraphTimelineIdxFromTimelineTab', function () {
    it('should return correct payload', function () {
      updateSocialGraphTimelineIdxFromTimelineTab(20).should.eql({
        type: constants.UPDATE_SOCIAL_GRAPH_TIMELINE_IDX_FROM_TIMELINE_TAB,
        payload: 20,
      });
    });
  });

  describe('updateSocialGraphRefreshIntervalId', function () {
    it('should return correct payload', function () {
      updateSocialGraphRefreshIntervalId(1234).should.eql({
        type: constants.UPDATE_SOCIAL_GRAPH_REFRESH_INTERVAL_ID,
        payload: 1234,
      });
    });
  });
});
