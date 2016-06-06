import { STORIES_REQUEST_START, STORIES_REQUEST_SUCCESS, STORIES_REQUEST_FAILURE } from 'actions/story-app';
import storyApp from 'reducers/story-app';
import { PAGINATION_DEFAULT } from 'utils/constants';


describe('storyApp reducer', function () {
  it('should return initial state', function () {
    storyApp(undefined, {}).should.eql({
      stories: PAGINATION_DEFAULT,
      isRequesting: false,
      featuredStoryId: 0
    });
  });

  it('should handle STORIES_REQUEST_START', function () {
    storyApp(undefined, {
      type: STORIES_REQUEST_START
    }).should.eql({
      stories: PAGINATION_DEFAULT,
      isRequesting: true,
      featuredStoryId: 0
    });
  });

  it('should handle STORIES_REQUEST_SUCCESS', function () {
    let nextState = storyApp(undefined, {
      type: STORIES_REQUEST_START
    });

    storyApp(nextState, {
      type: STORIES_REQUEST_SUCCESS,
      payload: [1, 2, 3]
    }).should.eql({
      stories: [1, 2, 3],
      isRequesting: false,
      featuredStoryId: 0
    });
  });

  it('should handle STORIES_REQUEST_FAILURE', function () {
    let nextState = storyApp(undefined, {
      type: STORIES_REQUEST_START
    });

    storyApp(nextState, {
      type: STORIES_REQUEST_FAILURE,
      payload: new Error('Load failed')
    }).should.eql({
      stories: PAGINATION_DEFAULT,
      isRequesting: false,
      featuredStoryId: 0
    });
  });
});
