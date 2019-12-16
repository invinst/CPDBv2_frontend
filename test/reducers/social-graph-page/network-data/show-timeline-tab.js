import showTimelineTab from 'reducers/social-graph-page/network-data/show-timeline-tab';
import { SOCIAL_GRAPH_ALLEGATIONS_REQUEST_SUCCESS } from 'utils/constants';


describe('showTimelineTab reducer', function () {
  it('should have initial state', function () {
    showTimelineTab(undefined, {}).should.be.true();
  });

  describe('should handle SOCIAL_GRAPH_ALLEGATIONS_REQUEST_SUCCESS', function () {
    it('should return false if payload is empty', function () {
      showTimelineTab(true, {
        type: SOCIAL_GRAPH_ALLEGATIONS_REQUEST_SUCCESS,
        payload: [],
      }).should.be.false();
    });

    it('should return true if payload is not empty', function () {
      showTimelineTab(true, {
        type: SOCIAL_GRAPH_ALLEGATIONS_REQUEST_SUCCESS,
        payload: [
          {
            'category': 'False Arrest',
            'crid': '1089128',
            'incident_date': '2018-02-01',
          },
        ],
      }).should.be.true();
    });
  });
});
