import { LOCATION_CHANGE } from 'connected-react-router';

import { CHANGE_SEARCH_QUERY } from 'utils/constants';
import query from 'reducers/search-page/query';


describe('isRequesting reducer', function () {
  it('should return initial state', function () {
    query(undefined, {}).should.eql('');
  });

  it('should handle CHANGE_SEARCH_QUERY', function () {
    query(null, {
      type: CHANGE_SEARCH_QUERY,
      payload: 'john',
    }).should.eql('john');
  });

  it('should handle CHANGE_SEARCH_QUERY with prefix', function () {
    query(null, {
      type: CHANGE_SEARCH_QUERY,
      payload: 'officer:jerome',
    }).should.eql('jerome');
  });

  it('should handle LOCATION_CHANGE with terms', function () {
    query(null, {
      type: LOCATION_CHANGE,
      payload: {
        location: {
          search: 'terms=new term',
        },
      },
    }).should.eql('new term');
  });

  it('should handle LOCATION_CHANGE with prefix terms', function () {
    query(null, {
      type: LOCATION_CHANGE,
      payload: {
        location: {
          search: 'terms=cr:123456',
        },
      },
    }).should.eql('123456');
  });

  it('should handle LOCATION_CHANGE with pathname is /', function () {
    query('query', {
      type: LOCATION_CHANGE,
      payload: {
        location: {
          pathname: '/',
        },
      },
    }).should.eql('');
  });

  it('should handle LOCATION_CHANGE with pathname is not / and terms is empty', function () {
    query('query', {
      type: LOCATION_CHANGE,
      payload: {
        location: {
          pathname: '/officer/123/',
        },
      },
    }).should.eql('query');
  });
});
