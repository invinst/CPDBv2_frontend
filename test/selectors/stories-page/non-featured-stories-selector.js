import 'should';

import { rawStoryTransform } from 'selectors/landing-page/stories-selector';
import {
  nonFeaturedStoriesSelector, dataAvailableSelector, moreDataAvailableSelector, paginationSelector
} from 'selectors/stories-page/non-featured-stories-selector';
import RawStoryFactory from 'utils/test/factories/raw-story';
import PaginationFactory from 'utils/test/factories/pagination';


describe('non featured stories selectors', function () {
  let state = {
    storiesPage: {
      nonFeaturedStories: {}
    }
  };

  beforeEach(function () {
    state.storiesPage.nonFeaturedStories = {};
  });

  describe('nonFeaturedStoriesSelector', function () {
    it('should return transformed stories', function () {
      const nonFeaturedStories = RawStoryFactory.buildList(3, { 'is_featured': false });

      state.storiesPage.nonFeaturedStories = {
        stories: PaginationFactory.build({ results: [...nonFeaturedStories] })
      };

      nonFeaturedStoriesSelector(state).should.deepEqual(nonFeaturedStories.map(rawStoryTransform));
    });
  });

  describe('dataAvailableSelector', function () {
    it('should return false when isRequesting', function () {
      state.storiesPage.nonFeaturedStories = {
        stories: PaginationFactory.build({ results: RawStoryFactory.buildList(3) }),
        isRequesting: true
      };
      dataAvailableSelector(state).should.be.false();
    });

    it('should return true if has non featured stories and requesting is false', function () {
      state.storiesPage.nonFeaturedStories = {
        isRequesting: false,
        stories: PaginationFactory.build({ results: RawStoryFactory.buildList(5, { 'is_featured': true }) })
      };
      dataAvailableSelector(state).should.be.true();
    });

    it('should return false when there is no non featured stories', function () {
      state.storiesPage.nonFeaturedStories = {
        isRequesting: false,
        stories: PaginationFactory.build({ results: [] })
      };
      dataAvailableSelector(state).should.be.false();
    });
  });

  describe('moreDataAvailableSelector', function () {
    it('should return false when isLoadingMore', function () {
      state.storiesPage.nonFeaturedStories = {
        isLoadingMore: true
      };
      moreDataAvailableSelector(state).should.be.false();
    });

    it('should return true when not isLoadingMore', function () {
      state.storiesPage.nonFeaturedStories = {
        isLoadingMore: false
      };
      moreDataAvailableSelector(state).should.be.true();
    });
  });

  describe('paginationSelector', function () {
    it('should return count, next and previous', function () {
      const next = 'next';
      const previous = 'previous';
      const count = 'count';

      state.storiesPage.nonFeaturedStories = {
        stories: { next, previous, count }
      };

      paginationSelector(state).should.eql({ next, previous, count });
    });
  });
});
