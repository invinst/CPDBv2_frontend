import { List } from 'immutable';

import { STORIES_REQUEST, STORIES_REQUEST_SUCCESS, STORIES_REQUEST_FAILURE } from 'actions/story-app';
import storyApp from 'reducers/story-app';


describe('storyApp reducer', function () {
  const initialState = {
    selectedStory: 0,
    stories: List([]),
    isRequesting: true
  };

  it('should return initial state', function () {
    storyApp(undefined, {}).should.eql({
      selectedStory: 0,
      stories: List([]),
      isRequesting: false
    });
  });

  it('should handle STORIES_REQUEST_SUCCESS', function () {
    storyApp(undefined, {
      type: STORIES_REQUEST
    }).should.eql(initialState);

    storyApp(initialState, {
      type: STORIES_REQUEST_SUCCESS,
      payload: [1, 2, 3]
    }).should.eql({
      selectedStory: 0,
      stories: List([1, 2, 3]),
      isRequesting: false
    });
  });

  it('should handle STORIES_REQUEST_FAILURE', function () {
    storyApp(undefined, {
      type: STORIES_REQUEST
    }).should.eql(initialState);

    storyApp(initialState, {
      type: STORIES_REQUEST_FAILURE,
      payload: new Error('Load failed')
    }).should.eql({
      selectedStory: 0,
      stories: List([]),
      isRequesting: false
    });
  });
});
