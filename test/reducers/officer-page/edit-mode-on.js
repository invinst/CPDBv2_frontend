import editModeOn from 'reducers/officer-page/edit-mode-on';

import { OFFICER_EDIT_TYPES, OFFICER_EDIT_MODE, LOCATION_CHANGE } from 'utils/constants';


describe('summary reducer', function () {
  it('should have initial state', function () {
    editModeOn(undefined, {}).should.eql({
      [OFFICER_EDIT_TYPES.TRIANGLE]: false,
      [OFFICER_EDIT_TYPES.SCALE]: false,
      [OFFICER_EDIT_TYPES.NO_DATA_RADAR_CHART]: false,
    });
  });

  it('should handle OFFICER_EDIT_MODE', function () {
    editModeOn(
      {
        [OFFICER_EDIT_TYPES.TRIANGLE]: false,
        [OFFICER_EDIT_TYPES.SCALE]: false,
        [OFFICER_EDIT_TYPES.NO_DATA_RADAR_CHART]: false,
      },
      {
        type: OFFICER_EDIT_MODE,
        payload: { editType: OFFICER_EDIT_TYPES.SCALE, mode: true }
      }
    ).should.eql( {
      [OFFICER_EDIT_TYPES.TRIANGLE]: false,
      [OFFICER_EDIT_TYPES.SCALE]: true,
      [OFFICER_EDIT_TYPES.NO_DATA_RADAR_CHART]: false,
    });

    editModeOn(
      {
        [OFFICER_EDIT_TYPES.TRIANGLE]: true,
        [OFFICER_EDIT_TYPES.SCALE]: true,
        [OFFICER_EDIT_TYPES.NO_DATA_RADAR_CHART]: false,
      },
      {
        type: OFFICER_EDIT_MODE,
        payload: { editType: OFFICER_EDIT_TYPES.TRIANGLE, mode: false }
      }
    ).should.eql( {
      [OFFICER_EDIT_TYPES.TRIANGLE]: false,
      [OFFICER_EDIT_TYPES.SCALE]: true,
      [OFFICER_EDIT_TYPES.NO_DATA_RADAR_CHART]: false,
    });
  });

  it('should handle LOCATION_CHANGE', function () {
    editModeOn(
      {
        [OFFICER_EDIT_TYPES.TRIANGLE]: true,
        [OFFICER_EDIT_TYPES.SCALE]: true,
        [OFFICER_EDIT_TYPES.NO_DATA_RADAR_CHART]: true,
      },
      {
        type: LOCATION_CHANGE,
        payload: { pathname: '/officer/1/' }
      }
    ).should.eql({
      [OFFICER_EDIT_TYPES.TRIANGLE]: false,
      [OFFICER_EDIT_TYPES.SCALE]: false,
      [OFFICER_EDIT_TYPES.NO_DATA_RADAR_CHART]: false,
    });

    editModeOn(
      {
        [OFFICER_EDIT_TYPES.TRIANGLE]: true,
        [OFFICER_EDIT_TYPES.SCALE]: true,
        [OFFICER_EDIT_TYPES.NO_DATA_RADAR_CHART]: true,
      },
      {
        type: LOCATION_CHANGE,
        payload: { pathname: '/edit/officer/1/' }
      }
    ).should.eql({
      [OFFICER_EDIT_TYPES.TRIANGLE]: true,
      [OFFICER_EDIT_TYPES.SCALE]: true,
      [OFFICER_EDIT_TYPES.NO_DATA_RADAR_CHART]: true,
    });
  });
});
