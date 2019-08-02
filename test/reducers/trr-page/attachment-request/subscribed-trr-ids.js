import { TRR_REQUEST_DOC_REQUEST_SUCCESS } from 'utils/constants';
import subscribedTRRIds from 'reducers/trr-page/attachment-request/subscribed-trr-ids';


describe('subscribedTRRIds reducer', function () {
  it('should return initial state', function () {
    subscribedTRRIds(undefined, {}).should.be.empty();
  });

  it('should handle TRR_REQUEST_DOC_REQUEST_SUCCESS', function () {
    subscribedTRRIds({ 123: true }, {
      type: TRR_REQUEST_DOC_REQUEST_SUCCESS,
      payload: { 'trr_id': 456 },
    }).should.eql({ 123: true, 456: true });
  });
});
