import React from 'react';
import { spy } from 'sinon';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import { UnconnectedStoriesPageContainer } from 'containers/stories-page/stories-page-container';
import StoryFactory from 'utils/test/factories/story';
import NonFeaturedStories from 'components/stories-page/non-featured-stories';
import StoriesPagePlaceHolder from 'components/stories-page/stories-page-place-holder';


describe('UnconnectedStoriesPageContainer', function () {
  let instance;
  const featuredStoryGroups = [
    {
      imageStory: StoryFactory.build(),
      noImageStories: StoryFactory.buildList(2)
    },
    {
      imageStory: StoryFactory.build(),
      noImageStories: StoryFactory.buildList(2)
    }
  ];
  const nonFeaturedStories = StoryFactory.buildList(3);

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render NonFeaturedStories when data is available', function () {
    instance = renderIntoDocument(
      <UnconnectedStoriesPageContainer requestStories={ () => {} } dataAvailable={ true }
        featuredStoryGroups={ featuredStoryGroups } nonFeaturedStories={ nonFeaturedStories }
        openBottomSheetWithStory={ () => {} }/>
    );
    findRenderedComponentWithType(instance, NonFeaturedStories);
  });

  it('should render StoriesPagePlaceHolder when data is not available', function () {
    instance = renderIntoDocument(
      <UnconnectedStoriesPageContainer requestStories={ () => {} } nonFeaturedStories={ [] }
        dataAvailable={ false } openBottomSheetWithStory={ () => {} }/>
    );
    findRenderedComponentWithType(instance, StoriesPagePlaceHolder);
  });

  it('should call requestStories when it just mount', function () {
    const callback = spy();
    instance = renderIntoDocument(
      <UnconnectedStoriesPageContainer requestStories={ callback } nonFeaturedStories={ [] }
        dataAvailable={ false } openBottomSheetWithStory={ () => {} }/>
    );
    callback.called.should.be.true();
  });
});
