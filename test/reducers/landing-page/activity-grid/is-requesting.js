import activityGridIsRequesting from 'reducers/landing-page/activity-grid/is-requesting';
import * as constants from 'utils/constants';


describe('activityGridIsRequesting reducer', function () {
  it('should return initial state', function () {
    activityGridIsRequesting(undefined, {}).should.be.false();
  });

  it('should handle ACTIVITY_GRID_REQUEST_START', function () {
    activityGridIsRequesting(undefined, {
      type: constants.ACTIVITY_GRID_REQUEST_START
    }).should.be.true();
  });

  it('should handle ACTIVITY_GRID_REQUEST_SUCCESS', function () {
    activityGridIsRequesting(true, {
      type: constants.ACTIVITY_GRID_REQUEST_SUCCESS,
      payload: [1, 2, 3]
    }).should.be.false();
  });

  it('should handle ACTIVITY_GRID_REQUEST_FAILURE', function () {
    activityGridIsRequesting(true, {
      type: constants.ACTIVITY_GRID_REQUEST_FAILURE,
      payload: new Error('Load failed')
    }).should.be.false();
  });
});
