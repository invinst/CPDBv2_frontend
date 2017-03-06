import should from 'should';
import { each } from 'lodash';

import authenticationLoginErrorMessage from 'reducers/authentication/login-error-message';
import {
  SIGNIN_REQUEST, SIGNIN_REQUEST_FAILURE, SIGNIN_REQUEST_SUCCESS, RESET_PASSWORD_SUCCESS
} from 'utils/constants';


describe('authenticationLoginErrorMessage reducer', function () {
  it('should return initial state', function () {
    should(authenticationLoginErrorMessage(undefined, {})).be.null();
  });

  it('should return message on SIGNIN_REQUEST_FAILURE', function () {
    const message = 'message';
    authenticationLoginErrorMessage(undefined, {
      type: SIGNIN_REQUEST_FAILURE,
      payload: { message }
    }).should.eql(message);
  });

  it('should return null on a bunch of actions', function () {
    each([SIGNIN_REQUEST, SIGNIN_REQUEST_SUCCESS, RESET_PASSWORD_SUCCESS], (type) => {
      should(authenticationLoginErrorMessage(undefined, {
        type: type
      })).be.null();
    });
  });
});
