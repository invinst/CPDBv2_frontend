import Cookies from 'js-cookie';
import { stub } from 'sinon';

import { isSignedInFromCookie } from 'utils/authentication';


describe('authentication selector', function () {
  describe('isSignedInFromCookie', function () {
    it('should return true if apiAccessToken is not empty', function () {
      stub(Cookies, 'get').withArgs('apiAccessToken').returns('apiAccessToken');
      isSignedInFromCookie().should.be.true();
    });

    it('should return false if apiAccessToken is empty', function () {
      stub(Cookies, 'get').withArgs('apiAccessToken').returns(null);
      isSignedInFromCookie().should.be.false();
    });
  });
});
