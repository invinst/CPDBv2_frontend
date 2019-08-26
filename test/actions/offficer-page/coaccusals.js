import { fetchCoaccusals } from 'actions/officer-page/coaccusals';

import {
  OFFICER_URL,
  OFFICER_COACCUSALS_REQUEST_START,
  OFFICER_COACCUSALS_REQUEST_SUCCESS,
  OFFICER_COACCUSALS_REQUEST_FAILURE,
} from 'utils/constants';


describe('officer coaccusals actions', function () {
  describe('fetchCoaccusals', function () {
    it('should return the right action', function () {
      fetchCoaccusals(123).should.eql({
        types: [
          OFFICER_COACCUSALS_REQUEST_START,
          OFFICER_COACCUSALS_REQUEST_SUCCESS,
          OFFICER_COACCUSALS_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${OFFICER_URL}123/coaccusals/`,
            params: undefined,
            adapter: null,
            cancelToken: undefined,
          },
        },
      });
    });
  });
});
