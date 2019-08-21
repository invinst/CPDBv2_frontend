import count from 'reducers/cr-page/related-complaints/related-by-category/count';

describe('related complaints by category count reducer', function () {
  it('should return initial state', function () {
    count(undefined, {}).should.eql(0);
  });

  it('should handle RELATED_COMPLAINTS_BY_CATEGORY_REQUEST_SUCCESS and return count', function () {
    const action = {
      type: 'RELATED_COMPLAINTS_BY_CATEGORY_REQUEST_SUCCESS',
      payload: {
        count: 123,
      },
    };

    count({}, action).should.eql(123);
  });
});
