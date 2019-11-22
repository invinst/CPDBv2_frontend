import showLoginModalSelector from 'selectors/login-modal/show-login-modal';


describe('showLoginModalSelector', function () {
  it('should show login modal when not signed in and edit mode on', function () {
    const state = {
      authentication: {
        apiAccessToken: null,
      },
    };
    const props = {
      location: {
        pathname: '/edit/',
      },
    };
    showLoginModalSelector(state, props).should.be.true();
  });

  it('should not show login modal when signed in', function () {
    const state = {
      authentication: {
        apiAccessToken: '123',
      },
    };
    const props = {
      location: {
        pathname: '/edit/',
      },
    };
    showLoginModalSelector(state, props).should.be.false();
  });

  it('should not show login modal when not on edit path', function () {
    const state = {
      authentication: {
        apiAccessToken: null,
      },
    };
    const props = {
      location: {
        pathname: '/abc/',
      },
    };
    showLoginModalSelector(state, props).should.be.false();
  });

  it('should show login modal when on pinboard admin path', function () {
    const state = {
      authentication: {
        apiAccessToken: null,
      },
    };
    showLoginModalSelector(state, {
      location: {
        pathname: '/view-all-pinboards/',
      },
    }).should.be.true();
    showLoginModalSelector(state, {
      location: {
        pathname: '/edit/view-all-pinboards/',
      },
    }).should.be.true();
  });

  it('should not show login modal when on pinboard admin path but signed in', function () {
    const state = {
      authentication: {
        apiAccessToken: '123',
      },
    };
    showLoginModalSelector(state, {
      location: {
        pathname: '/view-all-pinboards/',
      },
    }).should.be.false();
    showLoginModalSelector(state, {
      location: {
        pathname: '/edit/view-all-pinboards/',
      },
    }).should.be.false();
  });
});
