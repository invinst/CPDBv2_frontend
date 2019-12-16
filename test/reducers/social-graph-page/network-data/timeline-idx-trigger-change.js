import timelineIdxTriggerChange from 'reducers/social-graph-page/network-data/timeline-idx-trigger-change';
import { UPDATE_SOCIAL_GRAPH_TIMELINE_IDX } from 'utils/constants';


describe('timelineIdx reducer', function () {
  it('should return initial state', function () {
    timelineIdxTriggerChange(undefined, {}).should.eql(0);
  });

  it('should handle UPDATE_SOCIAL_GRAPH_TIMELINE_IDX when previous state is 0', function () {
    timelineIdxTriggerChange(0, {
      type: UPDATE_SOCIAL_GRAPH_TIMELINE_IDX,
      payload: 20,
    }).should.eql(1);
  });

  it('should handle UPDATE_SOCIAL_GRAPH_TIMELINE_IDX when previous state is 1', function () {
    timelineIdxTriggerChange(1, {
      type: UPDATE_SOCIAL_GRAPH_TIMELINE_IDX,
      payload: 20,
    }).should.eql(0);
  });
});
