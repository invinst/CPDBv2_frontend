import { fetchTRR, requestDocument } from 'actions/trr-page';
import {
  TRR_URL,
  TRR_REQUEST_START,
  TRR_REQUEST_SUCCESS,
  TRR_REQUEST_FAILURE,
  TRR_REQUEST_DOC_REQUEST_START,
  TRR_REQUEST_DOC_REQUEST_SUCCESS,
  TRR_REQUEST_DOC_REQUEST_FAILURE,
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

  describe('requestDocument', function () {
    it('shoulr return right action', function () {
      requestDocument({ id: 123, email: 'valid@email.com' }).should.eql({
        types: [TRR_REQUEST_DOC_REQUEST_START, TRR_REQUEST_DOC_REQUEST_SUCCESS, TRR_REQUEST_DOC_REQUEST_FAILURE],
        payload: {
          request: {
            url: `${TRR_URL}123/request-document/`,
            data: {
              email: 'valid@email.com'
            },
            method: 'post',
            adapter: null
          }
        }
      });
    });
  });
});
