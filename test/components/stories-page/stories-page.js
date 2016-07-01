import configureStore from 'redux-mock-store';

import RawStoryFactory from 'utils/test/factories/raw-story';
import StoriesPage from 'components/stories-page/stories-page';


const mockStore = configureStore();
const store = mockStore({
  storiesPage: {
    featuredStories: {
      isRequesting: false,
      stories: {
        count: 3,
        next: null,
        previous: null,
        results: RawStoryFactory.buildList(3)
      }
    },
    nonFeaturedStories: {
      isRequesting: false,
      stories: {
        count: 3,
        next: null,
        previous: null,
        results: RawStoryFactory.buildList(3)
      }
    }
  }
});

describe('StoriesPage component', function () {
  it('should be renderable', function () {
    StoriesPage.should.be.renderable({ store: store });
  });
});
