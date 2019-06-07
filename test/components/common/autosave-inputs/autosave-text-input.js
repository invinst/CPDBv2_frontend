import React from 'react';
import {
  renderIntoDocument, findRenderedDOMComponentWithTag, Simulate
} from 'react-addons-test-utils';
import { stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test/index';
import AutosaveTextInput from 'components/common/autosave-inputs/autosave-text-input';


describe('AutosaveTextInput component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should trigger onBlur on blur', function () {
    const saveStub = stub();
    instance = renderIntoDocument(
      <AutosaveTextInput
        save={ saveStub }
        fieldType='title'
        value='value'
      />
    );
    const inputElement = findRenderedDOMComponentWithTag(instance, 'input');
    inputElement.value = 'New Title';
    Simulate.change(inputElement);
    Simulate.blur(inputElement);
    saveStub.should.be.calledWith({ attr: 'title', value: 'New Title' });
  });

  it('should trigger onChange on input change', function () {
    instance = renderIntoDocument(
      <AutosaveTextInput />
    );
    const inputElement = findRenderedDOMComponentWithTag(instance, 'input');
    inputElement.value = 'value';
    Simulate.change(inputElement);
    instance.state.currentValue.should.equal('value');
  });
});
