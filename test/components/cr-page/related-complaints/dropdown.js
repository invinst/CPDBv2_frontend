import React from 'react';
import {
  renderIntoDocument,
  Simulate,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import Dropdown from 'components/cr-page/related-complaints/dropdown';


describe('Dropdown component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    Dropdown.should.be.renderable();
  });

  it('should toggle expand state when clicked', function () {
    instance = renderIntoDocument(<Dropdown />);

    const displayValue = findRenderedDOMComponentWithClass(
      instance,
      'test--related-complaint-dropdown'
    );

    Simulate.click(displayValue);
    instance.state.expanded.should.be.true();
    Simulate.click(displayValue);
    instance.state.expanded.should.be.false();
  });

  it('should collapse the option and call onChange when select option item', function () {
    const onChangeSpy = spy();
    const options = {
      a: 1,
      b: 2,
      c: 3
    };

    instance = renderIntoDocument(
      <Dropdown options={ options } value='c' onChange={ onChangeSpy } />
    );

    const displayValue = findRenderedDOMComponentWithClass(
      instance,
      'test--related-complaint-dropdown'
    );
    Simulate.click(displayValue);
    instance.state.expanded.should.be.true();

    const optionItems = scryRenderedDOMComponentsWithClass(
      instance,
      'test--related-complaint-dropdown-item'
    );

    optionItems.should.have.length(2);
    optionItems.map(item => item.textContent).should.eql(['1', '2']);
    Simulate.click(optionItems[0]);
    onChangeSpy.calledWith('a').should.be.true();
    instance.state.expanded.should.be.false();
  });
});
