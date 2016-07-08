import 'should';

import { rawStoryTransform } from 'selectors/landing-page/stories-selector';
import {
  groupFeaturedStories, featuredStoryGroupsSelector, featuredStoriesSelector,
  dataAvailableSelector, paginationSelector
} from 'selectors/stories-page/featured-stories-selector';
import StoryFactory from 'utils/test/factories/story';
import RawStoryFactory from 'utils/test/factories/raw-story';
import PaginationFactory from 'utils/test/factories/pagination';


describe('featured stories selectors', function () {
  let state = {
    storiesPage: {
      featuredStories: {}
    }
  };

  beforeEach(function () {
    state.storiesPage.featuredStories = {};
  });

  describe('groupFeaturedStories', function () {
    it('should return imageStory and noImageStories', function () {
      const imageStory = StoryFactory.build();
      const noImageStories = StoryFactory.buildList(2, { imageUrl: '' });
      const stories = [...noImageStories, imageStory];

      groupFeaturedStories(stories).should.deepEqual({
        imageStory,
        noImageStories
      });
    });

    it('should return first story as image story if no story has image', function () {
      const stories = StoryFactory.buildList(3, { imageUrl: '' });

      groupFeaturedStories(stories).should.deepEqual({
        imageStory: stories[0],
        noImageStories: stories.slice(1, 3)
      });
    });
  });

  describe('featuredStoriesSelector', function () {
    it('should return first 6 featured stories', function () {
      const featuredStories = RawStoryFactory.buildList(6, { 'is_featured': true });
      const stories = [
        ...featuredStories,
        RawStoryFactory.build({ 'is_featured': true })
      ];

      state.storiesPage.featuredStories = {
        stories: PaginationFactory.build({ results: stories })
      };
      featuredStoriesSelector(state).should.deepEqual(featuredStories.map(rawStoryTransform));
    });
  });

  describe('featuredStoryGroupsSelector', function () {
    it('should return 2 groups of featured stories', function () {
      const featuredStories = RawStoryFactory.buildList(6, { 'is_featured': true });
      state.storiesPage.featuredStories = {
        stories: PaginationFactory.build({ results: featuredStories })
      };
      const expectedResults = [
        {
          imageStory: rawStoryTransform(featuredStories[0]),
          noImageStories: featuredStories.slice(1, 3).map(rawStoryTransform)
        },
        {
          imageStory: rawStoryTransform(featuredStories[3]),
          noImageStories: featuredStories.slice(4, 6).map(rawStoryTransform)
        }
      ];

      featuredStoryGroupsSelector(state).should.deepEqual(expectedResults);
    });
  });

  describe('dataAvailableSelector', function () {
    it('should return false when isRequesting', function () {
      state.storiesPage.featuredStories = {
        stories: PaginationFactory.build({ results: RawStoryFactory.buildList(3) }),
        isRequesting: true
      };
      dataAvailableSelector(state).should.be.false();
    });

    it('should return true if has more than 5 featured stories and requesting is false', function () {
      state.storiesPage.featuredStories = {
        isRequesting: false,
        stories: PaginationFactory.build({ results: RawStoryFactory.buildList(6, { 'is_featured': true }) })
      };
      dataAvailableSelector(state).should.be.true();
    });

    it('should return false when stories has less than 6 featured stories', function () {
      state.storiesPage.featuredStories = {
        stories: PaginationFactory.build({ results: RawStoryFactory.buildList(5, { 'is_featured': true }) })
      };
      dataAvailableSelector(state).should.be.false();
    });
  });

  describe('paginationSelector', function () {
    it('should return count, next and previous', function () {
      const next = 'next';
      const previous = 'previous';
      const count = 'count';

      state.storiesPage.featuredStories = {
        stories: { next, previous, count }
      };

      paginationSelector(state).should.eql({ next, previous, count });
    });
  });
});
