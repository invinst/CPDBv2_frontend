import pagination from 'reducers/cr-page/related-complaints/related-by-officer/pagination';

describe('related complaints by officer pagination reducer', function () {
  it('should return initial state', function () {
    pagination(undefined, {}).should.eql({
      next: null,
      previous: null
    });
  });

  it('should handle RELATED_COMPLAINTS_BY_OFFICER_REQUEST_SUCCESS and return pagination', function () {
    const action = {
      type: 'RELATED_COMPLAINTS_BY_OFFICER_REQUEST_SUCCESS',
      payload: {
        next: 123,
        previous: 456
      }
    };

    pagination({}, action).should.eql({
      next: 123,
      previous: 456
    });
  });

  it('should handle RELATED_COMPLAINTS_BY_OFFICER_REQUEST_FAILURE and return empty pagination', function () {
    const action = {
      type: 'RELATED_COMPLAINTS_BY_OFFICER_REQUEST_FAILURE'
    };

    pagination({}, action).should.eql({
      next: null,
      previous: null
    });
  });
});
