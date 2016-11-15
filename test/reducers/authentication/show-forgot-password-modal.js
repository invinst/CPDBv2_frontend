import { each } from 'lodash';

import authenticationShowForgotPasswordModal from 'reducers/authentication/show-forgot-password-modal';
import {
  OPEN_SIGNIN_MODAL, OPEN_FORGOT_PASSWORD_MODAL, CLOSE_FORGOT_PASSWORD_MODAL,
  RESET_PASSWORD_SUCCESS
} from 'actions/authentication';


describe('authenticationShowForgotPasswordModal reducer', function () {
  it('should return initial state', function () {
    authenticationShowForgotPasswordModal(undefined, {}).should.be.false();
  });

  it('should return true on OPEN_FORGOT_PASSWORD_MODAL', function () {
    authenticationShowForgotPasswordModal(undefined, {
      type: OPEN_FORGOT_PASSWORD_MODAL
    }).should.be.true();
  });

  it('should return false on a bunch of actions', function () {
    each(
      [CLOSE_FORGOT_PASSWORD_MODAL, OPEN_SIGNIN_MODAL, RESET_PASSWORD_SUCCESS, '@@router/LOCATION_CHANGE'],
      (type) => {
        authenticationShowForgotPasswordModal(undefined, {
          type: type
        }).should.be.false();
      }
    );
  });
});
