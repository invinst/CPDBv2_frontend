import { LOCATION_CHANGE } from 'connected-react-router';

import cancelPathname from 'reducers/search-page/cancel-pathname';


describe('cancelPathname reducer', function () {
  it('should return initial state', function () {
    cancelPathname(undefined, {}).should.equal('/');
  });

  it('should change to pinboard pathname when LOCATION_CHANGE to pinboard page', function () {
    const action = {
      type: LOCATION_CHANGE,
      payload: {
        location: { pathname: '/pinboard/123abc/pinboard-title/' },
      },
    };

    cancelPathname('/', action).should.equal('/pinboard/123abc/pinboard-title/');
  });

  it('should remain unchanged when LOCATION_CHANGE on search page', function () {
    const action = {
      type: LOCATION_CHANGE,
      payload: {
        location: { pathname: '/search/?terms=Edward%20May' },
      },
    };

    cancelPathname('/pinboard/123abc/pinboard-title/', action).should.equal('/pinboard/123abc/pinboard-title/');
  });

  it('should remain unchanged when LOCATION_CHANGE on search page edit mode', function () {
    const action = {
      type: LOCATION_CHANGE,
      payload: {
        location: { pathname: '/edit/search/?terms=Edward%20May' },
      },
    };

    cancelPathname('/pinboard/123abc/pinboard-title/', action).should.equal('/pinboard/123abc/pinboard-title/');
  });

  it('should change to officer page when LOCATION_CHANGE to officer page', function () {
    const action = {
      type: LOCATION_CHANGE,
      payload: {
        location: { pathname: '/officer/123/' },
      },
    };

    cancelPathname('/pinboard/123abc/pinboard-title/', action).should.equal('/officer/123/');
  });
});
