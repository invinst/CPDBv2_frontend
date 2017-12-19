import React from 'react';
import { spy } from 'sinon';
import {
  renderIntoDocument, scryRenderedComponentsWithType, scryRenderedDOMComponentsWithClass, Simulate
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Navigation from 'components/search-page/search-terms/navigation';
import NavigationItem from 'components/search-page/search-terms/navigation-item';


describe('Navigation component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    Navigation.should.be.renderable();
  });

  it('should render the items', function () {
    instance = renderIntoDocument(<Navigation items={ ['a', 'b', 'c'] }/>);

    scryRenderedComponentsWithType(instance, NavigationItem).should.have.length(3);
  });

  it('should trigger onSelectItem when click on item', function () {
    const callback = spy();
    instance = renderIntoDocument(<Navigation items={ ['a', 'b', 'c'] } onSelectItem={ callback }/>);
    const items = scryRenderedDOMComponentsWithClass(instance, 'test--navigation-item');
    Simulate.click(items[1]);
    callback.calledWith(1).should.be.true();
  });
});
