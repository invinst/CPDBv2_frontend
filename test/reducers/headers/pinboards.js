import pinboards from 'reducers/headers/pinboards';
import { HEADER_PINBOARDS_REQUEST_SUCCESS } from 'utils/constants';


describe('pinboards reducer', function () {
  it('should have initial state', function () {
    pinboards(undefined, {}).should.be.eql([]);
  });

  it('should handle HEADER_PINBOARDS_REQUEST_SUCCESS', function () {
    pinboards([], {
      type: HEADER_PINBOARDS_REQUEST_SUCCESS,
      payload: [{ id: 767 }],
    }).should.be.eql([{ id: 767 }]);
  });
});
