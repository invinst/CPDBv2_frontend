import nodes from 'reducers/officer-page/social-graph/nodes';

import { OFFICER_SOCIAL_GRAPH_REQUEST_SUCCESS } from 'utils/constants';


describe('nodes reducer', function () {
  it('should return initial state', function () {
    nodes(undefined, {}).should.eql([]);
  });

  it('should handle OFFICER_SOCIAL_GRAPH_REQUEST_SUCCESS', function () {
    const action = {
      type: OFFICER_SOCIAL_GRAPH_REQUEST_SUCCESS,
      payload: { 'nodes': [{ id: 1 }, { id: 2 }] }
    };
    nodes([], action).should.eql([{ id: 1 }, { id: 2 }]);
  });
});
