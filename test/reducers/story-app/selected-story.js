import { SELECT_STORY } from 'actions/story-app';
import selectedStory from 'reducers/story-app/selected-story';


describe('selectedStory reducer', function () {
  it('should return initial state', function () {
    selectedStory(undefined, {}).should.eql(0);
  });

  it('should handle SELECT_STORY', function () {
    selectedStory(undefined, {
      type: SELECT_STORY,
      payload: 1
    }).should.eql(1);
  });
});
