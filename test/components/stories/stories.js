import 'should';
import React from 'react';
import {findDOMNode} from 'react-dom';
import {
  Simulate, renderIntoDocument, scryRenderedDOMComponentsWithClass, findRenderedComponentWithType,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';

import 'utils/test/React';
import {unmountComponentSuppressError} from 'utils/test';
import {withAnimationDisabled} from 'utils/test';
import Stories from 'components/stories/stories';
import StorySmall from 'components/stories/story-small';
import ExpandTransition from 'components/animation/expand-transition';
import StoryFactory from 'utils/test/factories/story';


describe('Stories component', function () {
  let element;
  const stories = [1, 2, 3].map((id) => (StoryFactory.build({id: id})));

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should render in all screen size', function () {
    Stories.should.be.renderable();
    Stories.should.be.responsiveRenderable();
  });

  it('should update selectedStoryKey depending on which story is expanded', function () {
    withAnimationDisabled(() => {
      element = renderIntoDocument(<Stories stories={ stories } featuredStoryId={ 1 } device='desktop'/>);
      let smallStory = scryRenderedDOMComponentsWithClass(element, 'story-small')[0];
      Simulate.click(smallStory);
      element.state.selectedStoryKey.should.equal(2);
    });
  });

  it('should set selectedStoryKey to null when story is closed', function () {
    element = renderIntoDocument(<Stories stories={ stories } featuredStoryId={ 1 } device='desktop'/>);
    let smallStory = scryRenderedComponentsWithType(element, StorySmall)[0];
    Simulate.click(findDOMNode(smallStory));
    smallStory.props.onClose();
    (element.state.selectedStoryKey === null).should.be.true();
  });

  it('should change storyExpanded state when ExpandTransition begin expanding or fully closed', function () {
    withAnimationDisabled(() => {
      element = renderIntoDocument(<Stories stories={ stories } featuredStoryId={ 1 } device='desktop'/>);
      let transition = findRenderedComponentWithType(element, ExpandTransition);

      transition.props.onFullyClosed(1);
      element.state.storyExpanded.should.deepEqual({1: false});

      transition.props.onExpandingBegin(2);
      element.state.storyExpanded.should.deepEqual({2: true});
    });
  });
});
