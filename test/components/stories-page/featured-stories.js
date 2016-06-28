import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import StoryFactory from 'utils/test/factories/story';
import FeaturedStories from 'components/stories-page/featured-stories';
import FeaturedStoryGroup from 'components/stories-page/featured-story-group';


describe('FeaturedStories component', function () {
  const storyGroups = [
    {
      imageStory: StoryFactory.build(),
      noImageStories: StoryFactory.buildList(2)
    },
    {
      imageStory: StoryFactory.build(),
      noImageStories: StoryFactory.buildList(2)
    }
  ];
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render 2 featured story groups', function () {
    instance = renderIntoDocument(
      <FeaturedStories storyGroups={ storyGroups } handleStoryClick={ () => {} }/>
    );

    scryRenderedComponentsWithType(instance, FeaturedStoryGroup).length.should.equal(2);
  });
});
