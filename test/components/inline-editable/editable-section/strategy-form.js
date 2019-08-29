import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithTag, Simulate } from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import StrategyForm from 'components/inline-editable/editable-section/strategy-form';

describe('StrategyForm component', function () {
  let instance;
  const strategyFormValue = {
    poolSize: 10,
    selectedStrategyId: 1,
    strategies: [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
    ],
  };

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render select and input when in edit mode', function () {
    instance = renderIntoDocument(
      <StrategyForm
        editModeOn={ true }
        value={ strategyFormValue }
      />
    );
    const input = findRenderedDOMComponentWithTag(instance, 'input');
    input.value.should.eql('10');
    const select = findRenderedDOMComponentWithTag(instance, 'select');
    select.value.should.eql('1');
    const options = select.children;
    options[0].value.should.eql('1');
    options[0].innerText.should.eql('a');
    options[0].tagName.should.eql('OPTION');
    options[1].value.should.eql('2');
    options[1].innerText.should.eql('b');
    options[1].tagName.should.eql('OPTION');
  });

  it('should not render anything when not in edit mode', function () {
    instance = renderIntoDocument(<StrategyForm editModeOn={ false }/>);
    instance.should.displayNothing();
  });

  it('should trigger onChange with new poolSize', function () {
    const onChange = spy();
    instance = renderIntoDocument(
      <StrategyForm
        onChange={ onChange }
        editModeOn={ true }
        value={ strategyFormValue }
      />
    );
    const input = findRenderedDOMComponentWithTag(instance, 'input');
    input.value = 15;
    Simulate.change(input);
    onChange.args[0][0].should.eql({ ...strategyFormValue, poolSize: 15 });
  });

  it('should trigger onChange with new selected strategy', function () {
    const onChange = spy();
    instance = renderIntoDocument(
      <StrategyForm
        onChange={ onChange }
        editModeOn={ true }
        value={ strategyFormValue }
      />
    );
    const select = findRenderedDOMComponentWithTag(instance, 'select');
    select.value = 2;
    Simulate.change(select);
    onChange.args[0][0].should.eql({ ...strategyFormValue, selectedStrategyId: 2 });
  });
});
