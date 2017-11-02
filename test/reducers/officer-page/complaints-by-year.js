import complaintsByYear from 'reducers/officer-page/complaints-by-year';

import { OFFICER_SUMMARY_REQUEST_SUCCESS, CHANGE_OFFICER_ID } from 'utils/constants';


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

  it('should handle CHANGE_OFFICER_ID', function () {
    complaintsByYear(undefined, {
      type: CHANGE_OFFICER_ID,
    }).should.eql([]);
  });
});
