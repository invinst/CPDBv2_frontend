import { isVideoModalActive } from 'selectors/video-modal';

describe('Video modal selectors', function () {
  describe('isVideoModalActive', function () {
    it('should return correct state', function () {
      isVideoModalActive({
        videoModal: {
          active: true
        }
      }).should.be.true();
    });
  });
});
