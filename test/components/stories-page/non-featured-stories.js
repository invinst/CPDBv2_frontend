import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';

import NonFeaturedStories from 'components/stories-page/non-featured-stories';
import StoryFactory from 'utils/test/factories/story';
import { unmountComponentSuppressError } from 'utils/test';
import CoverImage from 'components/common/cover-image';
import ArticleSmall from 'components/common/article-small';


describe('NonFeaturedStories component', function () {
  let instance;
  const noImageStories = StoryFactory.buildList(3, { imageUrl: '' });
  const imageStory = StoryFactory.build();

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render in all screen size', function () {
    const stories = StoryFactory.buildList(3);

    NonFeaturedStories.should.be.renderable({ stories });
    NonFeaturedStories.should.be.responsiveRenderable({ stories });
  });

  it('should render image story and no image story by default', function () {
    const stories = [imageStory, ...noImageStories];

    instance = renderIntoDocument(
      <NonFeaturedStories stories={ stories } handleStoryClick={ () => {} }/>
    );

    scryRenderedComponentsWithType(instance, CoverImage).length.should.equal(1);
    scryRenderedComponentsWithType(instance, ArticleSmall).length.should.equal(4);
  });
});
