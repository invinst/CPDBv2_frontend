import { headerEditModeOn } from 'reducers/landing-page/carousel-header-edit-utils';
import {
  CAROUSEL_TYPES,
  LOCATION_CHANGE,
  TURN_ON_CAROUSEL_HEADER_EDIT_MODE,
  TURN_OFF_CAROUSEL_HEADER_EDIT_MODE,
} from 'utils/constants';


describe('carousel header edit utils', () => {
  let headerEditModeOnActivityReducer;
  before(() => {
    headerEditModeOnActivityReducer = headerEditModeOn(CAROUSEL_TYPES.ACTIVITY);
  });

  it('should return initial state', () => {
    const state = headerEditModeOnActivityReducer(undefined, {});
    state.should.eql(false);
  });

  describe('should handle TURN_ON_CAROUSEL_HEADER_EDIT_MODE', () => {
    it('should return true if payload is ACTIVITY', () => {
      headerEditModeOnActivityReducer(undefined, {
        type: TURN_ON_CAROUSEL_HEADER_EDIT_MODE,
        payload: CAROUSEL_TYPES.ACTIVITY,
      }).should.eql(true);
    });

    it('should not change if payload is not ACTIVITY', () => {
      headerEditModeOnActivityReducer(false, {
        type: TURN_ON_CAROUSEL_HEADER_EDIT_MODE,
        payload: CAROUSEL_TYPES.COMPLAINT,
      }).should.eql(false);

      headerEditModeOnActivityReducer(true, {
        type: TURN_ON_CAROUSEL_HEADER_EDIT_MODE,
        payload: CAROUSEL_TYPES.COMPLAINT,
      }).should.eql(true);
    });
  });

  describe('should handle TURN_OFF_CAROUSEL_HEADER_EDIT_MODE', () => {
    it('should return true if payload is ACTIVITY', () => {
      headerEditModeOnActivityReducer(undefined, {
        type: TURN_OFF_CAROUSEL_HEADER_EDIT_MODE,
        payload: CAROUSEL_TYPES.ACTIVITY,
      }).should.eql(false);
    });

    it('should not change if payload is not ACTIVITY', () => {
      headerEditModeOnActivityReducer(false, {
        type: TURN_OFF_CAROUSEL_HEADER_EDIT_MODE,
        payload: CAROUSEL_TYPES.COMPLAINT,
      }).should.eql(false);

      headerEditModeOnActivityReducer(true, {
        type: TURN_OFF_CAROUSEL_HEADER_EDIT_MODE,
        payload: CAROUSEL_TYPES.COMPLAINT,
      }).should.eql(true);
    });
  });

  it('should handle LOCATION_CHANGE', () => {
    headerEditModeOnActivityReducer(true, {
      type: LOCATION_CHANGE,
      payload: {
        pathname: '/123',
      },
    }).should.be.false();

    headerEditModeOnActivityReducer(true, {
      type: LOCATION_CHANGE,
      payload: {
        pathname: '/edit/123',
      },
    }).should.be.true();
  });
});
