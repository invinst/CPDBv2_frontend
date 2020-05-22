import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy, stub } from 'sinon';

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
  });

  it('should trigger onBlur on blur', function () {
    const saveStub = stub();
    const onBlurStub = stub();
    const wrapper = shallow(
      <AutosaveTextareaInput
        textareaLineHeight={ 16 }
        fieldType='description'
        onBlur={ onBlurStub }
        save={ saveStub }
        value='value'
      />,
      { disableLifecycleMethods: true },
    );
    const inputElement = wrapper.find('textarea');
    inputElement.simulate('change', { target: { value: 'New Description' } });
    inputElement.simulate('blur');

    saveStub.should.be.calledOnce();
    saveStub.should.be.calledWith({ attr: 'description', value: 'New Description' });
    onBlurStub.should.be.called();
  });

  it('should trigger onChange on input change', function () {
    const onChangeSpy = spy();
    const wrapper = shallow(
      <AutosaveTextareaInput
        textareaLineHeight={ 16 }
        onChange={ onChangeSpy }
        fieldType='description'
      />,
      { disableLifecycleMethods: true },
    );
    const inputElement = wrapper.find('textarea');
    inputElement.simulate('change', { target: { value: 'value' } });
    wrapper.state('currentValue').should.equal('value');
    onChangeSpy.should.be.calledOnce();
  });

  it('should update number of rows when resize', function () {
    const wrapper = mount(
      <AutosaveTextareaInput
        textareaLineHeight={ 16 }
        fieldType='description'
      />
    );
    let instance = wrapper.instance();

    stub(instance, 'textarea').value({ scrollHeight: 50 });
    instance.handleResize();
    instance.textarea.rows.should.equal(3);
  });

  describe('autoFocus is true', function () {
    it('should call textarea.focus() on componentDidMount', function () {
      const componentDidMountStub = stub(AutosaveTextareaInput.prototype, 'componentDidMount');
      const wrapper = mount(
        <AutosaveTextareaInput
          autoFocus={ true }
          textareaLineHeight={ 16 }
          value={ '' }
          fieldType='description'
        />
      );
      const textAreaFocusSpy = spy(wrapper.instance().textarea, 'focus');
      componentDidMountStub.restore();
      wrapper.instance().componentDidMount();
      textAreaFocusSpy.should.be.calledOnce();
    });
  });
});
