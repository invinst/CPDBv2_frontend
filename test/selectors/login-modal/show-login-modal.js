import showLoginModalSelector from 'selectors/login-modal/show-login-modal';


describe('showLoginModalSelector', function () {
  it('should show login modal when not signed in and edit mode on', function () {
    const state = {
      authentication: {
        apiAccessToken: null,
      },
      pathname: '/edit/',
    };

    showLoginModalSelector(state).should.be.true();
  });

  it('should not show login modal when signed in', function () {
    const state = {
      authentication: {
        apiAccessToken: '123',
      },
      pathname: '/edit/',
    };

    showLoginModalSelector(state).should.be.false();
  });

  it('should not show login modal when not on edit path', function () {
    const state = {
      authentication: {
        apiAccessToken: null,
      },
      pathname: '/abc/',
    };

    showLoginModalSelector(state).should.be.false();
  });

  it('should show login modal when on pinboard admin path', function () {
    showLoginModalSelector(
      {
        authentication: {
          apiAccessToken: null,
        },
        pathname: '/view-all-pinboards/',
      },
    ).should.be.true();

    showLoginModalSelector(
      {
        authentication: {
          apiAccessToken: null,
        },
        pathname: '/edit/view-all-pinboards/',
      },
    ).should.be.true();
  });

  it('should not show login modal when on pinboard admin path but signed in', function () {
    showLoginModalSelector(
      {
        authentication: {
          apiAccessToken: '123',
        },
        pathname: '/view-all-pinboards/',
      }
    ).should.be.false();

    showLoginModalSelector(
      {
        authentication: {
          apiAccessToken: '123',
        },
        pathname: '/edit/view-all-pinboards/',
      }
    ).should.be.false();
  });
});
