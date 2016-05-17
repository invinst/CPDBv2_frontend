import React from 'react';
import {
  Simulate, renderIntoDocument, scryRenderedDOMComponentsWithClass, findRenderedComponentWithType,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import { withAnimationDisabled } from 'utils/test';
import Stories from 'components/stories/stories';
import ArticleSmall from 'components/common/article-small';
import ExpandTransition from 'components/animation/expand-transition';
import StoryFactory from 'utils/test/factories/story';


describe('Stories component', function () {
  let element;
  const stories = [1, 2, 3].map((id) => (StoryFactory.build({ id: id })));
  const featuredStory = stories[0];
  const smallStories = stories.slice(1, 3);

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should render in all screen size', function () {
    Stories.should.be.renderable({ smallStories, featuredStory });
    Stories.should.be.responsiveRenderable({ smallStories, featuredStory });
  });

  it('should update selectedStoryKey depending on which story is expanded', function () {
    withAnimationDisabled(() => {
      element = renderIntoDocument(
        <Stories smallStories={ smallStories } featuredStory={ featuredStory } device='desktop'/>);
      let smallStory = scryRenderedDOMComponentsWithClass(element, 'article-small')[0];
      Simulate.click(smallStory);
      element.state.selectedStoryKey.should.equal(2);
    });
  });

  it('should set selectedStoryKey to null when story is closed', function () {
    withAnimationDisabled(() => {
      element = renderIntoDocument(
        <Stories smallStories={ smallStories } featuredStory={ featuredStory } device='desktop'/>);
      let smallStory = scryRenderedComponentsWithType(element, ArticleSmall)[0];
      Simulate.click(smallStory);
      smallStory.props.onClose([null, null]);
      (element.state.selectedStoryKey === null).should.be.true();
    });
  });

  it('should change storyExpanded state when ExpandTransition begin expanding or fully closed', function () {
    withAnimationDisabled(() => {
      element = renderIntoDocument(
        <Stories smallStories={ smallStories } featuredStory={ featuredStory } device='desktop'/>);
      let transition = findRenderedComponentWithType(element, ExpandTransition);

      transition.props.onFullyClosed(1);
      element.state.storyExpanded.should.deepEqual({ 1: false });

      transition.props.onExpansionBegin(2);
      element.state.storyExpanded.should.deepEqual({ 2: true });
    });
  });
});
