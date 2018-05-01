import React from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';
import { stub } from 'sinon';

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

  it('should not change offset when the focusedClassName is not change', function () {
    instance = renderIntoDocument(
      <ScrollIntoView focusedClassName='a' />
    );
    instance.state.offset.should.eql(0);
    instance.scrollerRef = {};

    reRender(
      <ScrollIntoView focusedClassName='a' />,
      instance
    );
    instance.state.offset.should.eql(0);
  });

  it('should not change offset when the focused item is within view', function () {
    stub(document, 'getElementsByClassName').returns([{
      getBoundingClientRect: () => ({
        top: 60,
        height: 10
      })
    }]);

    instance = renderIntoDocument(
      <ScrollIntoView focusedClassName='a' />
    );
    instance.state.offset.should.eql(0);
    instance.scrollerRef = {
      view: {
        getBoundingClientRect: () => ({
          top: 30,
          height: 100
        })
      }
    };

    reRender(
      <ScrollIntoView focusedClassName='b' />,
      instance
    );
    instance.state.offset.should.eql(0);
    document.getElementsByClassName.restore();
  });

  it('should calculate new offset when the focused item is outside of view', function () {
    stub(document, 'getElementsByClassName').callsFake((item) => {
      if (item === 'prev') {
        return [{
          getBoundingClientRect: () => ({
            top: 60,
            height: 10
          })
        }];
      } else {
        return [{
          getBoundingClientRect: () => ({
            top: 130,
            height: 10
          })
        }];
      }
    });

    instance = renderIntoDocument(
      <ScrollIntoView focusedClassName='prev' />
    );
    instance.state.offset.should.eql(0);
    instance.scrollerRef = {
      view: {
        getBoundingClientRect: () => ({
          top: 30,
          height: 100
        })
      },
      getScrollTop: () => 0
    };

    reRender(
      <ScrollIntoView focusedClassName='next' />,
      instance
    );

    instance.state.offset.should.eql(45);
    document.getElementsByClassName.restore();
  });
});
