import { fetchTRR } from 'actions/trr-page';
import {
  TRR_URL,
  TRR_REQUEST_START,
  TRR_REQUEST_SUCCESS,
  TRR_REQUEST_FAILURE,
} from 'utils/constants';


describe('TRRPage actions', function () {
  describe('fetchTRR', function () {
    it('should return the right action', function () {
      fetchTRR(123).should.eql({
        types: [TRR_REQUEST_START, TRR_REQUEST_SUCCESS, TRR_REQUEST_FAILURE],
        payload: {
          request: {
            url: `${TRR_URL}123/`,
            params: undefined,
            adapter: null
          }
        }
      });
    });
  });
});
