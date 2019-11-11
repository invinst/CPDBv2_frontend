import authentication from 'reducers/authentication';


describe('authentication reducer', function () {
  it('should return initial state', function () {
    authentication(undefined, {}).should.eql({
      loginErrorMessage: null,
      loginSuccessMessage: null,
      forgotPasswordErrorMessage: null,
      apiAccessToken: null,
      showForgotPasswordModal: false,
    });
  });
});
