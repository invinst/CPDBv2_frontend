import timelineIdx from 'reducers/social-graph-page/network-data/timeline-idx';
import {
  UPDATE_SOCIAL_GRAPH_TIMELINE_IDX,
  UPDATE_SOCIAL_GRAPH_TIMELINE_IDX_FROM_TIMELINE_TAB,
} from 'utils/constants';


describe('timelineIdx reducer', function () {
  it('should return initial state', function () {
    timelineIdx(undefined, {}).should.eql(0);
  });

  it('should handle UPDATE_SOCIAL_GRAPH_TIMELINE_IDX', function () {
    timelineIdx(19, {
      type: UPDATE_SOCIAL_GRAPH_TIMELINE_IDX,
      payload: 20
    }).should.eql(20);
  });

  it('should handle UPDATE_SOCIAL_GRAPH_TIMELINE_IDX_FROM_TIMELINE_TAB', function () {
    timelineIdx(19, {
      type: UPDATE_SOCIAL_GRAPH_TIMELINE_IDX_FROM_TIMELINE_TAB,
      payload: 20
    }).should.eql(20);
  });
});

