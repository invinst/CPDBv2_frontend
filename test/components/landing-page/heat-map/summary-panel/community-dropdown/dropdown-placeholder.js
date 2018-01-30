import React from 'react';
import { findDOMNode } from 'react-dom';
import { spy } from 'sinon';
import { renderIntoDocument, Simulate } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import DropdownPlaceholder from
  'components/landing-page/heat-map/summary-panel/community-dropdown/dropdown-placeholder';


describe('DropdownPlaceholder component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    DropdownPlaceholder.should.be.renderable();
  });

  it('should trigger openDropdown when click on', function () {
    const openDropdown = spy();
    instance = renderIntoDocument(<DropdownPlaceholder openDropdown={ openDropdown }/>);
    Simulate.click(findDOMNode(instance));
    openDropdown.called.should.be.true();
  });
});
