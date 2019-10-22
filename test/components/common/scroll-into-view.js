import React from 'react';
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

  it('should scroll into view', function () {
    const focusedItemClassName = 'test--class-name';
    const scrollIntoViewStub = stub();
    stub(document, 'getElementsByClassName').returns([{ scrollIntoView: scrollIntoViewStub }]);

    instance = renderIntoDocument(
      <ScrollIntoView>
        <div className={ focusedItemClassName } />
      </ScrollIntoView>
    );

    reRender(
      <ScrollIntoView focusedItemClassName={ focusedItemClassName }>
        <div className={ focusedItemClassName } />
      </ScrollIntoView>,
      instance
    );

    scrollIntoViewStub.should.be.calledWith({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });
  });
});
