import {
  TRR_REQUEST_DOC_REQUEST_START,
  TRR_REQUEST_DOC_REQUEST_SUCCESS,
  TRR_REQUEST_DOC_REQUEST_FAILURE
} from 'utils/constants';
import request from 'reducers/trr-page/attachment-request/request';


describe('request reducer', function () {
  it('should have initial state', function () {
    request(undefined, {}).should.eql({
      isRequested: false,
      message: ''
    });
  });

  it('should handle TRR_REQUEST_DOC_REQUEST_START', function () {
    request(undefined, {
      type: TRR_REQUEST_DOC_REQUEST_START,
      email: 'valid@email.com'
    }).should.eql({
      isRequested: false
    });
  });

  it('should handle TRR_REQUEST_DOC_REQUEST_SUCCESS', function () {
    request({
      isRequested: false
    }, {
      type: TRR_REQUEST_DOC_REQUEST_SUCCESS,
      payload: {
        message: 'Thanks for subscribing'
      }
    }).should.eql({
      isRequested: true,
      message: 'Thanks for subscribing'
    });
  });

  it('should handle TRR_REQUEST_DOC_REQUEST_FAILURE', function () {
    request({
      isRequested: false
    }, {
      type: TRR_REQUEST_DOC_REQUEST_FAILURE,
      payload: {
        message: 'Not subscribe'
      }
    }).should.eql({
      isRequested: false,
      message: 'Not subscribe'
    });
  });

});
