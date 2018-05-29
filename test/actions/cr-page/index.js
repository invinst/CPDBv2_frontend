import { fetchCR, requestDocument } from 'actions/cr-page';
import {
  CR_URL,
  CR_REQUEST_START,
  CR_REQUEST_SUCCESS,
  CR_REQUEST_FAILURE,
  CR_REQUEST_DOC_START,
  CR_REQUEST_DOC_SUCCESS,
  CR_REQUEST_DOC_FAILURE
} from 'utils/constants';


describe('CRPage actions', function () {
  describe('fetchCR', function () {
    it('should return the right action', function () {
      fetchCR(123).should.eql({
        types: [CR_REQUEST_START, CR_REQUEST_SUCCESS, CR_REQUEST_FAILURE],
        payload: {
          request: {
            url: `${CR_URL}123/`,
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
        types: [CR_REQUEST_DOC_START, CR_REQUEST_DOC_SUCCESS, CR_REQUEST_DOC_FAILURE],
        payload: {
          request: {
            url: `${CR_URL}123/request-document/`,
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
