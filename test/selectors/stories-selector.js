import 'should';

import {
  featuredStorySelector, dataAvailableSelector, smallStoriesSelector,
  getStoriesSelector, rawStoryTransform, paginationSelector
} from 'selectors/stories-selector';
import RawStoryFactory from 'utils/test/factories/raw-story';
import { DEFAULT_IMAGE_DIMENSION } from 'utils/constants';
import PaginationFactory from 'utils/test/factories/pagination';


describe('stories selectors', function () {
  describe('rawStoryTransform', function () {
    const rawStory = {
      id: 1,
      title: 'a',
      newspaper: {
        id: 1,
        name: 'b',
        'short_name': 'c.d'
      },
      body: [
        { type: 'paragraph', value: 'e' },
        { type: 'paragraph', value: 'f' }
      ],
      'post_date': '1/2/3',
      'image_url': {
        [DEFAULT_IMAGE_DIMENSION]: 'g.h'
      }
    };
    const transformedStory = {
      id: 1,
      title: 'a',
      newspaperName: 'b',
      newspaperShortName: 'c.d',
      date: '1/2/3',
      paragraphs: ['e', 'f'],
      imageUrl: 'g.h'
    };

    rawStoryTransform(rawStory).should.eql(transformedStory);
  });

  describe('getStoriesSelector', function () {
    it('should return correct stories format', function () {
      const rawStory = RawStoryFactory.build();
      const state = {
        storyApp: {
          stories: PaginationFactory.build({ results: [rawStory] })
        }
      };

      getStoriesSelector(state).should.eql([
        rawStoryTransform(rawStory)
      ]);
    });
  });

  describe('featuredStorySelector', function () {
    it('should return featureStory', function () {
      const rawStories = [1, 2, 3].map((id) => RawStoryFactory.build({ id: id }));
      let state = {
        storyApp: {
          stories: PaginationFactory.build({ results: rawStories }),
          featuredStoryId: 2
        }
      };

      featuredStorySelector(state).should.eql(rawStoryTransform(rawStories[1]));

      state = {
        storyApp: {
          stories: PaginationFactory.build({ results: rawStories }),
          featuredStoryId: 4
        }
      };

      featuredStorySelector(state).should.eql(rawStoryTransform(rawStories[0]));
    });
  });

  describe('dataAvailableSelector', function () {
    it('should return false when isRequesting', function () {
      let state = {
        storyApp: {
          stories: PaginationFactory.build({ results: RawStoryFactory.buildList(3) }),
          isRequesting: true
        }
      };
      dataAvailableSelector(state).should.be.false();
    });

    it('should return true if has more than 2 stories and requesting is false', function () {
      let state = {
        storyApp: {
          isRequesting: false,
          stories: PaginationFactory.build({ results: [1, 2, 3] })
        }
      };
      dataAvailableSelector(state).should.be.true();
    });

    it('should return false when stories has less than 3 stories', function () {
      let state = {
        storyApp: {
          stories: PaginationFactory.build({ results: [1, 2] })
        }
      };
      dataAvailableSelector(state).should.be.false();
    });
  });

  describe('smallStoriesSelector', function () {
    it('should return 2 stories', function () {
      const rawStories = RawStoryFactory.buildList(3);
      const state = {
        storyApp: {
          stories: PaginationFactory.build({ results: rawStories })
        }
      };
      smallStoriesSelector(state).should.eql(
        rawStories.slice(1, 3).map((rawStory) => rawStoryTransform(rawStory))
      );
      rawStories.push(RawStoryFactory.build());
      smallStoriesSelector(state).should.eql(
        rawStories.slice(1, 3).map((rawStory) => rawStoryTransform(rawStory))
      );
    });
  });

  describe('paginationSelector', function () {
    it('should return count, next and previous', function () {
      const next = 'next';
      const previous = 'previous';
      const count = 'count';

      const state = {
        storyApp: {
          stories: { next, previous, count }
        }
      };

      paginationSelector(state).should.eql({ next, previous, count });
    });
  });
});
