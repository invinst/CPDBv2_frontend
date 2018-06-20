import React from 'react';
import { stub } from 'sinon';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
  Simulate,
} from 'react-addons-test-utils';

import { Dropdown } from 'components/common/dropdown';
import { unmountComponentSuppressError } from 'utils/test';


describe('Dropdown component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    Dropdown.should.be.renderable();
  });

  it('should have correct default state', function () {
    instance = renderIntoDocument(
      <Dropdown
        defaultValue={ '1' }
        options={ ['1', '2', '3'] }
      />
    );
    instance.state.should.eql({
      open: false,
      selected: '1'
    });
  });

  it('should render menu items with options that are not selected', function () {
    instance = renderIntoDocument(
      <Dropdown
        defaultValue={ '1' }
        options={ ['1', '2', '3'] }
      />
    );
    instance.setState({
      open: true
    });
    findRenderedDOMComponentWithClass(instance, 'test--dropdown-menu');

    const menuItems = scryRenderedDOMComponentsWithClass(instance, 'test--dropdown-menu-item');
    menuItems.should.have.length(2);
    menuItems[0].textContent.should.eql('2');
    menuItems[1].textContent.should.eql('3');
  });

  it('should close menu when clicked on an item', function () {
    instance = renderIntoDocument(
      <Dropdown
        defaultValue={ '1' }
        options={ ['1', '2', '3'] }
      />
    );
    Simulate.click(findRenderedDOMComponentWithClass(instance, 'test--dropdown-button'));

    const firstMenuItem = scryRenderedDOMComponentsWithClass(instance, 'test--dropdown-menu-item')[0];
    Simulate.click(firstMenuItem);

    scryRenderedDOMComponentsWithClass(instance, 'test--dropdown-menu').should.have.length(0);
    scryRenderedDOMComponentsWithClass(instance, 'test--dropdown-menu-item').should.have.length(0);
  });

  it('should invoke onChange when selected item is changed', function () {
    const onChangeStub = stub();
    instance = renderIntoDocument(
      <Dropdown
        defaultValue={ '1' }
        onChange={ onChangeStub }
        options={ ['1', '2', '3'] }
      />
    );
    const dropdown = findRenderedComponentWithType(instance, Dropdown);
    dropdown.setState({
      open: true
    });

    const firstMenuItem = scryRenderedDOMComponentsWithClass(instance, 'test--dropdown-menu-item')[0];
    Simulate.click(firstMenuItem);

    dropdown.state.selected.should.eql('2');
    onChangeStub.should.be.calledWith('2');
  });

  it('should close menu when losing focus', function () {
    const onChangeStub = stub();
    instance = renderIntoDocument(
      <Dropdown
        defaultValue={ '1' }
        onChange={ onChangeStub }
        options={ ['1', '2', '3'] }
      />
    );
    instance.setState({
      open: true
    });

    const dropdownDOM = findDOMNode(instance);
    Simulate.blur(dropdownDOM);

    scryRenderedDOMComponentsWithClass(instance, 'test--dropdown-menu').should.have.length(0);
    scryRenderedDOMComponentsWithClass(instance, 'test--dropdown-menu-item').should.have.length(0);

    onChangeStub.should.not.be.called();
  });
});
