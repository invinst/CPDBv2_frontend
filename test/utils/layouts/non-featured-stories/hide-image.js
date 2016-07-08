import { buildLayout } from 'utils/layouts/non-featured-stories/hide-image';
import StoryFactory from 'utils/test/factories/story';


describe('buildLayout', function () {
  it('should set isDisplayImage base on if story has image or not', function () {
    const stories = [StoryFactory.build({ imageUrl: '' }), ...StoryFactory.buildList(2, { imageUrl: 'url' })];
    const layouts = buildLayout(stories, 5);

    layouts[stories[0].id].isDisplayImage.should.be.false();
    layouts[stories[1].id].isDisplayImage.should.be.true();
    layouts[stories[2].id].isDisplayImage.should.be.true();
  });

  it('should set isDisplayImage as false for image story if there no space left', function () {
    const stories = StoryFactory.buildList(3, { imageUrl: 'url' });
    const layouts = buildLayout(stories, 5);

    layouts[stories[0].id].isDisplayImage.should.be.true();
    layouts[stories[1].id].isDisplayImage.should.be.true();
    layouts[stories[2].id].isDisplayImage.should.be.false();
  });
});
