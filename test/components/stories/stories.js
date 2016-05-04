import 'should';
import React from 'react';
import {unmountComponentAtNode, findDOMNode} from 'react-dom';
import {Simulate, renderIntoDocument, scryRenderedDOMComponentsWithClass} from 'react-addons-test-utils';

import 'utils/test/React';
import Stories from 'components/stories/stories';
import StoryFactory from 'utils/test/factories/story';


describe('Stories component', function () {
  let element;
  const stories = [1, 2, 3].map((id) => (StoryFactory.build({id: id})));

  afterEach(function () {
    if (element) {
      unmountComponentAtNode(findDOMNode(element).parentNode);
    }
  });

  it('should render in all screen size', function () {
    Stories.should.be.renderable();
    Stories.should.be.responsiveRenderable();
  });

  it('should update selectedStoryKey depending on which story is expanded', function () {
    element = renderIntoDocument(<Stories stories={ stories } featuredStoryId={ 1 } device='desktop'/>);

    let smallStory = findDOMNode(scryRenderedDOMComponentsWithClass(element, 'story-small')[0]);
    Simulate.click(smallStory);
    element.state.selectedStoryKey.should.equal(2);

    let closeButton = findDOMNode(scryRenderedDOMComponentsWithClass(element, 'story-small__close-button')[0]);
    Simulate.click(closeButton);
    (element.state.selectedStoryKey === null).should.be.true();
  });
});
