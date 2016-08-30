import 'should';

import {
  dataAvailableSelector, storiesSelector, rawStoryTransform, getImageUrl
} from 'selectors/landing-page/stories-selector';
import RawStoryFactory from 'utils/test/factories/raw-story';
import { DEFAULT_IMAGE_DIMENSION } from 'utils/constants';


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
      'post_date': '2003/12/11',
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
      date: 'Dec 11, 2003',
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

  describe('storiesSelector', function () {
    it('should return correct stories format', function () {
      const rawStory = RawStoryFactory.build();
      state.landingPage.storyApp = {
        stories: [rawStory]
      };

      storiesSelector(state).should.eql([
        rawStoryTransform(rawStory)
      ]);
    });
  });

  describe('dataAvailableSelector', function () {
    it('should return false when isRequesting', function () {
      state.landingPage.storyApp = {
        stories: RawStoryFactory.buildList(3),
        isRequesting: true
      };
      dataAvailableSelector(state).should.be.false();
    });

    it('should return true if has more than 2 stories and requesting is false', function () {
      state.landingPage.storyApp = {
        isRequesting: false,
        stories: [1, 2, 3]
      };
      dataAvailableSelector(state).should.be.true();
    });

    it('should return false when stories has less than 3 stories', function () {
      state.landingPage.storyApp = {
        stories: [1, 2]
      };
      dataAvailableSelector(state).should.be.false();
    });
  });
});
