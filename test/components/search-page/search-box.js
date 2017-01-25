import React from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';
import { spy } from 'sinon';

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
});
