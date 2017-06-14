import React from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';
import { spy, stub } from 'sinon';

import SearchBox from 'components/search-page/search-box';
import { unmountComponentSuppressError } from 'utils/test';


describe('SearchBox component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    SearchBox.should.be.renderable();
  });

  it('should handle ESCAPE', function () {
    const onEscape = spy();

    instance = renderIntoDocument(
      <SearchBox onEscape={ onEscape }/>
    );

    instance.mousetrap.trigger('esc');
    onEscape.calledOnce.should.be.true();
  });

  it('should handle ENTER', function () {
    const onEnter = spy();

    instance = renderIntoDocument(
      <SearchBox onEnter={ onEnter }/>
    );

    instance.mousetrap.trigger('enter');
    onEnter.calledOnce.should.be.true();
  });

  it('should blur when press up', function () {
    instance = renderIntoDocument(
      <SearchBox/>
    );
    const blur = stub(instance.searchInput, 'blur');

    instance.mousetrap.trigger('up');
    blur.calledOnce.should.be.true();
  });

  it('should blur when press down', function () {
    instance = renderIntoDocument(
      <SearchBox/>
    );
    const blur = stub(instance.searchInput, 'blur');

    instance.mousetrap.trigger('down');
    blur.calledOnce.should.be.true();
  });
});
