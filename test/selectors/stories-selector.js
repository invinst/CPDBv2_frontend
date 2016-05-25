import {
  featuredStorySelector, dataAvailableSelector, smallStoriesSelector, getStoriesSelector, rawStoryTransform
} from 'selectors/stories-selector';
import RawStoryFactory from 'utils/test/factories/raw-story';
import { DEFAULT_IMAGE_DIMENSION } from 'utils/constants';


describe('storiesSelector', function () {
  describe('rawStoryTransform', function () {
    rawStoryTransform({
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
    }).should.eql({
      id: 1,
      title: 'a',
      newspaperName: 'b',
      date: '1/2/3',
      paragraphs: ['e', 'f'],
      imageUrl: 'g.h'
    });
  });

  describe('getStoriesSelector', function () {
    it('should return correct stories format', function () {
      const rawStory = RawStoryFactory.build();
      const state = {
        storyApp: {
          stories: [rawStory]
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
          stories: rawStories,
          featuredStoryId: 2
        }
      };

      featuredStorySelector(state).should.eql(rawStoryTransform(rawStories[1]));

      state = {
        storyApp: {
          stories: rawStories,
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
          stories: RawStoryFactory.buildList(3),
          isRequesting: true
        }
      };
      dataAvailableSelector(state).should.be.false();
    });

    it('should return true if has more than 2 stories and requesting is false', function () {
      let state = {
        storyApp: {
          isRequesting: false,
          stories: [1, 2, 3]
        }
      };
      dataAvailableSelector(state).should.be.true();
    });

    it('should return false when stories has less than 3 stories', function () {
      let state = {
        storyApp: {
          stories: [1, 2]
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
          stories: rawStories
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
});
