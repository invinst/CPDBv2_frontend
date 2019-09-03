import should from 'should';
import { each } from 'lodash';

import authenticationLoginSuccessMessage from 'reducers/authentication/login-success-message';
import {
  SIGNIN_REQUEST, RESET_PASSWORD_SUCCESS, SIGNIN_REQUEST_SUCCESS, SIGNIN_REQUEST_FAILURE,
} from 'utils/constants';


describe('authenticationLoginSuccessMessage reducer', function () {
  it('should return initial state', function () {
    should(authenticationLoginSuccessMessage(undefined, {})).be.null();
  });

  it('should return message on RESET_PASSWORD_SUCCESS', function () {
    const message = 'message';
    authenticationLoginSuccessMessage(undefined, {
      type: RESET_PASSWORD_SUCCESS,
      payload: { message },
    }).should.eql(message);
  });

  it('should return null on a bunch of actions', function () {
    each(
      [SIGNIN_REQUEST, SIGNIN_REQUEST_SUCCESS, SIGNIN_REQUEST_FAILURE],
      (type) => {
        should(authenticationLoginSuccessMessage(undefined, {
          type: type,
        })).be.null();
      }
    );
  });
});
