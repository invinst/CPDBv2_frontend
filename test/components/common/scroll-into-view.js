import React from 'react';
import { mount } from 'enzyme';
import { stub } from 'sinon';

import ScrollIntoView from 'components/common/scroll-into-view';


describe('ScrollIntoView component', function () {
  it('should renderable', function () {
    ScrollIntoView.should.be.renderable();
  });

  it('should scroll into view', function () {
    const focusedItemClassName = 'test--class-name';
    const scrollIntoViewStub = stub();
    stub(document, 'getElementsByClassName').returns([{ scrollIntoView: scrollIntoViewStub }]);

    const wrapper = mount(
      <ScrollIntoView>
        <div className={ focusedItemClassName } />
      </ScrollIntoView>
    );

    wrapper.setProps({ focusedItemClassName });

    scrollIntoViewStub.should.be.calledWith({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });
  });
});
