import { OPEN_VIDEO_MODAL, CLOSE_VIDEO_MODAL } from 'utils/constants';
import active from 'reducers/video-modal/active';


describe('isRequesting reducer', function () {
  it('should return initial state', function () {
    active(undefined, {}).should.be.false();
  });

  it('should handle OPEN_VIDEO_MODAL', function () {
    active(undefined, {
      type: OPEN_VIDEO_MODAL,
    }).should.be.true();
  });

  it('should handle CLOSE_VIDEO_MODAL', function () {
    active(true, {
      type: CLOSE_VIDEO_MODAL,
    }).should.be.false();
  });
});
