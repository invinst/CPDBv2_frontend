import { closeVideoModal, openVideoModal } from 'actions/video-modal';
import { CLOSE_VIDEO_MODAL, OPEN_VIDEO_MODAL } from 'utils/constants';

describe('Video modal actions', function () {
  describe('openVideoModal', function () {
    it('should have correct type', function () {
      openVideoModal().should.eql({
        type: OPEN_VIDEO_MODAL,
        payload: undefined,
      });
    });
  });
  describe('closeVideoModal', function () {
    it('should have correct type', function () {
      closeVideoModal().should.eql({
        type: CLOSE_VIDEO_MODAL,
        payload: undefined,
      });
    });
  });
});
