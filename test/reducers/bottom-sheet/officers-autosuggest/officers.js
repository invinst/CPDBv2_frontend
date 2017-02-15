import officers from 'reducers/bottom-sheet/officers-autosuggest/officers';
import { SEARCH_OFFICERS_REQUEST_SUCCESS } from 'utils/constants';

describe('officers reducer', function () {
  it('should return initial state', function () {
    officers(undefined, {}).should.eql([]);
  });

  it('should handle SEARCH_OFFICERS_REQUEST_SUCCESS', function () {
    const results = [{ id: 1, fullName: 'Foo' }, { id: 2, fullName: 'Bar' }];

    officers(undefined, {
      type: SEARCH_OFFICERS_REQUEST_SUCCESS,
      payload: { results }
    }).should.eql({ results });
  });
});
