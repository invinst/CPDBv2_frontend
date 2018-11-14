import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';
import { Link } from 'react-router';

import ViewUnitProfileButton from 'components/officer-page/summary-section/view-unit-profile-button';
import { unmountComponentSuppressError } from 'utils/test';


describe('ViewUnitProfileButton component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render properly', function () {
    instance = renderIntoDocument(<ViewUnitProfileButton unitName='localUnit' />);
    findDOMNode(instance).innerText.should.containEql('View Unit Profile');
    const link = findRenderedComponentWithType(instance, Link);
    link.props.to.should.eql('/unit/localUnit/');
  });
});
