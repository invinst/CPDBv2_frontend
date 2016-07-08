import React from 'react';
import { spy, stub } from 'sinon';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import { UnconnectedNonFeaturedStoriesContainer } from 'containers/stories-page/non-featured-stories-container';
import StoryFactory from 'utils/test/factories/story';
import NonFeaturedStories from 'components/stories-page/non-featured-stories';
import StoriesPlaceHolder from 'components/stories-page/stories-place-holder';
import LoadingIndicator from 'components/stories-page/loading-indicator';


describe('UnconnectedNonFeaturedStoriesContainer', function () {
  let instance;
  let scrollCallback;
  const nonFeaturedStories = StoryFactory.buildList(3);

  beforeEach(function () {
    stub(window, 'addEventListener', (evt, cb) => {
      if (evt === 'scroll') {
        scrollCallback = cb;
      }
    });
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
    window.addEventListener.restore();
  });

  it('should render NonFeaturedStories when data is available', function () {
    instance = renderIntoDocument(
      <UnconnectedNonFeaturedStoriesContainer requestStories={ () => {} } loadMoreStories={ () => {} }
        dataAvailable={ true } nonFeaturedStories={ nonFeaturedStories }
        openBottomSheetWithStory={ () => {} }/>
    );
    findRenderedComponentWithType(instance, NonFeaturedStories);
  });

  it('should render StoriesPlaceHolder when data is not available', function () {
    instance = renderIntoDocument(
      <UnconnectedNonFeaturedStoriesContainer requestStories={ () => {} } loadMoreStories={ () => {} }
        nonFeaturedStories={ [] } dataAvailable={ false } openBottomSheetWithStory={ () => {} }/>
    );
    findRenderedComponentWithType(instance, StoriesPlaceHolder);
  });

  it('should render LoadingIndicator when loading more data', function () {
    instance = renderIntoDocument(
      <UnconnectedNonFeaturedStoriesContainer requestStories={ () => {} } loadMoreStories={ () => {} }
        nonFeaturedStories={ [] } dataAvailable={ true } openBottomSheetWithStory={ () => {} }
        moreDataAvailable={ false }/>
    );
    findRenderedComponentWithType(instance, LoadingIndicator);
  });

  it('should call requestStories when it just mount', function () {
    const callback = spy();
    instance = renderIntoDocument(
      <UnconnectedNonFeaturedStoriesContainer requestStories={ callback } loadMoreStories={ () => {} }
        nonFeaturedStories={ [] } dataAvailable={ false } openBottomSheetWithStory={ () => {} }/>
    );
    callback.called.should.be.true();
  });

  it('should call loadMoreStories when scroll to bottom and has more stories to load', function () {
    const callback = spy();
    instance = renderIntoDocument(
      <UnconnectedNonFeaturedStoriesContainer requestStories={ () => {} } loadMoreStories={ callback }
        nonFeaturedStories={ [] } dataAvailable={ true } openBottomSheetWithStory={ () => {} }
        pagination={ { next: 'next' } } moreDataAvailable={ true }/>
    );

    window.scrollY = 1000;
    scrollCallback();
    callback.called.should.be.true();
  });

  it('should not call loadMoreStories when scroll to bottom and has no more stories', function () {
    const callback = spy();
    instance = renderIntoDocument(
      <UnconnectedNonFeaturedStoriesContainer requestStories={ () => {} } loadMoreStories={ callback }
        nonFeaturedStories={ [] } dataAvailable={ true } openBottomSheetWithStory={ () => {} }
        pagination={ { next: '' } }/>
    );

    window.scrollY = 1000;
    scrollCallback();
    callback.called.should.be.false();
  });

  it('should not call loadMoreStories while loading more stories', function () {
    const callback = spy();
    instance = renderIntoDocument(
      <UnconnectedNonFeaturedStoriesContainer requestStories={ () => {} } loadMoreStories={ callback }
        nonFeaturedStories={ [] } dataAvailable={ true } openBottomSheetWithStory={ () => {} }
        pagination={ { next: 'next' } } moreDataAvailable={ false }/>
    );

    window.scrollY = 1000;
    scrollCallback();
    callback.called.should.be.false();
  });
});
