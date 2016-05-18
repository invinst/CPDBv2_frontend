import featuredStoryId from 'reducers/story-app/featured-story-id';
import { STORIES_REQUEST_SUCCESS, STORIES_REQUEST_FAILURE } from 'actions/story-app';


describe('featuredStoryId reducer', function () {
  it('should return initial state', function () {
    featuredStoryId(undefined, {}).should.equal(0);
  });

  it('should handle STORIES_REQUEST_SUCCESS', function () {
    featuredStoryId(undefined, {
      type: STORIES_REQUEST_SUCCESS,
      payload: {
        'feature_story_id': 1
      }
    }).should.equal(1);
  });

  it('should handle STORIES_REQUEST_FAILURE', function () {
    featuredStoryId(undefined, {
      type: STORIES_REQUEST_FAILURE,
      payload: new Error('Load failed')
    }).should.equal(0);
  });
});
