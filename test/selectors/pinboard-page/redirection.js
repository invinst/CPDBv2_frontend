import {
  isInitiallyLoading,
  shouldRedirect,
} from 'selectors/pinboard-page/redirection';


describe('Redirection selectors', function () {
  describe('isInitiallyLoading', function () {
    it('should return correct status', function () {
      const state = {
        pinboardPage: {
          redirection: {
            initialLoading: false,
            redirect: false,
          }
        },
      };
      isInitiallyLoading(state).should.eql(false);
    });
  });

  describe('shouldRedirect', function () {
    it('should return correct status', function () {
      const state = {
        pinboardPage: {
          redirection: {
            initialLoading: false,
            redirect: false,
          }
        },
      };
      shouldRedirect(state).should.eql(false);
    });
  });
});
