import officerId from 'reducers/officer-page/officer-id';
import should from 'should';

import {
  OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS, OFFICER_TIMELINE_MINIMAP_REQUEST_SUCCESS, OFFICER_SUMMARY_REQUEST_SUCCESS,
  CHANGE_OFFICER_ID
} from 'utils/constants';


describe('officerId reducer', function () {
  it('should have initial state', function () {
    should.not.exists(officerId(undefined, {}));
  });

  it('should handle OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS', function () {
    officerId(null, {
      type: OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS,
      request: { url: 'http://domain/api/v2/officers/1234/timeline-items/' }
    }).should.eql(1234);
  });

  it('should handle OFFICER_TIMELINE_MINIMAP_REQUEST_SUCCESS', function () {
    officerId(null, {
      type: OFFICER_TIMELINE_MINIMAP_REQUEST_SUCCESS,
      request: { url: 'http://domain/api/v2/officers/1234/timeline-minimap/' }
    }).should.eql(1234);
  });

  it('should handle OFFICER_SUMMARY_REQUEST_SUCCESS', function () {
    officerId(null, {
      type: OFFICER_SUMMARY_REQUEST_SUCCESS,
      request: { url: 'http://domain/api/v2/officers/1234/' }
    }).should.eql(1234);
  });

  it('should handle CHANGE_OFFICER_ID', function () {
    officerId(null, {
      type: CHANGE_OFFICER_ID,
      payload: 123
    }).should.eql(123);
  });
});
