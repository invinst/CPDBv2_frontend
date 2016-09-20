import {
  LANDING_PAGE_REQUEST_START, LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE
} from 'actions/landing-page';
import storyApp from 'reducers/landing-page/story-app';


describe('storyApp reducer', function () {
  it('should return initial state', function () {
    storyApp(undefined, {}).should.eql({
      stories: [],
      isRequesting: false
    });
  });

  it('should handle LANDING_PAGE_REQUEST_START', function () {
    storyApp(undefined, {
      type: LANDING_PAGE_REQUEST_START
    }).should.eql({
      stories: [],
      isRequesting: true
    });
  });

  it('should handle LANDING_PAGE_REQUEST_SUCCESS', function () {
    let nextState = storyApp(undefined, {
      type: LANDING_PAGE_REQUEST_START
    });

    storyApp(nextState, {
      type: LANDING_PAGE_REQUEST_SUCCESS,
      payload: { reports: [1, 2, 3] }
    }).should.eql({
      stories: [1, 2, 3],
      isRequesting: false
    });
  });

  it('should handle LANDING_PAGE_REQUEST_FAILURE', function () {
    let nextState = storyApp(undefined, {
      type: LANDING_PAGE_REQUEST_START
    });

    storyApp(nextState, {
      type: LANDING_PAGE_REQUEST_FAILURE,
      payload: new Error('Load failed')
    }).should.eql({
      stories: [],
      isRequesting: false
    });
  });
});
