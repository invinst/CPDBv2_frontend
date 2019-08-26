import subscribedCRIDs from 'reducers/cr-page/attachment-request/subscribed-crids';

import { CR_REQUEST_DOC_SUCCESS } from 'utils/constants';

describe('AttachmentRequest reducer', function () {
  describe('subscribedCRIDs', function () {
    it('should have initial state', function () {
      subscribedCRIDs(undefined, {}).should.eql({});
    });

    it('should handle CR_REQUEST_DOC_SUCCESS', function () {
      subscribedCRIDs(undefined, {
        type: CR_REQUEST_DOC_SUCCESS,
        payload: {
          crid: 12,
          message: 'Dummy message',
        },
      }).should.be.eql({ 12: true });

      subscribedCRIDs({ 13: true }, {
        type: CR_REQUEST_DOC_SUCCESS,
        payload: {
          crid: 12,
          message: 'Dummy message',
        },
      }).should.be.eql({ 12: true, 13: true });
    });
  });
});
