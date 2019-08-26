import React from 'react';
import {
  renderIntoDocument, findRenderedDOMComponentWithTag, findRenderedComponentWithType,
} from 'react-addons-test-utils';
import DatePickerComponent from 'react-datepicker';
import { spy } from 'sinon';
import moment from 'moment';

import { unmountComponentSuppressError } from 'utils/test';
import DatePicker from 'components/inline-editable/date-picker';


describe('DatePicker component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render a simple span when not in edit mode', function () {
    instance = renderIntoDocument(<DatePicker editModeOn={ false } value='2016-11-07'/>);
    const span = findRenderedDOMComponentWithTag(instance, 'span');
    span.innerText.should.equal('Nov 7, 2016');
  });

  it('should render DatePickerComponent when in edit mode', function () {
    instance = renderIntoDocument(<DatePicker editModeOn={ true } value='2016-11-08'/>);
    const component = findRenderedComponentWithType(instance, DatePickerComponent);
    component.props.selected.format('YYYY-MM-DD').should.equal('2016-11-08');
  });

  it('should trigger onChange', function () {
    const onChange = spy();
    instance = renderIntoDocument(<DatePicker editModeOn={ true } onChange={ onChange }/>);
    const component = findRenderedComponentWithType(instance, DatePickerComponent);
    component.props.onChange(moment('2015-12-02'));
    onChange.calledWith('2015-12-02').should.be.true();
  });
});
