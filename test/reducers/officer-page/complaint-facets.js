import complaintFacets from 'reducers/officer-page/complaint-facets';

import { OFFICER_SUMMARY_REQUEST_SUCCESS, CHANGE_OFFICER_ID } from 'utils/constants';


describe('complaintFacets reducer', function () {
  it('should have initial state', function () {
    complaintFacets(undefined, {}).should.eql([]);
  });

  it('should handle OFFICER_SUMMARY_REQUEST_SUCCESS', function () {
    complaintFacets(undefined, {
      type: OFFICER_SUMMARY_REQUEST_SUCCESS,
      payload: { 'complaint_records': { 'facets': [1] } }
    }).should.eql([1]);
  });

  it('should handle CHANGE_OFFICER_ID', function () {
    complaintFacets(undefined, {
      type: CHANGE_OFFICER_ID,
    }).should.eql([]);
  });
});
