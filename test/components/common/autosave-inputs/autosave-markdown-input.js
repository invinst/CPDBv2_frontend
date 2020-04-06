import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import ReactMarkdown from 'react-markdown';

import AutosaveMarkdownTextareaInput from 'components/common/autosave-inputs/autosave-markdown-textarea-input';
import AutosaveTextareaInput from 'components/common/autosave-inputs/autosave-textarea-input';


describe('AutosaveMarkdownTextareaInput component', function () {
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
    wrapper.find('.autosave-markdown-textarea-input').simulate('click');
    wrapper.find(ReactMarkdown).exists().should.be.false();

    const textAreaInput = wrapper.find(AutosaveTextareaInput);
    textAreaInput.exists().should.be.true();
    textAreaInput.prop('onBlur').should.be.eql(wrapper.instance().onTextAreaBlur);
  });

  it('should call onTextAreaBlur on textarea blur', function () {
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

  context('value is empty', function () {
    it('should render class has-placeholder', function () {
      const wrapper = mount(<AutosaveMarkdownTextareaInput
        textareaLineHeight={ 16 }
        fieldType='description'
        placeholderClassName={ 'description-placeholder-classname' }
        value={ '' }
      />);
      wrapper.childAt(0).prop('className').should.containEql('description-placeholder-classname');
    });
  });

  context('value is not empty', function () {
    let wrapper;
    beforeEach(function () {
      wrapper = mount(<AutosaveMarkdownTextareaInput
        textareaLineHeight={ 16 }
        placeholderClassName={ 'description-placeholder-classname' }
        fieldType='description'
        value={ 'value' }
      />);
    });

    it('should not render class placeholder', function () {
      wrapper.childAt(0).prop('className').should.not.containEql('description-placeholder-classname');
    });

    it('should call setState once when user input', function () {
      const instance = wrapper.instance();
      const setStateSpy = spy(instance, 'setState');
      wrapper.find('.autosave-markdown-textarea-input').simulate('click');
      setStateSpy.resetHistory();
      wrapper.find('textarea').simulate('change', { target: { value: '' } });
      setStateSpy.should.be.calledOnce();
      setStateSpy.resetHistory();

      wrapper.find('textarea').simulate('change', { target: { value: '1' } });
      wrapper.find('textarea').simulate('change', { target: { value: '12' } });
      wrapper.find('textarea').simulate('change', { target: { value: '123' } });
      setStateSpy.should.be.calledOnce();
    });

    it('should render class placeholder after user clear value', function () {
      wrapper.find('.autosave-markdown-textarea-input').simulate('click');
      wrapper.find('textarea').simulate('change', { target: { value: '' } });
      wrapper.childAt(0).prop('className').should.containEql('description-placeholder-classname');
    });
  });
});
