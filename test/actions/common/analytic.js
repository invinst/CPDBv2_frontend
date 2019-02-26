import { trackingClickAttachment } from 'actions/common/analytic';
import {
  V2_ROOT_PATH,
  TRACKING_CLICK_ATTACHMENT_START,
  TRACKING_CLICK_ATTACHMENT_SUCCESS,
  TRACKING_CLICK_ATTACHMENT_FAILURE
} from 'utils/constants';


describe('analytic actions', function () {
  describe('trackingClickAttachment', function () {
    it('should return right action', function () {
      trackingClickAttachment({ attachmentId: '123456', sourcePage: 'CR Page', app: 'Frontend' }).should.eql({
        types: [TRACKING_CLICK_ATTACHMENT_START, TRACKING_CLICK_ATTACHMENT_SUCCESS, TRACKING_CLICK_ATTACHMENT_FAILURE],
        payload: {
          request: {
            url: `${V2_ROOT_PATH}attachment-tracking/`,
            data: {
              'accessed_from_page': 'CR Page',
              'app': 'Frontend',
              'attachment_id': '123456'
            },
            method: 'post',
            adapter: null
          }
        }
      });
    });
  });
});
