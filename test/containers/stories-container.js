import configureStore from 'redux-mock-store';

import StoriesContainer from 'containers/stories-container';
import { stories } from 'mock-data';


const mockStore = configureStore();

describe('StoriesContainer', function () {
  it('should be render correct', function () {
    let store = mockStore({
      storyApp: {
        stories: stories.stories,
        featuredStoryId: stories['feature_story_id']
      }
    });
    StoriesContainer.should.be.renderable({ store });
  });
});
