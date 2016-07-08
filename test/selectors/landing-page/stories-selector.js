import 'should';

import {
  imageStorySelector, dataAvailableSelector, noImageStoriesSelector,
  getStoriesSelector, rawStoryTransform, paginationSelector, getImageUrl
} from 'selectors/landing-page/stories-selector';
import RawStoryFactory from 'utils/test/factories/raw-story';
import { DEFAULT_IMAGE_DIMENSION } from 'utils/constants';
import PaginationFactory from 'utils/test/factories/pagination';


describe('stories selectors', function () {
  let state = {
    landingPage: {
      storyApp: {}
    }
  };

  beforeEach(function () {
    state.landingPage.storyApp = {};
  });

  describe('rawStoryTransform', function () {
    const rawStory = {
      id: 1,
      title: 'a',
      'canonical_url': 'a.b.c',
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
      },
      'is_featured': true
    };
    const transformedStory = {
      id: 1,
      title: 'a',
      newspaperName: 'b',
      canonicalUrl: 'a.b.c',
      newspaperShortName: 'c.d',
      date: '1/2/3',
      paragraphs: ['e', 'f'],
      imageUrl: 'g.h',
      isFeatured: true
    };

    rawStoryTransform(rawStory).should.eql(transformedStory);
  });

  describe('getImageUrl', function () {
    it('should return default dimension image url', function () {
      const url = 'url';
      const story = { 'image_url': { [DEFAULT_IMAGE_DIMENSION]: url } };

      getImageUrl(story).should.eql(url);
    });

    it('should return empty string if story has no image', function () {
      const story = {};

      getImageUrl(story).should.eql('');
    });
  });

  describe('getStoriesSelector', function () {
    it('should return correct stories format', function () {
      const rawStory = RawStoryFactory.build();
      state.landingPage.storyApp = {
        stories: PaginationFactory.build({ results: [rawStory] })
      };

      getStoriesSelector(state).should.eql([
        rawStoryTransform(rawStory)
      ]);
    });
  });

  describe('imageStorySelector', function () {
    it('should return imageStory', function () {
      let rawStories = [1, 2, 3].map((id) => RawStoryFactory.build({ id: id, 'image_url': {} }));
      state.landingPage.storyApp = {
        stories: PaginationFactory.build({ results: rawStories })
      };

      imageStorySelector(state).should.eql(rawStoryTransform(rawStories[0]));

      rawStories[1]['image_url'] = {
        [DEFAULT_IMAGE_DIMENSION]: 'image'
      };
      state.landingPage.storyApp = {
        stories: PaginationFactory.build({ results: rawStories })
      };

      imageStorySelector(state).should.eql(rawStoryTransform(rawStories[1]));
    });
  });

  describe('dataAvailableSelector', function () {
    it('should return false when isRequesting', function () {
      state.landingPage.storyApp = {
        stories: PaginationFactory.build({ results: RawStoryFactory.buildList(3) }),
        isRequesting: true
      };
      dataAvailableSelector(state).should.be.false();
    });

    it('should return true if has more than 2 stories and requesting is false', function () {
      state.landingPage.storyApp = {
        isRequesting: false,
        stories: PaginationFactory.build({ results: [1, 2, 3] })
      };
      dataAvailableSelector(state).should.be.true();
    });

    it('should return false when stories has less than 3 stories', function () {
      state.landingPage.storyApp = {
        stories: PaginationFactory.build({ results: [1, 2] })
      };
      dataAvailableSelector(state).should.be.false();
    });
  });

  describe('noImageStoriesSelector', function () {
    it('should return 2 stories', function () {
      const rawStories = RawStoryFactory.buildList(3);
      state.landingPage.storyApp = {
        stories: PaginationFactory.build({ results: rawStories })
      };
      noImageStoriesSelector(state).should.eql(
        rawStories.slice(1, 3).map((rawStory) => rawStoryTransform(rawStory))
      );
      rawStories.push(RawStoryFactory.build());
      noImageStoriesSelector(state).should.eql(
        rawStories.slice(1, 3).map((rawStory) => rawStoryTransform(rawStory))
      );
    });
  });

  describe('paginationSelector', function () {
    it('should return count, next and previous', function () {
      const next = 'next';
      const previous = 'previous';
      const count = 'count';

      state.landingPage.storyApp = {
        stories: { next, previous, count }
      };

      paginationSelector(state).should.eql({ next, previous, count });
    });
  });
});
