import React from 'react';
import {
  renderIntoDocument, findRenderedComponentWithType, Simulate, findRenderedDOMComponentWithTag
} from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import LinkPicker from 'components/inline-editable/link-picker';
import HoverableButton from 'components/common/hoverable-button';

describe('LinkPicker component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render nothing when not in edit mode', function () {
    instance = renderIntoDocument(<LinkPicker editModeOn={ false }/>);
    instance.should.displayNothing();
  });

  it('should render button when in edit mode', function () {
    instance = renderIntoDocument(<LinkPicker editModeOn={ true }/>);
    findRenderedComponentWithType(instance, HoverableButton);
  });

  it('should show link input when click on button', function () {
    instance = renderIntoDocument(<LinkPicker editModeOn={ true }/>);
    Simulate.click(findRenderedDOMComponentWithTag(instance, 'a'));
    findRenderedDOMComponentWithTag(instance, 'input');
  });

  it('should trigger onChange when link is inputted', function () {
    const callback = spy();
    instance = renderIntoDocument(<LinkPicker editModeOn={ true } onChange={ callback }/>);
    instance.setState({ open: true });
    const input = findRenderedDOMComponentWithTag(instance, 'input');
    input.value = 'http://abc.com';
    Simulate.change(input);
    callback.calledWith('http://abc.com').should.be.true();
  });

  it('should set value on link input', function () {
    instance = renderIntoDocument(<LinkPicker editModeOn={ true } value={ '123' }/>);
    instance.setState({ open: true });
    const input = findRenderedDOMComponentWithTag(instance, 'input');
    input.value.should.eql('123');
  });
});
