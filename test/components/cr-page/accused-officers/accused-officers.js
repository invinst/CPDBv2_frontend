import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument, findRenderedDOMComponentWithClass, Simulate } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import AccusedOfficers from 'components/cr-page/accused-officers';


describe('AccusedOfficers component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    AccusedOfficers.should.be.renderable();
  });

  it('should display show more button when accused list is not expanded', function () {
    instance = renderIntoDocument(<AccusedOfficers />);
    instance.setState({ expanded: false });

    const innerHTML = findDOMNode(instance).innerHTML;
    innerHTML.should.containEql('Show all accused officers');
  });

  it('should expand accused officers when click on show more button', function () {
    instance = renderIntoDocument(<AccusedOfficers />);

    const showMoreButton = findRenderedDOMComponentWithClass(instance, 'test--accused-show-more-button');
    Simulate.click(showMoreButton);

    instance.state.expanded.should.be.true();
  });
});
