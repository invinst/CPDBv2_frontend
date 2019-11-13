import {
  signIn, resetPassword, openForgotPasswordModal, closeForgotPasswordModal, receiveTokenFromCookie, logOut,
} from 'actions/authentication';
import { SIGNIN_REQUEST, SIGNIN_REQUEST_SUCCESS, SIGNIN_REQUEST_FAILURE,
  RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE,
  OPEN_FORGOT_PASSWORD_MODAL, CLOSE_FORGOT_PASSWORD_MODAL, RECEIVE_TOKEN_FROM_COOKIE,
  RESET_PASSWORD_URL, SIGNIN_URL, LOG_OUT,
} from 'utils/constants';


describe('authentication actions', function () {
  describe('signIn action', function () {
    it('should return correct action', function () {
      const data = 'data';
      signIn(data).should.eql({
        types: [SIGNIN_REQUEST, SIGNIN_REQUEST_SUCCESS, SIGNIN_REQUEST_FAILURE],
        payload: {
          request: {
            url: SIGNIN_URL,
            adapter: null,
            data: data,
            method: 'post',
            cancelToken: undefined,
          },
        },
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
            adapter: null,
            data: data,
            method: 'post',
            cancelToken: undefined,
          },
        },
      });
    });
  });

  describe('openForgotPasswordModal', function () {
    it('should return right action', function () {
      openForgotPasswordModal().should.eql({
        type: OPEN_FORGOT_PASSWORD_MODAL,
        payload: undefined,
      });
    });
  });

  describe('closeForgotPasswordModal', function () {
    it('should return right action', function () {
      closeForgotPasswordModal().should.eql({
        type: CLOSE_FORGOT_PASSWORD_MODAL,
        payload: undefined,
      });
    });
  });

  describe('receiveTokenFromCookie', function () {
    it('should return right action', function () {
      receiveTokenFromCookie().should.eql({
        type: RECEIVE_TOKEN_FROM_COOKIE,
        payload: undefined,
      });
    });
  });

  describe('logOut', function () {
    it('should return right action', function () {
      logOut().should.eql({
        type: LOG_OUT,
        payload: undefined,
      });
    });
  });
});
