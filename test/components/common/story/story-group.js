import React from 'react';
import {
  renderIntoDocument, findRenderedDOMComponentWithClass, scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';


import StoryGroup from 'components/common/story/story-group';
import StoryFactory from 'utils/test/factories/story';


describe('StoryGroup component', function () {
  let instance;

  it('should be renderable', function () {
    StoryGroup.should.be.renderable();
  });

  it('should render story in full width if stories length is 1', function () {
    instance = renderIntoDocument(<StoryGroup stories={ StoryFactory.buildList(1) }/>);
    findRenderedDOMComponentWithClass(instance, 'pure-u-1-1').should.be.ok();
  });

  it('should render stories in half width if stories length is larger than 1', function () {
    instance = renderIntoDocument(<StoryGroup stories={ StoryFactory.buildList(3) }/>);
    scryRenderedDOMComponentsWithClass(instance, 'pure-u-1-2').length.should.be.equal(3);
  });
});
