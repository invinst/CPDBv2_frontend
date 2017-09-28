import request from 'reducers/cr-page/attachment-request/request';

import { CR_REQUEST_DOC_START, CR_REQUEST_DOC_SUCCESS, CR_REQUEST_DOC_FAILURE } from 'utils/constants';

describe('AttachmentRequest reducer', function () {
  describe('request reducer', function () {
    it('should have initial state', function () {
      request(undefined, {}).should.eql({
        isRequested: false,
        message: ''
      });
    });

    it('should handle CR_REQUEST_DOC_START', function () {
      request(undefined, {
        type: CR_REQUEST_DOC_START,
        email: 'valid@email.com'
      }).should.eql({
        isRequested: false
      });
    });

    it('should handle CR_REQUEST_DOC_SUCCESS', function () {
      request({
        isRequested: false
      }, {
        type: CR_REQUEST_DOC_SUCCESS,
        payload: {
          message: 'Thanks for subscribing'
        }
      }).should.eql({
        isRequested: true,
        message: 'Thanks for subscribing'
      });
    });

    it('should handle CR_REQUEST_DOC_FAILURE', function () {
      request({
        isRequested: false
      }, {
        type: CR_REQUEST_DOC_FAILURE,
        payload: {
          error: 'Not subscribe'
        }
      }).should.eql({
        isRequested: false,
        message: 'Not subscribe'
      });
    });

  });
});
