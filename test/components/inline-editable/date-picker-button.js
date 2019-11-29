import React from 'react';
import { shallow } from 'enzyme';

import DatePickerButton from 'components/inline-editable/date-picker-button';


describe('DatePickerButton component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(
      <DatePickerButton value='123'/>
    );
    let span = wrapper.find('span').at(0);
    span.text().should.equal('123');
  });

  it('should trigger onClick', function () {
    DatePickerButton.should.triggerCallbackWhenClick('onClick', 'hoverable-button');
  });
});
