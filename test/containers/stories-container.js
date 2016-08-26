import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import { UnconnectedStoriesContainer } from 'containers/stories-container';
import StoryFactory from 'utils/test/factories/story';
import CoverageSectionContent from 'components/landing-page/coverage-section/coverage-section-content';
import StoriesPlaceHolder from 'components/landing-page/stories/stories-place-holder';


describe('UnconnectedStoriesContainer', function () {
  const stories = StoryFactory.buildList(3);
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render CoverageSectionContent when data is available', function () {
    instance = renderIntoDocument(
      <UnconnectedStoriesContainer
        requestStories={ () => {} } stories={ stories } dataAvailable={ true }
        openBottomSheetWithStory={ () => {} }/>
    );
    findRenderedComponentWithType(instance, CoverageSectionContent);
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
        requestStories={ callback } stories={ stories } dataAvailable={ true }
        openBottomSheetWithStory={ () => {} }/>
    );
    callback.called.should.be.true();
  });

  it('should call openBottomSheetWithStory when a story is clicked', function () {
    UnconnectedStoriesContainer.should.triggerCallbackWhenClick('openBottomSheetWithStory', 'story-title', {
      requestStories: () => {},
      stories: stories,
      dataAvailable: true
    });
  });
});
