import React from 'react';
import { spy } from 'sinon';
import { Simulate, renderIntoDocument, scryRenderedDOMComponentsWithClass } from 'react-addons-test-utils';

import Stories from 'components/stories/stories';
import StoryFactory from 'utils/test/factories/story';
import { unmountComponentSuppressError } from 'utils/test';


describe('Stories component', function () {
  const stories = [1, 2, 3].map((id) => (StoryFactory.build({ id: id })));
  const featuredStory = stories[0];
  const smallStories = stories.slice(1, 3);
  let element;

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should render in all screen size', function () {
    Stories.should.be.renderable({ smallStories, featuredStory });
    Stories.should.be.responsiveRenderable({ smallStories, featuredStory });
  });

  it('should trigger onStoryClick', function () {
    const cb = spy();
    element = renderIntoDocument(
      <Stories onStoryClick={ cb } smallStories={ smallStories } featuredStory={ featuredStory }/>
    );
    Simulate.click(scryRenderedDOMComponentsWithClass(element, 'story-medium')[0]);
    Simulate.click(scryRenderedDOMComponentsWithClass(element, 'article-small')[0]);
    cb.callCount.should.equal(2);
  });
});
