import links from 'reducers/officer-page/social-graph/links';

import { OFFICER_SOCIAL_GRAPH_REQUEST_SUCCESS } from 'utils/constants';


describe('links action', function () {
  it('should return initial state', function () {
    links(undefined, {}).should.eql([]);
  });

  it('should handle OFFICER_SOCIAL_GRAPH_REQUEST_SUCCESS', function () {
    const action = {
      type: OFFICER_SOCIAL_GRAPH_REQUEST_SUCCESS,
      payload: { 'links': [{ source: 1, target: 2 }] }
    };
    links([], action).should.eql([{ source: 1, target: 2 }]);
  });
});
