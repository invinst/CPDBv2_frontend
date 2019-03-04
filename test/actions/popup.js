import { fetchPopup } from 'actions/popup';
import {
  POPUP_REQUEST_FAILURE,
  POPUP_REQUEST_START,
  POPUP_REQUEST_SUCCESS,
  POPUP_API_URL,
} from 'utils/constants';

describe('popup actions', function () {
  describe('fetchPopup', function () {
    it('should return the right action', function () {
      fetchPopup('officer').should.eql({
        types: [POPUP_REQUEST_START, POPUP_REQUEST_SUCCESS, POPUP_REQUEST_FAILURE],
        payload: {
          request: {
            url: `${POPUP_API_URL}?page=officer`,
            params: undefined,
            adapter: null,
            cancelToken: undefined
          }
        }
      });
    });
  });
});
