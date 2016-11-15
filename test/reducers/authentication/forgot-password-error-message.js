import should from 'should';
import { each } from 'lodash';

import authenticationForgotPasswordErrorMessage from 'reducers/authentication/forgot-password-error-message';
import {
  RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE, CLOSE_SIGNIN_MODAL,
  RESET_PASSWORD_REQUEST
} from 'actions/authentication';


describe('authenticationForgotPasswordErrorMessage reducer', function () {
  it('should return initial state', function () {
    should(authenticationForgotPasswordErrorMessage(undefined, {})).be.null();
  });

  it('should return message on RESET_PASSWORD_FAILURE', function () {
    const message = 'message';
    authenticationForgotPasswordErrorMessage(undefined, {
      type: RESET_PASSWORD_FAILURE,
      payload: { message }
    }).should.eql(message);
  });

  it('should return null on RESET_PASSWORD_SUCCESS, RESET_PASSWORD_REQUEST, CLOSE_SIGNIN_MODAL', function () {
    each([RESET_PASSWORD_SUCCESS, RESET_PASSWORD_REQUEST, CLOSE_SIGNIN_MODAL], (type) => {
      should(authenticationForgotPasswordErrorMessage(undefined, {
        type: type
      })).be.null();
    });
  });
});
