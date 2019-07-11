import should from 'should';

import requestingReducer from 'reducers/social-graph-page/network-data/requesting';
import {
  SOCIAL_GRAPH_NETWORK_REQUEST_START,
  SOCIAL_GRAPH_NETWORK_REQUEST_SUCCESS,
  SOCIAL_GRAPH_NETWORK_REQUEST_FAILURE,
} from 'utils/constants';


describe('requestingReducer', function () {
  it('should have initial state', function () {
    should(requestingReducer(undefined, {})).be.false();
  });

  it('should handle SOCIAL_GRAPH_NETWORK_REQUEST_START', function () {
    requestingReducer(
      false,
      { type: SOCIAL_GRAPH_NETWORK_REQUEST_START }
    ).should.be.true();
  });

  it('should handle SOCIAL_GRAPH_NETWORK_REQUEST_SUCCESS', function () {
    requestingReducer(
      true,
      { type: SOCIAL_GRAPH_NETWORK_REQUEST_SUCCESS }
    ).should.be.false();
  });

  it('should handle SOCIAL_GRAPH_NETWORK_REQUEST_FAILURE', function () {
    requestingReducer(
      true,
      { type: SOCIAL_GRAPH_NETWORK_REQUEST_FAILURE }
    ).should.be.false();
  });
});
