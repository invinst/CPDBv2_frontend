import { CHANGE_SEARCH_QUERY } from 'utils/constants';
import query from 'reducers/search-page/query';
import { LOCATION_CHANGE } from 'utils/constants';


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

  it('should handle LOCATION_CHANGE', function () {
    query(null, {
      type: LOCATION_CHANGE,
      payload: {
        query: {
          terms: 'new term',
        },
      },
    }).should.eql('new term');
  });
});
