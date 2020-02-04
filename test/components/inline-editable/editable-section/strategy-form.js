import React from 'react';
import should from 'should';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import StrategyForm from 'components/inline-editable/editable-section/strategy-form';

describe('StrategyForm component', function () {
  const strategyFormValue = {
    poolSize: 10,
    selectedStrategyId: 1,
    strategies: [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
    ],
  };

  it('should render select and input when in edit mode', function () {
    const wrapper = shallow(
      <StrategyForm
        editModeOn={ true }
        value={ strategyFormValue }
      />
    );
    const input = wrapper.find('input');
    input.prop('value').should.equal(10);

    const select = wrapper.find('select');
    select.prop('value').should.equal(1);

    const options = select.children();
    options.at(0).prop('value').should.equal(1);
    options.at(0).text().should.equal('a');
    options.at(0).type().should.equal('option');
    options.at(1).prop('value').should.equal(2);
    options.at(1).text().should.equal('b');
    options.at(1).type().should.equal('option');
  });

  it('should not render anything when not in edit mode', function () {
    const wrapper = shallow(
      <StrategyForm editModeOn={ false }/>
    );
    should(wrapper.type()).be.null();
  });

  it('should trigger onChange with new poolSize', function () {
    const onChange = sinon.spy();
    const wrapper = shallow(
      <StrategyForm
        onChange={ onChange }
        editModeOn={ true }
        value={ strategyFormValue }
      />
    );
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: 15 } });
    onChange.args[0][0].should.eql({ ...strategyFormValue, poolSize: 15 });
  });

  it('should trigger onChange with new selected strategy', function () {
    const onChange = sinon.spy();
    const wrapper = shallow(
      <StrategyForm
        onChange={ onChange }
        editModeOn={ true }
        value={ strategyFormValue }
      />
    );
    const select = wrapper.find('select');
    select.simulate('change', { target: { value: 2 } });
    onChange.args[0][0].should.eql({ ...strategyFormValue, selectedStrategyId: 2 });
  });
});
