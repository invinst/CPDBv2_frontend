import pagination from 'reducers/documents-overview-page/pagination';
import * as constants from 'utils/constants';


describe('pagination reducer', function () {
  it('should have initial state', function () {
    pagination(undefined, {}).should.deepEqual({});
  });

  it('should handle DOCUMENT_OVERVIEW_REQUEST_SUCCESS', function () {
    pagination({
      next: 'https://api.com/docs/?limit=20&offset=40'
    }, {
      type: constants.DOCUMENT_OVERVIEW_REQUEST_SUCCESS,
      payload: {
        next: 'https://api.com/docs/?limit=20&&offset=60'
      }
    }).should.deepEqual({
      next: 'https://api.com/docs/?limit=20&&offset=60'
    });
  });
});
