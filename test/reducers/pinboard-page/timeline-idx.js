import timelineIdx from 'reducers/pinboard-page/timeline_idx';
import { UPDATE_PINBOARD_TIMELINE_IDX } from 'utils/constants';


describe('timelineIdx reducer', function () {
  it('should have initial state', function () {
    timelineIdx(undefined, {}).should.eql(0);
  });

  it('should handle UPDATE_PINBOARD_TIMELINE_IDX', function () {
    timelineIdx(19, {
      type: UPDATE_PINBOARD_TIMELINE_IDX,
      payload: 20,
    }).should.eql(20);
  });
});
