import React from 'react';
import {
  renderIntoDocument, scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';


import DatePickerButton from 'components/inline-editable/date-picker-button';


describe('DatePickerButton component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    instance = renderIntoDocument(<DatePickerButton value='123'/>);
    let span = scryRenderedDOMComponentsWithTag(instance, 'span')[0];
    span.innerText.should.equal('123');
  });

  it('should trigger onClick', function () {
    DatePickerButton.should.triggerCallbackWhenClick('onClick', 'hoverable-button');
  });
});
