import {
  requestSocialGraphNetwork,
  requestSocialGraphAllegations,
  requestSocialGraphGeographic,
  requestSocialGraphOfficers,
  updateSocialGraphTimelineIdx,
  updateSocialGraphTimelineIdxFromTimelineTab,
  updateSocialGraphRefreshIntervalId,
  requestSocialGraphGeographicPreviewPane,
} from 'actions/social-graph-page';
import {
  SOCIAL_GRAPH_NETWORK_API_URL,
  SOCIAL_GRAPH_ALLEGATIONS_API_URL,
  SOCIAL_GRAPH_GEOGRAPHIC_API_URL,
  SOCIAL_GRAPH_OFFICERS_API_URL,
  SOCIAL_GRAPH_DETAIL_GEOGRAPHIC_API_URL,
  SOCIAL_GRAPH_NETWORK_REQUEST_START,
  SOCIAL_GRAPH_NETWORK_REQUEST_SUCCESS,
  SOCIAL_GRAPH_NETWORK_REQUEST_FAILURE,
  SOCIAL_GRAPH_ALLEGATIONS_REQUEST_START,
  SOCIAL_GRAPH_ALLEGATIONS_REQUEST_SUCCESS,
  SOCIAL_GRAPH_ALLEGATIONS_REQUEST_FAILURE,
  SOCIAL_GRAPH_GEOGRAPHIC_REQUEST_START,
  SOCIAL_GRAPH_GEOGRAPHIC_REQUEST_SUCCESS,
  SOCIAL_GRAPH_GEOGRAPHIC_REQUEST_FAILURE,
  SOCIAL_GRAPH_OFFICERS_REQUEST_START,
  SOCIAL_GRAPH_OFFICERS_REQUEST_SUCCESS,
  SOCIAL_GRAPH_OFFICERS_REQUEST_FAILURE,
  UPDATE_SOCIAL_GRAPH_TIMELINE_IDX,
  UPDATE_SOCIAL_GRAPH_TIMELINE_IDX_FROM_TIMELINE_TAB,
  UPDATE_SOCIAL_GRAPH_REFRESH_INTERVAL_ID,
  SOCIAL_GRAPH_GEOGRAPHIC_PREVIEW_PANE_REQUEST_START,
  SOCIAL_GRAPH_GEOGRAPHIC_PREVIEW_PANE_REQUEST_SUCCESS,
  SOCIAL_GRAPH_GEOGRAPHIC_PREVIEW_PANE_REQUEST_FAILURE,
} from 'utils/constants';


describe('socialGraph actions', function () {
  describe('requestSocialGraphNetwork', function () {
    it('should return the right action', function () {
      requestSocialGraphNetwork({ 'unit_id': 123, 'threshold': 2, 'show_civil_only': true }).should.eql({
        types: [
          SOCIAL_GRAPH_NETWORK_REQUEST_START,
          SOCIAL_GRAPH_NETWORK_REQUEST_SUCCESS,
          SOCIAL_GRAPH_NETWORK_REQUEST_FAILURE
        ],
        payload: {
          request: {
            url: SOCIAL_GRAPH_NETWORK_API_URL,
            params: { 'unit_id': 123, 'threshold': 2, 'show_civil_only': true },
            adapter: null,
            cancelToken: undefined,
          }
        }
      });
    });
  });

  describe('requestSocialGraphAllegations', function () {
    it('should return the right action', function () {
      requestSocialGraphAllegations({ 'unit_id': 123, 'threshold': 2, 'show_civil_only': true }).should.eql({
        types: [
          SOCIAL_GRAPH_ALLEGATIONS_REQUEST_START,
          SOCIAL_GRAPH_ALLEGATIONS_REQUEST_SUCCESS,
          SOCIAL_GRAPH_ALLEGATIONS_REQUEST_FAILURE
        ],
        payload: {
          request: {
            url: SOCIAL_GRAPH_ALLEGATIONS_API_URL,
            params: { 'unit_id': 123, 'threshold': 2, 'show_civil_only': true },
            adapter: null,
            cancelToken: undefined,
          }
        }
      });
    });
  });

  describe('requestSocialGraphGeographic', function () {
    it('should return the right action', function () {
      requestSocialGraphGeographic({ 'unit_id': 123 }).should.eql({
        types: [
          SOCIAL_GRAPH_GEOGRAPHIC_REQUEST_START,
          SOCIAL_GRAPH_GEOGRAPHIC_REQUEST_SUCCESS,
          SOCIAL_GRAPH_GEOGRAPHIC_REQUEST_FAILURE
        ],
        payload: {
          request: {
            url: SOCIAL_GRAPH_GEOGRAPHIC_API_URL,
            params: { 'unit_id': 123 },
            adapter: null,
            cancelToken: undefined,
          }
        }
      });
    });
  });

  describe('requestSocialGraphGeographicPreviewPane', function () {
    it('should return the right action', function () {
      requestSocialGraphGeographicPreviewPane({ 'unit_id': 123 }).should.eql({
        types: [
          SOCIAL_GRAPH_GEOGRAPHIC_PREVIEW_PANE_REQUEST_START,
          SOCIAL_GRAPH_GEOGRAPHIC_PREVIEW_PANE_REQUEST_SUCCESS,
          SOCIAL_GRAPH_GEOGRAPHIC_PREVIEW_PANE_REQUEST_FAILURE
        ],
        payload: {
          request: {
            url: SOCIAL_GRAPH_DETAIL_GEOGRAPHIC_API_URL,
            params: { 'unit_id': 123 },
            adapter: null,
            cancelToken: undefined,
          }
        }
      });
    });
  });

  describe('requestSocialGraphOfficers', function () {
    it('should return the right action', function () {
      requestSocialGraphOfficers({ 'unit_id': 123 }).should.eql({
        types: [
          SOCIAL_GRAPH_OFFICERS_REQUEST_START,
          SOCIAL_GRAPH_OFFICERS_REQUEST_SUCCESS,
          SOCIAL_GRAPH_OFFICERS_REQUEST_FAILURE
        ],
        payload: {
          request: {
            url: SOCIAL_GRAPH_OFFICERS_API_URL,
            params: { 'unit_id': 123 },
            adapter: null,
            cancelToken: undefined,
          }
        }
      });
    });
  });

  describe('updateSocialGraphTimelineIdx', function () {
    it('should return correct payload', function () {
      updateSocialGraphTimelineIdx(20).should.eql({
        type: UPDATE_SOCIAL_GRAPH_TIMELINE_IDX,
        payload: 20
      });
    });
  });

  describe('updateSocialGraphTimelineIdxFromTimelineTab', function () {
    it('should return correct payload', function () {
      updateSocialGraphTimelineIdxFromTimelineTab(20).should.eql({
        type: UPDATE_SOCIAL_GRAPH_TIMELINE_IDX_FROM_TIMELINE_TAB,
        payload: 20
      });
    });
  });

  describe('updateSocialGraphRefreshIntervalId', function () {
    it('should return correct payload', function () {
      updateSocialGraphRefreshIntervalId(1234).should.eql({
        type: UPDATE_SOCIAL_GRAPH_REFRESH_INTERVAL_ID,
        payload: 1234
      });
    });
  });
});
