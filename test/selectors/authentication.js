import { isSignedIn } from 'selectors/authentication';

describe('authentication selectors', function () {
  describe('isSignedIn', function () {
    it('should return true when there is apiAccessToken', function () {
      isSignedIn({
        authentication: {
          apiAccessToken: 'abcdefgh12345678',
        },
      }).should.be.true();
    });
    it('should return false when there is no apiAccessToken', function () {
      isSignedIn({
        authentication: {
          apiAccessToken: null,
        },
      }).should.be.false();
    });
  });
});
