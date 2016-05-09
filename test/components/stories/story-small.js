import 'should';
import { spy } from 'sinon';
import React from 'react';
import {
  renderIntoDocument, findRenderedDOMComponentWithClass, scryRenderedDOMComponentsWithClass, Simulate
} from 'react-addons-test-utils';

import StorySmall from 'components/stories/story-small';
import 'utils/test/React';
import { unmountComponentSuppressError } from 'utils/test';
import StoryFactory from 'utils/test/factories/story';


describe('StorySmall component', function () {
  let element;

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should render', function () {
    StorySmall.should.be.renderable();
  });

  it('should show CloseButton on active', function () {
    element = renderIntoDocument(<StorySmall active={ true }/>);
    findRenderedDOMComponentWithClass(element, 'story-small__close-button');
  });

  it('should hide CloseButton when inactive', function () {
    element = renderIntoDocument(<StorySmall active={ false }/>);
    scryRenderedDOMComponentsWithClass(element, 'story-small__close-button').length.should.equal(0);
  });

  it('should trigger onClose when clicked while active', function () {
    let onClose = spy();
    element = renderIntoDocument(<StorySmall active={ true } onClose={ onClose }/>);
    Simulate.click(findRenderedDOMComponentWithClass(element, 'story-small'));
    onClose.called.should.be.true();
  });

  it('should trigger onOpen with right story onClick', function () {
    let story = StoryFactory.build();
    let onOpen = spy();
    element = renderIntoDocument(<StorySmall active={ false } onOpen={ onOpen } story={ story }/>);
    Simulate.click(findRenderedDOMComponentWithClass(element, 'story-small'));
    onOpen.calledWith(story).should.be.true();
  });
});
