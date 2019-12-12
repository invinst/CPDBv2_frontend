import should from 'should';

import networkOfficersRequestingReducer from 'reducers/social-graph-page/network-data/network-officers-requesting';
import {
  SOCIAL_GRAPH_OFFICERS_REQUEST_START,
  SOCIAL_GRAPH_OFFICERS_REQUEST_SUCCESS,
  SOCIAL_GRAPH_OFFICERS_REQUEST_FAILURE,
} from 'utils/constants';


describe('networkOfficersRequestingReducer', function () {
  it('should have initial state', function () {
    should(networkOfficersRequestingReducer(undefined, {})).be.false();
  });

  it('should handle SOCIAL_GRAPH_OFFICERS_REQUEST_START', function () {
    networkOfficersRequestingReducer(
      false,
      { type: SOCIAL_GRAPH_OFFICERS_REQUEST_START }
    ).should.be.true();
  });

  it('should handle SOCIAL_GRAPH_OFFICERS_REQUEST_SUCCESS', function () {
    networkOfficersRequestingReducer(
      true,
      { type: SOCIAL_GRAPH_OFFICERS_REQUEST_SUCCESS }
    ).should.be.false();
  });

  it('should handle SOCIAL_GRAPH_OFFICERS_REQUEST_FAILURE', function () {
    networkOfficersRequestingReducer(
      true,
      { type: SOCIAL_GRAPH_OFFICERS_REQUEST_FAILURE }
    ).should.be.false();
  });
});
