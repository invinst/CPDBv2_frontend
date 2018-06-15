import React from 'react';
import { Link } from 'react-router';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError } from 'utils/test';
import NavigationButton from 'components/trr-page/officer-section/navigation-button';


describe('NavigationButton component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render Link with correct text', function () {
    instance = renderIntoDocument(<NavigationButton text='Some text' to='/path/to/'/>);
    const navigationButton = findRenderedComponentWithType(instance, Link);
    navigationButton.props.to.should.eql('/path/to/');
    findDOMNode(navigationButton).textContent.should.eql('Some text');
  });
});
