import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import { UnconnectedStoriesContainer } from 'containers/stories-container';
import StoryFactory from 'utils/test/factories/story';
import Stories from 'components/landing-page/stories/stories';
import StoriesPlaceHolder from 'components/landing-page/stories/stories-place-holder';


describe('UnconnectedStoriesContainer', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render Stories when data is available', function () {
    instance = renderIntoDocument(
      <UnconnectedStoriesContainer
        requestStories={ () => {} } noImageStories={ StoryFactory.buildList(2) }
        imageStory={ StoryFactory.build() } dataAvailable={ true }
        openBottomSheetWithStory={ () => {} }/>
    );
    findRenderedComponentWithType(instance, Stories);
  });

  it('should render StoriesPlaceHolder when data is not available', function () {
    instance = renderIntoDocument(
      <UnconnectedStoriesContainer
        requestStories={ () => {} } dataAvailable={ false }
        openBottomSheetWithStory={ () => {} }/>
    );
    findRenderedComponentWithType(instance, StoriesPlaceHolder);
  });

  it('should call requestStories when it just mount', function () {
    const callback = spy();
    instance = renderIntoDocument(
      <UnconnectedStoriesContainer
        requestStories={ callback } noImageStories={ StoryFactory.buildList(2) }
        imageStory={ StoryFactory.build() } dataAvailable={ true }
        openBottomSheetWithStory={ () => {} }/>
    );
    callback.called.should.be.true();
  });

  it('should call openBottomSheetWithStory when a story is clicked', function () {
    const callback = spy();
    instance = renderIntoDocument(
      <UnconnectedStoriesContainer
        requestStories={ () => {} } noImageStories={ StoryFactory.buildList(2) }
        imageStory={ StoryFactory.build() } dataAvailable={ true }
        openBottomSheetWithStory={ callback }/>
    );
    const storiesInstance = findRenderedComponentWithType(instance, Stories);
    const story = StoryFactory.build();
    storiesInstance.props.handleStoryClick(story);
    callback.calledWith(story).should.be.true();
  });
});
