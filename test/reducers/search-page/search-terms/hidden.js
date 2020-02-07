import { LOCATION_CHANGE } from 'connected-react-router';

import hidden from 'reducers/search-page/search-terms/hidden';


describe('hidden reducer', function () {
  it('should return initial state', function () {
    hidden(undefined, {}).should.eql(true);
  });

  it('should toggle when received TOGGLE_SEARCH_TERMS', function () {
    hidden(false, {
      type: LOCATION_CHANGE,
      payload: {
        location: { pathname: '/search/' },
      },
    }).should.eql(true);

    hidden(true, {
      type: LOCATION_CHANGE,
      payload: {
        location: { pathname: '/search/terms/' },
      },
    }).should.eql(false);
  });
});
