import complaintFacets from 'reducers/officer-page/complaint-facets';

import { OFFICER_SUMMARY_REQUEST_SUCCESS } from 'utils/constants';


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
});
