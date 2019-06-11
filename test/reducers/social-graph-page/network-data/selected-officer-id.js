import should from 'should';

import selectedOfficerId from 'reducers/social-graph-page/network-data/selected-officer-id';
import { UPDATE_SELECTED_OFFICER_ID, UPDATE_SOCIAL_GRAPH_SELECTED_EDGE } from 'utils/constants';


describe('selectedOfficerId reducer', function () {
  it('should return initial state', function () {
    should(selectedOfficerId(undefined, {})).be.null();
  });

  it('should handle UPDATE_SELECTED_OFFICER_ID', function () {
    selectedOfficerId([], {
      type: UPDATE_SELECTED_OFFICER_ID,
      payload: 123
    }).should.eql(123);
  });

  it('should handle UPDATE_SOCIAL_GRAPH_SELECTED_EDGE', function () {
    should(selectedOfficerId([], {
      type: UPDATE_SOCIAL_GRAPH_SELECTED_EDGE,
      payload: 123
    })).be.null();
  });
});

