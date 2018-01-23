import officersByAllegationIsRequesting from 'reducers/landing-page/officers-by-allegation/is-requesting';
import * as constants from 'utils/constants';


describe('officersByAllegationIsRequesting reducer', function () {
  it('should return initial state', function () {
    officersByAllegationIsRequesting(undefined, {}).should.be.false();
  });

  it('should handle OFFICERS_BY_ALLEGATION_REQUEST_START', function () {
    officersByAllegationIsRequesting(undefined, {
      type: constants.OFFICERS_BY_ALLEGATION_REQUEST_START
    }).should.be.true();
  });

  it('should handle OFFICERS_BY_ALLEGATION_REQUEST_SUCCESS', function () {
    officersByAllegationIsRequesting(true, {
      type: constants.OFFICERS_BY_ALLEGATION_REQUEST_SUCCESS,
      payload: [1, 2, 3]
    }).should.be.false();
  });

  it('should handle OFFICERS_BY_ALLEGATION_FAILURE', function () {
    officersByAllegationIsRequesting(true, {
      type: constants.OFFICERS_BY_ALLEGATION_REQUEST_FAILURE,
      payload: new Error('Load failed')
    }).should.be.false();
  });
});
