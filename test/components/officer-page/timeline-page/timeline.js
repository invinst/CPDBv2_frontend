import React from 'react';
import { spy } from 'sinon';
import InfiniteScroll from 'react-infinite-scroller';
import {
  renderIntoDocument, scryRenderedComponentsWithType, findRenderedComponentWithType
} from 'react-addons-test-utils';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import TimelineItem from 'components/officer-page/timeline-page/timeline-item';
import Timeline from 'components/officer-page/timeline-page/timeline';


describe('Timeline component', function () {
  let instance;
  const items = [{}, {}, {}];

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    Timeline.should.be.renderable();
  });

  it('should invoke fetchTimelineItems when mounted', function () {
    const fetchTimelineItems = spy();
    instance = renderIntoDocument(
      <Timeline fetchTimelineItems={ fetchTimelineItems } sortParams={ { a: 'a' } } officerId={ 123 }/>
    );
    fetchTimelineItems.calledWith(123, { a: 'a' }).should.be.true();
  });

  it('should invoke fetchTimelineItems when sortParams change', function () {
    const fetchTimelineItems = spy();
    instance = renderIntoDocument(
      <Timeline fetchTimelineItems={ fetchTimelineItems } sortParams={ { a: 'a' } } officerId={ 123 }/>
    );
    reRender(
      <Timeline fetchTimelineItems={ fetchTimelineItems } sortParams={ { b: 'b' } } officerId={ 123 }/>,
      instance
    );
    fetchTimelineItems.calledWith(123, { b: 'b' }).should.be.true();
  });

  it('should invoke fetchTimelineItems when officerId change', function () {
    const fetchTimelineItems = spy();
    instance = renderIntoDocument(
      <Timeline fetchTimelineItems={ fetchTimelineItems } sortParams={ { a: 'a' } } officerId={ 123 }/>
    );
    reRender(
      <Timeline fetchTimelineItems={ fetchTimelineItems } sortParams={ { a: 'a' } } officerId={ 456 }/>,
      instance
    );
    fetchTimelineItems.calledWith(123, { a: 'a' }).should.be.true();
  });

  it('should invoke fetchTimelineItemsWhenIndexOutOfBound when selectedItemIndex change', function (done) {
    const fetchSpy = spy();
    instance = renderIntoDocument(
      <Timeline fetchTimelineItemsWhenIndexOutOfBound={ fetchSpy }
        selectedItemIndex={ 0 }/>);
    reRender(
      <Timeline selectedItemIndex={ 1 } fetchTimelineItemsWhenIndexOutOfBound={ fetchSpy }
        items={ items } sortParams={ { a: 'a' } }/>,
      instance
    );
    fetchSpy.calledWith(3, 1, 123);
    instance.state.flashItemIndex.should.not.eql(1);
    setTimeout(() => {
      instance.state.flashItemIndex.should.eql(1);
      done();
    }, 500);
  });

  it('should update selectedItemTop when an item is selected', function () {
    instance = renderIntoDocument(<Timeline items={ items }/>);
    scryRenderedComponentsWithType(instance, TimelineItem)[0].props.onSelected(10);
    instance.state.selectedItemTop.should.eql(10);
  });

  describe('infinite scroll', function () {
    it('should invoke fetchTimelineItems when hasMore', function () {
      const fetchTimelineItems = spy();
      instance = renderIntoDocument(
        <Timeline items={ items } hasMore={ true } fetchTimelineItems={ fetchTimelineItems }
          sortParams={ { a: 'a' } } nextParams={ { b: 'b' } } officerId={ 123 }/>
      );
      findRenderedComponentWithType(instance, InfiniteScroll).props.loadMore();
      fetchTimelineItems.calledWith(123, { a: 'a', b: 'b' }).should.be.true();
    });

    it('should not invoke fetchTimelineItems when not hasMore', function () {
      const fetchTimelineItems = spy();
      instance = renderIntoDocument(
        <Timeline items={ items } hasMore={ false } fetchTimelineItems={ fetchTimelineItems }
          sortParams={ { a: 'a' } } nextParams={ { b: 'b' } } officerId={ 123 }/>
      );
      findRenderedComponentWithType(instance, InfiniteScroll).props.loadMore();
      fetchTimelineItems.calledWith(123, { a: 'a', b: 'b' }).should.be.false();
    });
  });

  it('should invoke hoverTimelineItem when hover on an item', function () {
    const onHover = spy();
    instance = renderIntoDocument(<Timeline items={ items } hoverTimelineItem={ onHover }/>);
    scryRenderedComponentsWithType(instance, TimelineItem)[0].props.onHover(true);
    onHover.calledWith(0).should.be.true();
    scryRenderedComponentsWithType(instance, TimelineItem)[0].props.onHover(false);
    onHover.calledWith(null).should.be.true();
  });
});
