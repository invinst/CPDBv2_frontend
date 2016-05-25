import React from 'react';
import { spy } from 'sinon';
import { Simulate, renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import StoryMedium from 'components/stories/story-medium';
import StoryFactory from 'utils/test/factories/story';
import { unmountComponentSuppressError } from 'utils/test';


describe('StoryMedium component', function () {
  let element;

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should render in all screen size', function () {
    StoryMedium.should.be.renderable();
    StoryMedium.should.be.responsiveRenderable();
  });

  it('should trigger onClick', function () {
    const callback = spy();
    element = renderIntoDocument(<StoryMedium onClick={ callback } story={ StoryFactory.build() }/>);
    Simulate.click(findRenderedDOMComponentWithClass(element, 'story-medium'));
    callback.called.should.be.true();
  });
});
