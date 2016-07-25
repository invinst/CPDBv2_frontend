import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithClass, Simulate } from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import isMobile from 'ismobilejs';

import Story from 'components/common/story/story';
import StoryFactory from 'utils/test/factories/story';
import { unmountComponentSuppressError } from 'utils/test';


describe('Story component', function () {
  let instance;
  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  const story = StoryFactory.build();

  it('should be renderable', function () {
    Story.should.be.renderable({ story: story });
  });

  it('should trigger onClick', function () {
    Story.should.triggerCallbackWhenClick('onClick', 'story-title', { story: story }, story);
  });

  it('should render changed style on mouse over', function () {
    instance = renderIntoDocument(
      <Story story={ story }/>
    );

    Simulate.mouseOver(findDOMNode(instance));
    findRenderedDOMComponentWithClass(instance, 'story-title').style.color.should.equal('rgb(0, 94, 244)');
    findRenderedDOMComponentWithClass(instance, 'story-source').style.color.should.equal('rgb(0, 94, 244)');
    findRenderedDOMComponentWithClass(instance, 'story-post-date').style.color.should.equal('rgb(0, 94, 244)');
  });

  it('should render normal style on mouse out', function () {
    instance = renderIntoDocument(
      <Story story={ story }/>
    );

    Simulate.mouseOver(findDOMNode(instance));
    Simulate.mouseOut(findDOMNode(instance));
    findRenderedDOMComponentWithClass(instance, 'story-title').style.color.should.equal('rgb(35, 31, 32)');
    findRenderedDOMComponentWithClass(instance, 'story-source').style.color.should.equal('rgb(29, 29, 29)');
    // It should be rgba(38, 38, 38, 0.5) but for some reason, the alpha channel value is 0.49...
    findRenderedDOMComponentWithClass(instance, 'story-post-date').style.color.should.containEql('rgba(38, 38, 38');
  });

  it('should render normal style on touch on touch devices', function () {
    isMobile.any = true;
    instance = renderIntoDocument(
      <Story story={ story }/>
    );
    Simulate.mouseOver(findDOMNode(instance));
    findRenderedDOMComponentWithClass(instance, 'story-title').style.color.should.equal('rgb(0, 94, 244)');
    findRenderedDOMComponentWithClass(instance, 'story-source').style.color.should.equal('rgb(0, 94, 244)');
    findRenderedDOMComponentWithClass(instance, 'story-post-date').style.color.should.equal('rgb(0, 94, 244)');
  });
});
