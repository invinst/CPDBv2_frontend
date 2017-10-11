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

  it('should invoke fetchTimelineFullItems and fetchMinimap when sortParams change', function () {
    const fetchTimelineFullItems = spy();
    const fetchMinimap = spy();
    instance = renderIntoDocument(
      <Timeline
        fetchTimelineFullItems={ fetchTimelineFullItems }
        fetchMinimap={ fetchMinimap }
        sortParams={ { a: 'a' } }
        officerId={ 123 }
      />
    );
    reRender(
      <Timeline
        fetchTimelineFullItems={ fetchTimelineFullItems }
        fetchMinimap={ fetchMinimap }
        sortParams={ { b: 'b' } }
        filters={ { c: 'c' } }
        officerId={ 123 }
      />,
      instance
    );
    fetchTimelineFullItems.calledWith(123, { b: 'b', c: 'c' }).should.be.true();
    fetchMinimap.calledWith(123, { c: 'c' }).should.be.true();
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

  it('should invoke selectTimelineItem when click on an item', function () {
    const selectTimelineItem = spy();
    instance = renderIntoDocument(<Timeline items={ items } selectTimelineItem={ selectTimelineItem }/>);
    scryRenderedComponentsWithType(instance, TimelineItem)[0].props.onClick();
    selectTimelineItem.calledWith(0).should.be.true();
  });
});
