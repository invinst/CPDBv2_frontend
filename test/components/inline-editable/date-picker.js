import React from 'react';
import { shallow, mount } from 'enzyme';
import DatePickerComponent from 'react-datepicker';
import { spy } from 'sinon';
import moment from 'moment';

import DatePicker from 'components/inline-editable/date-picker';


describe('DatePicker component', function () {
  it('should render a simple span when not in edit mode', function () {
    const wrapper = mount(
      <DatePicker editModeOn={ false } value='2016-11-07'/>
    );
    const span = wrapper.find('span');
    span.text().should.equal('Nov 7, 2016');
  });

  it('should render DatePickerComponent when in edit mode', function () {
    const wrapper = shallow(
      <DatePicker editModeOn={ true } value='2016-11-08'/>
    );
    const component = wrapper.find(DatePickerComponent);
    component.prop('selected').format('YYYY-MM-DD').should.equal('2016-11-08');
  });

  it('should trigger onChange', function () {
    const onChange = spy();
    const wrapper = shallow(
      <DatePicker editModeOn={ true } onChange={ onChange }/>
    );
    const component = wrapper.find(DatePickerComponent);
    component.prop('onChange')(moment('2015-12-02'));
    onChange.should.be.calledWith('2015-12-02');
  });
});
