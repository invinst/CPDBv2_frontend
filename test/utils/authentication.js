import Cookies from 'js-cookie';
import sinon from 'sinon';

import { isSignedIn } from 'utils/authentication';


describe('authentication selector', function () {
  describe('isSignedIn', function () {
    it('should return true if apiAccessToken is not empty', function () {
      sinon.stub(Cookies, 'get').withArgs('apiAccessToken').returns('apiAccessToken');
      isSignedIn().should.be.true();
    });

    it('should return false if apiAccessToken is empty', function () {
      sinon.stub(Cookies, 'get').withArgs('apiAccessToken').returns(null);
      isSignedIn().should.be.false();
    });
  });
});
