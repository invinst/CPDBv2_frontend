import { UNIT_PROFILE_SUMMARY_REQUEST_SUCCESS } from 'utils/constants';
import summary from 'reducers/unit-profile-page/summary';


describe('summary reducer', function () {
  it('should return initial state', function () {
    summary(undefined, {}).should.eql({});
  });

  it('should handle UNIT_PROFILE_SUMMARY_REQUEST_SUCCESS', function () {
    summary({}, {
      type: UNIT_PROFILE_SUMMARY_REQUEST_SUCCESS,
      payload: { foo: 'bar' },
    }).should.eql({ foo: 'bar' });
  });
});
