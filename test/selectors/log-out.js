import { showLogOutButton } from 'selectors/log-out';


describe('Log out selector', function () {
  describe('showLogOutButton', function () {
    it('should return false when user is not signed in', function () {
      const state = {
        authentication: {
          apiAccessToken: null,
        },
      };
      const props = {
        location: {
          pathname: '/edit/abc',
        },
      };

      showLogOutButton(state, props).should.be.false();
    });

    it('should return false when edit mode is false', function () {
      const state = {
        authentication: {
          apiAccessToken: 'token',
        },
      };
      const props = {
        location: {
          pathname: '/abc',
        },
      };

      showLogOutButton(state, props).should.be.false();
    });

    it('should return true when user is signed in and edit mode is on', function () {
      const state = {
        authentication: {
          apiAccessToken: 'token',
        },
      };
      const props = {
        location: {
          pathname: '/edit/abc',
        },
      };

      showLogOutButton(state, props).should.be.true();
    });


  });
});
