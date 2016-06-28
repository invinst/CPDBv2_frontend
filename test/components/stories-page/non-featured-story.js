import React from 'react';
import {
  renderIntoDocument, findRenderedComponentWithType, findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass, scryRenderedComponentsWithType
} from 'react-addons-test-utils';
import { unmountComponentSuppressError } from 'utils/test';

import StoryFactory from 'utils/test/factories/story';
import NonFeaturedStory from 'components/stories-page/non-featured-story';
import CoverImage from 'components/common/cover-image';
import ArticleSmall from 'components/common/article-small';


describe('NonFeaturedStory component', function () {
  const story = StoryFactory.build();
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correct number wrapper class', function () {
    instance = renderIntoDocument(<NonFeaturedStory story={ story } grids={ 4 } isDisplayImage={ true }/>);
    // There are 2 elements with class `pure-u-1-2` for image and story content
    scryRenderedDOMComponentsWithClass(instance, 'pure-u-1-2').length.should.equal(3);

    unmountComponentSuppressError(instance);

    instance = renderIntoDocument(<NonFeaturedStory story={ story } grids={ 5 } isDisplayImage={ true }/>);
    findRenderedDOMComponentWithClass(instance, 'pure-u-2-5');

    unmountComponentSuppressError(instance);

    instance = renderIntoDocument(<NonFeaturedStory story={ story } grids={ 4 }/>);
    findRenderedDOMComponentWithClass(instance, 'pure-u-1-4');

    unmountComponentSuppressError(instance);

    instance = renderIntoDocument(<NonFeaturedStory story={ story } grids={ 5 }/>);
    findRenderedDOMComponentWithClass(instance, 'pure-u-1-5');
  });

  it('should render image story if isDisplayImage is true', function () {
    instance = renderIntoDocument(<NonFeaturedStory story={ story } grids={ 4 } isDisplayImage={ true }/>);
    findRenderedComponentWithType(instance, CoverImage);
    findRenderedComponentWithType(instance, ArticleSmall);

    unmountComponentSuppressError(instance);

    instance = renderIntoDocument(<NonFeaturedStory story={ story } grids={ 4 }/>);
    scryRenderedComponentsWithType(instance, CoverImage).length.should.equal(0);
    findRenderedComponentWithType(instance, ArticleSmall);
  });

  it('should trigger handleClick on click', function () {
    NonFeaturedStory.should.triggerCallbackWhenClick(
      'handleClick', 'article-small', { story: story, grids: 4 }, story
    );
  });
});
