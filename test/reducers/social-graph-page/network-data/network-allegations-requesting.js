import should from 'should';

import networkAllegationsRequestingReducer
  from 'reducers/social-graph-page/network-data/network-allegations-requesting';
import {
  SOCIAL_GRAPH_ALLEGATIONS_REQUEST_START,
  SOCIAL_GRAPH_ALLEGATIONS_REQUEST_SUCCESS,
  SOCIAL_GRAPH_ALLEGATIONS_REQUEST_FAILURE,
} from 'utils/constants';


describe('networkAllegationsRequestingReducer', function () {
  it('should have initial state', function () {
    should(networkAllegationsRequestingReducer(undefined, {})).be.false();
  });

  it('should handle SOCIAL_GRAPH_ALLEGATIONS_REQUEST_START', function () {
    networkAllegationsRequestingReducer(
      false,
      { type: SOCIAL_GRAPH_ALLEGATIONS_REQUEST_START }
    ).should.be.true();
  });

  it('should handle SOCIAL_GRAPH_ALLEGATIONS_REQUEST_SUCCESS', function () {
    networkAllegationsRequestingReducer(
      true,
      { type: SOCIAL_GRAPH_ALLEGATIONS_REQUEST_SUCCESS }
    ).should.be.false();
  });

  it('should handle SOCIAL_GRAPH_ALLEGATIONS_REQUEST_FAILURE', function () {
    networkAllegationsRequestingReducer(
      true,
      { type: SOCIAL_GRAPH_ALLEGATIONS_REQUEST_FAILURE }
    ).should.be.false();
  });
});
