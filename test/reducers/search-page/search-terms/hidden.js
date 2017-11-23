import * as constants from 'utils/constants';
import hidden from 'reducers/search-page/search-terms/hidden';


describe('hidden reducer', function () {
  it('should return initial state', function () {
    hidden(undefined, {}).should.eql(true);
  });

  it('should toggle when received TOGGLE_SEARCH_TERMS', function () {
    hidden(false, {
      type: constants.TOGGLE_SEARCH_TERMS
    }).should.eql(true);

    hidden(true, {
      type: constants.TOGGLE_SEARCH_TERMS
    }).should.eql(false);
  });
});
