import fullName from 'reducers/officer-page/full-name';

import { OFFICER_SUMMARY_REQUEST_SUCCESS } from 'utils/constants';


describe('fullName reducer', function () {
  it('should have initial state', function () {
    fullName(undefined, {}).should.eql('');
  });

  it('should handle OFFICER_SUMMARY_REQUEST_SUCCESS', function () {
    fullName(undefined, {
      type: OFFICER_SUMMARY_REQUEST_SUCCESS,
      payload: { 'full_name': 'Mr. Foo' }
    }).should.eql('Mr. Foo');
  });
});
