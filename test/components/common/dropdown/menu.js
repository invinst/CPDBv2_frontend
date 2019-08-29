import React from 'react';
import { stub } from 'sinon';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate,
} from 'react-addons-test-utils';

import Menu from 'components/common/dropdown/menu';
import { unmountComponentSuppressError } from 'utils/test';


describe('Dropdown component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should invoke onSelect when clicking on an item', function () {
    const onSelectStub = stub();
    instance = renderIntoDocument(
      <Menu
        onSelect={ onSelectStub }
        options={ ['1', '2', '3'] }
      />
    );

    const secondMenuItem = scryRenderedDOMComponentsWithClass(instance, 'dropdown-menu-item')[1];
    Simulate.click(secondMenuItem);

    onSelectStub.should.be.calledWith(1);
  });
});
