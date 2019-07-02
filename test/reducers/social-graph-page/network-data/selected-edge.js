import should from 'should';

import selectedEdge from 'reducers/social-graph-page/network-data/selected-edge';
import { UPDATE_SELECTED_OFFICER_ID, UPDATE_SOCIAL_GRAPH_SELECTED_EDGE } from 'utils/constants';


describe('selectedEdge reducer', function () {
  it('should return initial state', function () {
    should(selectedEdge(undefined, {})).be.null();
  });

  it('should handle UPDATE_SOCIAL_GRAPH_SELECTED_EDGE', function () {
    selectedEdge([], {
      type: UPDATE_SOCIAL_GRAPH_SELECTED_EDGE,
      payload: 123
    }).should.eql(123);
  });

  it('should handle UPDATE_SELECTED_OFFICER_ID', function () {
    should(selectedEdge([], {
      type: UPDATE_SELECTED_OFFICER_ID,
      payload: 123
    })).be.null();
  });
});

