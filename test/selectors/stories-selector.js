import { featuredStorySelector, shouldRenderSelector, smallStoriesSelector } from 'selectors/stories-selector';
import StoryFactory from 'utils/test/factories/story';


describe('storiesSelector', function () {
  describe('featuredStorySelector', function () {
    it('should return featureStory', function () {
      const stories = [1, 2, 3].map(id => StoryFactory.build({ id: id }));

      let state = {
        storyApp: {
          stories: stories,
          featuredStoryId: 2
        }
      };

      featuredStorySelector(state).should.eql(stories[1]);

      state = {
        storyApp: {
          stories: stories,
          featuredStoryId: 4
        }
      };

      featuredStorySelector(state).should.eql(stories[0]);
    });
  });

  describe('shouldRenderSelector', function () {
    it('should return false when isRequesting', function () {
      let state = {
        storyApp: {
          isRequesting: true
        }
      };
      shouldRenderSelector(state).should.be.false();
    });

    it('should return true if has more than 2 stories and requesting is false', function () {
      let state = {
        storyApp: {
          isRequesting: false,
          stories: [1, 2, 3]
        }
      };
      shouldRenderSelector(state).should.be.true();
    });

    it('should return false when stories has less than 3 stories', function () {
      let state = {
        storyApp: {
          stories: [1, 2]
        }
      };
      shouldRenderSelector(state).should.be.false();
    });
  });

  describe('smallStoriesSelector', function () {
    it('should return 2 stories', function () {
      let stories = [1, 2, 3].map(id => StoryFactory.build({ id: id }));
      let state = {
        storyApp: {
          stories: stories
        }
      };
      smallStoriesSelector(state).should.eql(stories.slice(1, 3));
      stories.push(StoryFactory.build({ id: 4 }));
      smallStoriesSelector(state).should.eql(stories.slice(1, 3));
    });
  });
});
