import complaintsByYear from 'reducers/officer-page/complaints-by-year';

import { OFFICER_SUMMARY_REQUEST_SUCCESS } from 'utils/constants';


describe('complaintsByYear reducer', function () {
  it('should have initial state', function () {
    complaintsByYear(undefined, {}).should.eql([]);
  });

  it('should return empty array by default', function () {
    complaintsByYear(undefined, {
      type: OFFICER_SUMMARY_REQUEST_SUCCESS,
      payload: { 'complaint_records': {} }
    }).should.eql([]);
  });

  it('should handle OFFICER_SUMMARY_REQUEST_SUCCESS', function () {
    complaintsByYear(undefined, {
      type: OFFICER_SUMMARY_REQUEST_SUCCESS,
      payload: { 'complaint_records': { items: [{ year: 2011, count: 3, 'sustained_count': 1 }] } }
    }).should.eql([{ year: 2011, count: 3, 'sustained_count': 1 }]);
  });
});
