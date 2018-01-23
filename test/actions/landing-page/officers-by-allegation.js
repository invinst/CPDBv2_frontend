import { requestOfficersByAllegation } from 'actions/landing-page/officers-by-allegation';
import * as constants from 'utils/constants';


describe('requestOfficersByAllegation action', function () {
  it('should return correct action', function () {
    requestOfficersByAllegation().should.eql({
      types: [
        constants.OFFICERS_BY_ALLEGATION_REQUEST_START,
        constants.OFFICERS_BY_ALLEGATION_REQUEST_SUCCESS,
        constants.OFFICERS_BY_ALLEGATION_REQUEST_FAILURE
      ],
      payload: {
        request: {
          url: constants.OFFICERS_BY_ALLEGATION_API_URL,
          adapter: null,
          params: undefined
        }
      }
    });
  });
});
