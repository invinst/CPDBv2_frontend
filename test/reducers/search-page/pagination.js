import { SUGGESTION_SINGLE_REQUEST_SUCCESS } from 'utils/constants';

import pagination from 'reducers/search-page/pagination';


describe('searchPage.pagination reducer', function () {
  it('should have initial state', function () {
    pagination(undefined, {}).should.deepEqual({});
  });

  it('should handle SUGGESTION_SINGLE_REQUEST_SUCCESS', function () {
    pagination(undefined, {
      type: SUGGESTION_SINGLE_REQUEST_SUCCESS,
      payload: {
        next: 'example.com',
      },
    }).should.deepEqual({
      next: 'example.com',
    });
  });
});
