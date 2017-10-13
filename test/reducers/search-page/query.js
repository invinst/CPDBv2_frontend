import { CHANGE_SEARCH_QUERY } from 'actions/search-page';
import query from 'reducers/search-page/query';


describe('isRequesting reducer', function () {
  it('should return initial state', function () {
    query(undefined, {}).should.eql('');
  });

  it('should handle CHANGE_SEARCH_QUERY', function () {
    query(null, {
      type: CHANGE_SEARCH_QUERY,
      payload: 'john'
    }).should.eql('john');
  });
});
