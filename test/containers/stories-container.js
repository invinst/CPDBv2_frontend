import configureStore from 'redux-mock-store';

import StoriesContainer from 'containers/stories-container';
import RawStoryFactory from 'utils/test/factories/raw-story';


const mockStore = configureStore();

describe('StoriesContainer', function () {
  it('should be render correct', function () {
    let store = mockStore({
      storyApp: {
        stories: RawStoryFactory.buildList(3),
        featuredStoryId: 1
      }
    });
    StoriesContainer.should.be.renderable({ store });
  });
});
