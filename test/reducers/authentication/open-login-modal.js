import { OPEN_LOGIN_MODAL, CLOSE_LOGIN_MODAL, SIGNIN_REQUEST_SUCCESS } from 'utils/constants';
import openLoginModal from 'reducers/authentication/open-login-modal';


describe('openLoginModal reducer', function () {
  it('should return initial state', function () {
    openLoginModal(undefined, {}).should.be.false();
  });

  it('should handle OPEN_VIDEO_MODAL', function () {
    openLoginModal(undefined, {
      type: OPEN_LOGIN_MODAL,
    }).should.be.true();
  });

  it('should handle CLOSE_VIDEO_MODAL', function () {
    openLoginModal(true, {
      type: CLOSE_LOGIN_MODAL,
    }).should.be.false();
  });

  it('should handle SIGNIN_REQUEST_SUCCESS', function () {
    openLoginModal(true, {
      type: SIGNIN_REQUEST_SUCCESS,
    }).should.be.false();
  });
});
