import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import NonFeaturedStories from 'components/stories-page/non-featured-stories';
import StoryFactory from 'utils/test/factories/story';
import { unmountComponentSuppressError } from 'utils/test';
import LoadingIndicator from 'components/stories-page/loading-indicator';


describe('NonFeaturedStories component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render in all screen size', function () {
    const stories = StoryFactory.buildList(3);

    NonFeaturedStories.should.be.renderable({ stories });
    NonFeaturedStories.should.be.responsiveRenderable({ stories });
  });

  it('should render LoadingIndicator when loading more data', function () {
    const stories = StoryFactory.buildList(3);

    instance = renderIntoDocument(
      <NonFeaturedStories stories={ stories } onStoryClick={ () => {} } moreDataAvailable={ false }/>
    );

    findRenderedComponentWithType(instance, LoadingIndicator).should.be.ok();
  });
});
