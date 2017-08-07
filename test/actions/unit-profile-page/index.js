import { fetchUnitProfileSummary } from 'actions/unit-profile-page';

import {
  UNIT_PROFILE_URL,
  UNIT_PROFILE_SUMMARY_REQUEST_START, UNIT_PROFILE_SUMMARY_REQUEST_SUCCESS, UNIT_PROFILE_SUMMARY_REQUEST_FAILURE
} from 'utils/constants';


describe('unitProfilePage actions', function () {
  describe('fetchUnitProfileSummary', function () {
    it('should return the right action', function () {
      fetchUnitProfileSummary(123).should.eql({
        types: [
          UNIT_PROFILE_SUMMARY_REQUEST_START,
          UNIT_PROFILE_SUMMARY_REQUEST_SUCCESS,
          UNIT_PROFILE_SUMMARY_REQUEST_FAILURE
        ],
        payload: {
          request: {
            url: `${UNIT_PROFILE_URL}123/summary/`,
            params: undefined,
            adapter: null
          }
        }
      });
    });
  });
});
