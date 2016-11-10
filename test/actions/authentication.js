import {
  signIn, resetPassword, openForgotPasswordModal, closeForgotPasswordModal, receiveTokenFromCookie,
  SIGNIN_REQUEST, SIGNIN_REQUEST_SUCCESS, SIGNIN_REQUEST_FAILURE, SIGNIN_URL,
  RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE, RESET_PASSWORD_URL,
  OPEN_FORGOT_PASSWORD_MODAL, CLOSE_FORGOT_PASSWORD_MODAL, RECEIVE_TOKEN_FROM_COOKIE
} from 'actions/authentication';


describe('authentication actions', function () {
  describe('signIn action', function () {
    it('should return correct action', function () {
      const data = 'data';
      signIn(data).should.eql({
        types: [SIGNIN_REQUEST, SIGNIN_REQUEST_SUCCESS, SIGNIN_REQUEST_FAILURE],
        payload: {
          request: {
            url: SIGNIN_URL,
            adapter: undefined,
            data: data,
            method: 'POST'
          }
        }
      });
    });
  });

  describe('resetPassword action', function () {
    it('should return correct action', function () {
      const data = 'data';
      resetPassword(data).should.eql({
        types: [RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE],
        payload: {
          request: {
            url: RESET_PASSWORD_URL,
            adapter: undefined,
            data: data,
            method: 'POST'
          }
        }
      });
    });
  });

  describe('openForgotPasswordModal', function () {
    it('should return right action', function () {
      openForgotPasswordModal().should.eql({
        type: OPEN_FORGOT_PASSWORD_MODAL,
        payload: undefined
      });
    });
  });

  describe('closeForgotPasswordModal', function () {
    it('should return right action', function () {
      closeForgotPasswordModal().should.eql({
        type: CLOSE_FORGOT_PASSWORD_MODAL,
        payload: undefined
      });
    });
  });

  describe('receiveTokenFromCookie', function () {
    it('should return right action', function () {
      receiveTokenFromCookie().should.eql({
        type: RECEIVE_TOKEN_FROM_COOKIE,
        payload: undefined
      });
    });
  });
});
