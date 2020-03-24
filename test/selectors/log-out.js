import { showLogOutButton } from 'selectors/log-out';


describe('Log out selector', function () {
  describe('showLogOutButton', function () {
    it('should return false when user is not signed in', function () {
      const state = {
        authentication: {
          apiAccessToken: null,
        },
        pathname: '/edit/abc',
      };

      showLogOutButton(state).should.be.false();
    });

    it('should return false when edit mode is false', function () {
      const state = {
        authentication: {
          apiAccessToken: 'token',
        },
        pathname: '/abc',
      };

      showLogOutButton(state).should.be.false();
    });

    it('should return true when user is signed in and edit mode is on', function () {
      const state = {
        authentication: {
          apiAccessToken: 'token',
        },
        pathname: '/edit/abc',
      };

      showLogOutButton(state).should.be.true();
    });
  });
});
