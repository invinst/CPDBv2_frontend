import pagination from 'reducers/crawlers-page/pagination';

import { CRAWLERS_REQUEST_SUCCESS } from 'utils/constants';


describe('pagination reducer', function () {
  it('should return initial state', function () {
    pagination(undefined, {}).should.eql({});
  });

  it('should handle CRAWLERS_REQUEST_SUCCESS', function () {
    pagination({}, {
      type: CRAWLERS_REQUEST_SUCCESS,
      payload: {
        next: 'https://lvh.me/document-crawlers/?limit=20&offset=20'
      }
    }).should.eql({
      next: 'https://lvh.me/document-crawlers/?limit=20&offset=20'
    });
  });
});

