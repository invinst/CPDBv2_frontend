import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import ReactMarkdown from 'react-markdown';

import AutosaveMarkdownTextareaInput from 'components/common/autosave-inputs/autosave-markdown-textarea-input';
import AutosaveTextareaInput from 'components/common/autosave-inputs/autosave-textarea-input';


describe('AutosaveMarkdownTextareaInput component', function () {
  describe('value is not empty', function () {
    let wrapper;
    beforeEach(function () {
      wrapper = mount(<AutosaveMarkdownTextareaInput
        textareaLineHeight={ 16 }
        fieldType='description'
        value={ 'value' }
      />);
    });

    it('should render ReactMarkdown by default', function () {
      wrapper.find(AutosaveTextareaInput).exists().should.be.false();
      wrapper.find(ReactMarkdown).exists().should.be.true();
    });

    it('should render AutosaveTextareaInput after user click on Markdown', function () {
      wrapper.childAt(0).simulate('click');
      wrapper.find(ReactMarkdown).exists().should.be.false();

      const textAreaInput = wrapper.find(AutosaveTextareaInput);
      textAreaInput.exists().should.be.true();
      textAreaInput.prop('onBlur').should.be.eql(wrapper.instance().onTextAreaBlur);
    });
  });

  describe('value is empty', function () {
    it('should always AutosaveTextareaInput by default', function () {
      const wrapper = mount(<AutosaveMarkdownTextareaInput
        textareaLineHeight={ 16 }
        fieldType='description'
        value={ '' }
      />);
      wrapper.find(AutosaveTextareaInput).exists().should.be.true();
      wrapper.find(ReactMarkdown).exists().should.be.false();
    });
  });

  it('should call onTextAreaBlur on textarea blur', function () {
    const wrapper = mount(
      <AutosaveMarkdownTextareaInput
        textareaLineHeight={ 16 }
        fieldType='description'
        value={ '123' }
      />
    );
    const onTextAreaBlurSpy = spy(wrapper.instance(), 'onTextAreaBlur');

    wrapper.find(ReactMarkdown).childAt(0).simulate('click');
    wrapper.find(ReactMarkdown).exists().should.be.false();

    const autosaveTextareaInput = wrapper.find(AutosaveTextareaInput);

    autosaveTextareaInput.exists().should.be.true();
    autosaveTextareaInput.find('textarea').simulate('blur');
    onTextAreaBlurSpy.should.be.calledOnce();

    wrapper.find(ReactMarkdown).exists().should.be.true();
    wrapper.find(AutosaveTextareaInput).exists().should.be.false();
  });
});
