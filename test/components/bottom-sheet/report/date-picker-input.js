import React from 'react';
import moment from 'moment';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';
import { spy } from 'sinon';
import DatePickerComponent from 'react-datepicker';

import { unmountComponentSuppressError } from 'utils/test';
import DatePickerInput from 'components/bottom-sheet/report/date-picker-input';

describe('DatePickerInput component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should emit back date via onChange', function () {
    const onChange = spy();
    instance = renderIntoDocument(<DatePickerInput onChange={ onChange }/>);
    const datePicker = findRenderedComponentWithType(instance, DatePickerComponent);
    datePicker.props.onChange(moment('2016-11-07'));
    onChange.calledWith('2016-11-07').should.be.true();
  });
});
