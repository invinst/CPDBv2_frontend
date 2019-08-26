import React from 'react';
import {
  renderIntoDocument, findRenderedDOMComponentWithTag, Simulate,
} from 'react-addons-test-utils';
import { stub, spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import AutosaveTextareaInput from 'components/common/autosave-inputs/autosave-textarea-input';


describe('AutosaveTextareaInput component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should add resize event listener and adjustTextareaHeight when componentDidMount', function () {
    const addEventListenerStub = stub(window, 'addEventListener');
    const adjustTextareaHeightSpy = spy(AutosaveTextareaInput.prototype, 'adjustTextareaHeight');
    instance = renderIntoDocument(
      <AutosaveTextareaInput
        textareaLineHeight={ 16 }
        fieldType='description'
      />
    );
    adjustTextareaHeightSpy.should.be.calledWith(instance.textarea);
    addEventListenerStub.should.be.calledWith('resize', instance.handleResize);
    addEventListenerStub.restore();
  });

  it('should trigger onBlur on blur', function () {
    const saveStub = stub();
    instance = renderIntoDocument(
      <AutosaveTextareaInput
        textareaLineHeight={ 16 }
        fieldType='description'
        save={ saveStub }
        value='value'
      />
    );
    const inputElement = findRenderedDOMComponentWithTag(instance, 'textarea');
    inputElement.value = 'New Description';
    Simulate.change(inputElement);
    Simulate.blur(inputElement);
    saveStub.should.be.calledWith({ attr: 'description', value: 'New Description' });
  });

  it('should trigger onChange on input change', function () {
    instance = renderIntoDocument(
      <AutosaveTextareaInput
        textareaLineHeight={ 16 }
        fieldType='description'
      />
    );
    const inputElement = findRenderedDOMComponentWithTag(instance, 'textarea');
    inputElement.value = 'value';
    Simulate.change(inputElement);
    instance.state.currentValue.should.equal('value');
  });

  it('should update number of rows when resize', function () {
    instance = renderIntoDocument(
      <AutosaveTextareaInput
        textareaLineHeight={ 16 }
        fieldType='description'
      />
    );

    const textareaStub = stub(instance, 'textarea').value({ scrollHeight: 50 });
    instance.handleResize();
    instance.textarea.rows.should.equal(3);
    textareaStub.restore();
  });
});
