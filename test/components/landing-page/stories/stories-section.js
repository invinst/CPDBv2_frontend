import StoryFactory from 'utils/test/factories/story';
import StoriesSection from 'components/landing-page/stories/stories-section';


describe('StoriesSection', function () {
  it('should be renderable', function () {
    const stories = [1, 2, 3].map((id) => (StoryFactory.build({ id: id })));
    const imageStory = stories[0];
    const noImageStories = stories.slice(1, 3);
    const handleStoryClick = () => {};

    StoriesSection.should.be.renderable({ noImageStories, imageStory, handleStoryClick });
  });
});
