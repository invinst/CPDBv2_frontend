import should from 'should';
import createRequestingReducer from 'reducers/common/requesting';


describe('createRequestingReducer', function () {
  before(function () {
    this.requestingReducer = createRequestingReducer(
      'FETCH_REQUEST_START',
      'FETCH_REQUEST_SUCCESS',
      'FETCH_REQUEST_FAILURE',
    );
  });

  it('should return requestingReducer with initial state', function () {
    should(this.requestingReducer(undefined, {})).be.false();
  });

  it('should return requestingReducer which handles FETCH_REQUEST_START', function () {
    this.requestingReducer(
      false,
      { type: 'FETCH_REQUEST_START' }
    ).should.be.true();
  });

  it('should return requestingReducer which handles FETCH_REQUEST_SUCCESS', function () {
    this.requestingReducer(
      true,
      { type: 'FETCH_REQUEST_SUCCESS' }
    ).should.be.false();
  });

  it('should return requestingReducer which handles FETCH_REQUEST_FAILURE', function () {
    this.requestingReducer(
      true,
      { type: 'FETCH_REQUEST_FAILURE' }
    ).should.be.false();
  });

  it('should return requestingReducer which may not handle FETCH_REQUEST_CANCELLED', function () {
    this.requestingReducer(
      true,
      { type: 'FETCH_REQUEST_CANCELLED' }
    ).should.be.true();
  });

  it('should return requestingReducer which may handle FETCH_REQUEST_CANCELLED', function () {
    const requestingReducer = createRequestingReducer(
      'FETCH_REQUEST_START',
      'FETCH_REQUEST_SUCCESS',
      'FETCH_REQUEST_FAILURE',
      'FETCH_REQUEST_CANCELLED',
    );

    requestingReducer(
      true,
      { type: 'FETCH_REQUEST_CANCELLED' }
    ).should.be.false();
  });
});
