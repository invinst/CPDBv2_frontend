import {
  requestSocialGraphNetwork,
  requestSocialGraphAllegations,
  requestSocialGraphGeographic,
  requestSocialGraphOfficers,
} from 'actions/social-graph-page';
import {
  SOCIAL_GRAPH_NETWORK_API_URL,
  SOCIAL_GRAPH_ALLEGATIONS_API_URL,
  SOCIAL_GRAPH_GEOGRAPHIC_API_URL,
  SOCIAL_GRAPH_OFFICERS_API_URL,
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
  SOCIAL_GRAPH_OFFICERS_REQUEST_FAILURE

} from 'utils/constants';


describe('socialGraph actions', function () {
  describe('requestSocialGraphNetwork', function () {
    it('should return the right action', function () {
      requestSocialGraphNetwork({ 'unit_id': 123, 'threshold': 2, 'show_civil_only': true }).should.eql({
        types: [
          SOCIAL_GRAPH_NETWORK_REQUEST_START,
          SOCIAL_GRAPH_NETWORK_REQUEST_SUCCESS,
          SOCIAL_GRAPH_NETWORK_REQUEST_FAILURE]
        ,
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
});
