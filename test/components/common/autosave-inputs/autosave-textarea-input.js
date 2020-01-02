import React from 'react';
import { shallow, mount } from 'enzyme';
import { stub, spy } from 'sinon';

import AutosaveTextareaInput from 'components/common/autosave-inputs/autosave-textarea-input';


describe('AutosaveTextareaInput component', function () {
  it('should add resize event listener and adjustTextareaHeight when componentDidMount', function () {
    const addEventListenerStub = stub(window, 'addEventListener');
    const adjustTextareaHeightSpy = spy(AutosaveTextareaInput.prototype, 'adjustTextareaHeight');
    const wrapper = mount(
      <AutosaveTextareaInput
        textareaLineHeight={ 16 }
        fieldType='description'
      />
    );
    const instance = wrapper.instance();

    adjustTextareaHeightSpy.should.be.calledWith(instance.textarea);
    addEventListenerStub.should.be.calledWith('resize', instance.handleResize);
    addEventListenerStub.restore();
  });

  it('should trigger onBlur on blur', function () {
    const saveStub = stub();
    const wrapper = shallow(
      <AutosaveTextareaInput
        textareaLineHeight={ 16 }
        fieldType='description'
        save={ saveStub }
        value='value'
      />
    );
    const inputElement = wrapper.find('textarea');
    inputElement.simulate('change', { target: { value: 'New Description' } });
    inputElement.simulate('blur');

    saveStub.should.be.calledOnce();
    saveStub.should.be.calledWith({ attr: 'description', value: 'New Description' });
  });

  it('should trigger onChange on input change', function () {
    const wrapper = shallow(
      <AutosaveTextareaInput
        textareaLineHeight={ 16 }
        fieldType='description'
      />
    );
    const inputElement = wrapper.find('textarea');
    inputElement.simulate('change', { target: { value: 'value' } });
    wrapper.state('currentValue').should.equal('value');
  });

  it('should update number of rows when resize', function () {
    const wrapper = mount(
      <AutosaveTextareaInput
        textareaLineHeight={ 16 }
        fieldType='description'
      />
    );
    let instance = wrapper.instance();

    const textareaStub = stub(instance, 'textarea').value({ scrollHeight: 50 });
    instance.handleResize();
    instance.textarea.rows.should.equal(3);
    textareaStub.restore();
  });
});
