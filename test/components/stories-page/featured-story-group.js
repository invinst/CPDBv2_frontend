import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import FeaturedStoryGroup from 'components/stories-page/featured-story-group';
import StoryFactory from 'utils/test/factories/story';


describe('FeaturedStoryGroup component', function () {
  const imageStory = StoryFactory.build();
  const noImageStories = StoryFactory.buildList(2);
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be responsive renderable', function () {
    FeaturedStoryGroup.should.be.renderable({ imageStory, noImageStories });
    FeaturedStoryGroup.should.be.responsiveRenderable({ imageStory, noImageStories });
  });

  it('should render image story to the right if leftAlign false', function () {
    instance = renderIntoDocument(
      <FeaturedStoryGroup imageStory={ imageStory } noImageStories={ noImageStories } handleStoryClick={ () => {} }/>
    );
    let noImagesStoriesComponent = findRenderedDOMComponentWithClass(instance, 'pure-u-1-4');
    let childNodes = noImagesStoriesComponent.parentNode.childNodes;

    childNodes[0].className.should.equal('pure-u-3-4'); // imageStory
    childNodes[1].className.should.equal('pure-u-1-4');

    unmountComponentSuppressError(instance);

    instance = renderIntoDocument(
      <FeaturedStoryGroup imageStory={ imageStory } noImageStories={ noImageStories }
        handleStoryClick={ () => {} } leftAlign={ false }/>
    );
    noImagesStoriesComponent = findRenderedDOMComponentWithClass(instance, 'pure-u-1-4');
    childNodes = noImagesStoriesComponent.parentNode.childNodes;

    childNodes[0].className.should.equal('pure-u-1-4');
    childNodes[1].className.should.equal('pure-u-3-4'); // imageStory
  });
});
