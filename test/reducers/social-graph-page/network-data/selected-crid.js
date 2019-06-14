import should from 'should';

import selectedCrid from 'reducers/social-graph-page/network-data/selected-crid';
import {
  UPDATE_SELECTED_OFFICER_ID,
  UPDATE_SOCIAL_GRAPH_SELECTED_EDGE,
  UPDATE_SOCIAL_GRAPH_SELECTED_CRID,
} from 'utils/constants';


describe('selectedCrid reducer', function () {
  it('should return initial state', function () {
    should(selectedCrid(undefined, {})).be.null();
  });

  it('should handle UPDATE_SOCIAL_GRAPH_SELECTED_CRID', function () {
    selectedCrid([], {
      type: UPDATE_SOCIAL_GRAPH_SELECTED_CRID,
      payload: 123
    }).should.eql(123);
  });

  it('should handle UPDATE_SOCIAL_GRAPH_SELECTED_EDGE', function () {
    should(selectedCrid([], {
      type: UPDATE_SOCIAL_GRAPH_SELECTED_EDGE,
      payload: 123
    })).be.null();
  });

  it('should handle UPDATE_SELECTED_OFFICER_ID', function () {
    should(selectedCrid([], {
      type: UPDATE_SELECTED_OFFICER_ID,
      payload: 123
    })).be.null();
  });
});

