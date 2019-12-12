import cancelPathname from 'reducers/search-page/cancle-pathname';


describe('cancelPathname reducer', function () {
  it('should return initial state', function () {
    cancelPathname(undefined, {}).should.equal('/');
  });

  it('should change to pinboard pathname when @@router/LOCATION_CHANGE to pinboard page', function () {
    const action = {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: '/pinboard/123abc/pinboard-title/',
      },
    };

    cancelPathname('/', action).should.equal('/pinboard/123abc/pinboard-title/');
  });

  it('should remain unchanged when @@router/LOCATION_CHANGE on search page', function () {
    const action = {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: '/search/?terms=Edward%20May',
      },
    };

    cancelPathname('/pinboard/123abc/pinboard-title/', action).should.equal('/pinboard/123abc/pinboard-title/');
  });

  it('should change to officer page when @@router/LOCATION_CHANGE to officer page', function () {
    const action = {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: '/officer/123/',
      },
    };

    cancelPathname('/pinboard/123abc/pinboard-title/', action).should.equal('/officer/123/');
  });
});
