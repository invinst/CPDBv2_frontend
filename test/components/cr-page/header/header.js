import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument, scryRenderedComponentsWithType, findRenderedComponentWithType
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Header from 'components/cr-page/header';
import CoaccusedList from 'components/cr-page/header/coaccused-list';
import { CoaccusedDropdownButton } from 'components/cr-page/header/coaccused-dropdown-button';

describe('Header component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should display header and coaccused dropdown button', function () {
    instance = renderIntoDocument(<Header crid='123' />);
    findDOMNode(instance).innerHTML.should.containEql('CR 123');
    scryRenderedComponentsWithType(instance, CoaccusedDropdownButton).should.have.length(1);
  });

  it('should display coaccused list if displayCoaccusedDropdown is true', function () {
    instance = renderIntoDocument(<Header displayCoaccusedDropdown={ true } />);
    scryRenderedComponentsWithType(instance, CoaccusedList).should.have.length(1);
  });

  it('should not display coaccused list if displayCoaccusedDropdown is false', function () {
    instance = renderIntoDocument(<Header displayCoaccusedDropdown={ false } />);
    scryRenderedComponentsWithType(instance, CoaccusedList).should.have.length(0);
  });

  it('should have initial state', function () {
    instance = renderIntoDocument(<Header crid='123' />);
    instance.state.should.eql({
      hovering: false
    });
  });

  it('should render CoaccusedDropdownButton with setHovering function', function () {
    instance = renderIntoDocument(<Header crid='123' />);
    const dropdownButton = findRenderedComponentWithType(instance, CoaccusedDropdownButton);

    dropdownButton.props.setParentHovering.should.eql(instance.setHovering);
  });
});
