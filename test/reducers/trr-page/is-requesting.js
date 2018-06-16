import { TRR_REQUEST_START, TRR_REQUEST_SUCCESS, TRR_REQUEST_FAILURE } from 'utils/constants';
import isRequesting from 'reducers/trr-page/is-requesting';


describe('isRequesting reducer', function () {
  it('should return initial state', function () {
    isRequesting(undefined, {}).should.be.false();
  });

  it('should handle TRR_REQUEST_START', function () {
    isRequesting(undefined, { type: TRR_REQUEST_START }).should.be.true();
  });

  it('should handle TRR_REQUEST_SUCCESS', function () {
    isRequesting(true, {
      type: TRR_REQUEST_SUCCESS,
      payload: [1, 2, 3]
    }).should.be.false();
  });

  it('should handle TRR_REQUEST_FAILURE', function () {
    isRequesting(true, {
      type: TRR_REQUEST_FAILURE,
      payload: new Error('Load failed')
    }).should.be.false();
  });
});
