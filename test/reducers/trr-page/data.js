import { TRR_REQUEST_SUCCESS } from 'utils/constants';
import data from 'reducers/trr-page/data';


describe('data reducer', function () {
  it('should return initial state', function () {
    data(undefined, {}).should.be.empty();
  });

  it('should handle TRR_REQUEST_SUCCESS', function () {
    data(true, {
      type: TRR_REQUEST_SUCCESS,
      payload: { id: 123 },
    }).should.be.eql({ id: 123 });
  });
});
