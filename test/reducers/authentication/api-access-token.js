import should from 'should';
import { stub, assert } from 'sinon';
import Cookies from 'js-cookie';

import authenticationApiAccessToken from 'reducers/authentication/api-access-token';
import { SIGNIN_REQUEST_SUCCESS, RECEIVE_TOKEN_FROM_COOKIE, LOG_OUT } from 'utils/constants';


describe('authenticationApiAccessToken reducer', function () {
  it('should return initial state', function () {
    should(authenticationApiAccessToken(undefined, {})).be.null();
  });

  it('should set token on SIGNIN_REQUEST_SUCCESS', function () {
    const apiAccessToken = 'apiAccessToken';
    const setStub = stub(Cookies, 'set');
    authenticationApiAccessToken(undefined, {
      type: SIGNIN_REQUEST_SUCCESS,
      payload: { apiAccessToken }
    }).should.eql(apiAccessToken);
    setStub.restore();
    assert.calledWith(setStub, 'apiAccessToken', apiAccessToken, { expires: 30 });
  });

  it('should get token from cookies on RECEIVE_TOKEN_FROM_COOKIE', function () {
    stub(Cookies, 'get').withArgs('apiAccessToken').returns('apiAccessToken');
    authenticationApiAccessToken(undefined, {
      type: RECEIVE_TOKEN_FROM_COOKIE
    }).should.eql('apiAccessToken');
    Cookies.get.restore();
  });

  it('should return null on LOG_OUT', function () {
    const removeStub = stub(Cookies, 'remove');
    should(authenticationApiAccessToken(undefined, {
      type: LOG_OUT
    })).be.null();
    removeStub.restore();
    assert.calledWith(removeStub, 'apiAccessToken');
  });
});
