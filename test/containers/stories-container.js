import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import { UnconnectedStoriesContainer } from 'containers/stories-container';
import StoryFactory from 'utils/test/factories/story';
import Stories from 'components/landing-page/stories/stories';
import StoriesPlaceHolder from 'components/landing-page/stories/stories-place-holder';


describe('UnconnectedStoriesContainer', function () {
  let element;

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should render Stories when data is available', function () {
    element = renderIntoDocument(
      <UnconnectedStoriesContainer
        requestStories={ () => {} } smallStories={ StoryFactory.buildList(2) }
        featuredStory={ StoryFactory.build() } dataAvailable={ true }
        openBottomSheetWithStory={ () => {} }/>
    );
    findRenderedComponentWithType(element, Stories);
  });

  it('should render StoriesPlaceHolder when data is not available', function () {
    element = renderIntoDocument(
      <UnconnectedStoriesContainer
        requestStories={ () => {} } dataAvailable={ false }
        openBottomSheetWithStory={ () => {} }/>
    );
    findRenderedComponentWithType(element, StoriesPlaceHolder);
  });

  it('should call requestStories when it just mount', function () {
    const callback = spy();
    element = renderIntoDocument(
      <UnconnectedStoriesContainer
        requestStories={ callback } smallStories={ StoryFactory.buildList(2) }
        featuredStory={ StoryFactory.build() } dataAvailable={ true }
        openBottomSheetWithStory={ () => {} }/>
    );
    callback.called.should.be.true();
  });

  it('should call openBottomSheetWithStory when a story is clicked', function () {
    const callback = spy();
    element = renderIntoDocument(
      <UnconnectedStoriesContainer
        requestStories={ () => {} } smallStories={ StoryFactory.buildList(2) }
        featuredStory={ StoryFactory.build() } dataAvailable={ true }
        openBottomSheetWithStory={ callback }/>
    );
    const storiesElement = findRenderedComponentWithType(element, Stories);
    const story = StoryFactory.build();
    storiesElement.props.onStoryClick(story);
    callback.calledWith(story).should.be.true();
  });
});
