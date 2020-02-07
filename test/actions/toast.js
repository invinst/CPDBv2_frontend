import { fetchToast } from 'actions/toast';
import {
  TOAST_REQUEST_FAILURE,
  TOAST_REQUEST_START,
  TOAST_REQUEST_SUCCESS,
  TOAST_API_URL,
} from 'utils/constants';

describe('toast actions', function () {
  describe('fetchToast', function () {
    it('should return the right action', function () {
      fetchToast().should.eql({
        types: [TOAST_REQUEST_START, TOAST_REQUEST_SUCCESS, TOAST_REQUEST_FAILURE],
        payload: {
          request: {
            url: TOAST_API_URL,
            params: undefined,
            adapter: null,
            cancelToken: undefined,
          },
        },
      });
    });
  });
});
