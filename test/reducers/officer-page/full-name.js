import fullName from 'reducers/officer-page/full-name';

import { OFFICER_SUMMARY_REQUEST_SUCCESS, CHANGE_OFFICER_ID } from 'utils/constants';


describe('fullName reducer', function () {
  it('should have initial state', function () {
    fullName(undefined, {}).should.eql('');
  });

  it('should handle OFFICER_SUMMARY_REQUEST_SUCCESS', function () {
    fullName(undefined, {
      type: OFFICER_SUMMARY_REQUEST_SUCCESS,
      payload: { 'full_name': 'Mr. Foo' },
    }).should.eql('Mr. Foo');
  });

  it('should handle CHANGE_OFFICER_ID', function () {
    fullName(undefined, {
      type: CHANGE_OFFICER_ID,
    }).should.eql('');
  });
});
