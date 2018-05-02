import React from 'react';
import should from 'should';
import { stub } from 'sinon';
import { renderIntoDocument } from 'react-addons-test-utils';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import ScrollIntoView from 'components/common/scroll-into-view';


describe('ScrollIntoView component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    ScrollIntoView.should.be.renderable();
  });

  it('should not set state when desired offset is null', function () {
    instance = renderIntoDocument(
      <ScrollIntoView focusedClassName='prev' />
    );
    instance.getDesiredOffset = () => null;

    reRender(
      <ScrollIntoView focusedClassName='next' />,
      instance
    );
    instance.state.offset.should.eql(0);
  });

  it('should set state when desired offset is not null', function () {
    instance = renderIntoDocument(
      <ScrollIntoView focusedClassName='prev' />
    );
    instance.getDesiredOffset = () => 10;

    reRender(
      <ScrollIntoView focusedClassName='next' />,
      instance
    );
    instance.state.offset.should.eql(10);
  });

  describe('getDesiredOffset', function () {
    beforeEach(function () {
      instance = renderIntoDocument(
        <ScrollIntoView focusedClassName='prev'/>
      );
    });

    afterEach(function () {
      if (document.getElementsByClassName.restore !== undefined) {
        document.getElementsByClassName.restore();
      }
    });

    it('should return null if there is no scrollerRef', function () {
      instance.scrollerRef = undefined;
      should(instance.getDesiredOffset({})).eql(null);
    });

    it('should return null if focusedClassName hasnt changed', function () {
      should(instance.getDesiredOffset({ focusedClassName: 'prev' })).eql(null);
    });

    it('should return null if there is no element with focusedClassName', function () {
      stub(document, 'getElementsByClassName').returns([]);
      should(instance.getDesiredOffset({ focusedClassName: 'next' })).eql(null);
    });

    it('should decrease scrollTop if child top is above parent top', function () {
      stub(document, 'getElementsByClassName').returns([{
        getBoundingClientRect: () => ({
          top: 10,
          height: 40
        })
      }]);
      stub(instance.scrollerRef.view, 'getBoundingClientRect').returns({
        top: 20,
        height: 100
      });
      stub(instance.scrollerRef, 'getScrollTop').returns(10);
      should(instance.getDesiredOffset({ focusedClassName: 'next' })).eql(0);
    });

    it('should increase scrollTop is child rect is out of parent rect', function () {
      stub(document, 'getElementsByClassName').returns([{
        getBoundingClientRect: () => ({
          top: 90,
          height: 40
        })
      }]);
      stub(instance.scrollerRef.view, 'getBoundingClientRect').returns({
        top: 20,
        height: 100
      });
      stub(instance.scrollerRef, 'getScrollTop').returns(10);
      should(instance.getDesiredOffset({ focusedClassName: 'next' })).eql(20);
    });

    it('should return null if child rect is visible in parent rect', function () {
      stub(document, 'getElementsByClassName').returns([{
        getBoundingClientRect: () => ({
          top: 90,
          height: 20
        })
      }]);
      stub(instance.scrollerRef.view, 'getBoundingClientRect').returns({
        top: 20,
        height: 100
      });
      should(instance.getDesiredOffset({ focusedClassName: 'next' })).eql(null);
    });
  });
});
