import should from 'should';

import requestingReducer from 'reducers/pinboard-page/graph-data/requesting';
import {
  PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_START,
  PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS,
  PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_FAILURE,
} from 'utils/constants';


describe('requestingReducer', function () {
  it('should have initial state', function () {
    should(requestingReducer(undefined, {})).be.false();
  });

  it('should handle PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_START', function () {
    requestingReducer(
      false,
      { type: PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_START }
    ).should.be.true();
  });

  it('should handle PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS', function () {
    requestingReducer(
      true,
      { type: PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS }
    ).should.be.false();
  });

  it('should handle PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_FAILURE', function () {
    requestingReducer(
      true,
      { type: PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_FAILURE }
    ).should.be.false();
  });
});
