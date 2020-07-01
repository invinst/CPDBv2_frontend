import should from 'should';
import { LOCATION_CHANGE } from 'connected-react-router';

import { SELECT_TAG, CHANGE_SEARCH_QUERY } from 'utils/constants';
import contentType from 'reducers/search-page/content-type';


describe('searchPage.contentType reducer', function () {
  it('should have initial state', function () {
    (contentType(undefined, {}) === null).should.be.true();
  });

  it('should handle SELECT_TAG', function () {
    contentType(undefined, {
      type: SELECT_TAG,
      payload: 'a',
    }).should.equal('a');
  });

  it('should handle CHANGE_SEARCH_QUERY with payload match SEARCH_QUERY_PREFIX_REGEX', function () {
    contentType(undefined, {
      type: CHANGE_SEARCH_QUERY,
      payload: 'officer:123',
    }).should.equal('OFFICER');
  });

  it('should handle CHANGE_SEARCH_QUERY with payload does not match SEARCH_QUERY_PREFIX_REGEX', function () {
    should(contentType(undefined, {
      type: CHANGE_SEARCH_QUERY,
      payload: 'abc:123',
    })).be.null();
  });

  it('should handle LOCATION_CHANGE with terms match SEARCH_QUERY_PREFIX_REGEX', function () {
    contentType(undefined, {
      type: LOCATION_CHANGE,
      payload: {
        location: {
          search: 'q=officer:123',
        },
      },
    }).should.eql('OFFICER');

    contentType(undefined, {
      type: LOCATION_CHANGE,
      payload: {
        location: {
          search: 'terms=officer:123',
        },
      },
    }).should.eql('OFFICER');
  });

  it('should handle LOCATION_CHANGE with terms does not match SEARCH_QUERY_PREFIX_REGEX', function () {
    should(contentType(undefined, {
      type: LOCATION_CHANGE,
      payload: {
        location: {
          search: 'q=abc:123',
        },
      },
    })).be.null();
  });

  it('should handle LOCATION_CHANGE with correct contentType', function () {
    contentType(undefined, {
      type: LOCATION_CHANGE,
      payload: {
        location: {
          search: 'type=COMMUNITY',
        },
      },
    }).should.eql('COMMUNITY');
  });

  it('should handle LOCATION_CHANGE with wrong contentType', function () {
    contentType(undefined, {
      type: LOCATION_CHANGE,
      payload: {
        location: {
          search: 'type=COMMUNITY',
        },
      },
    }).should.eql('COMMUNITY');
  });
});
