import React, { Component, PropTypes } from 'react';
import DatePickerComponent from 'react-datepicker';

import DatePickerButton from './date-picker-button';
import { wrapperStyle, dateStyle } from './date-picker.style';
import moment from 'moment';


class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.props.onChange(value.format('YYYY-MM-DD'));
  }

  render() {
    const { value, editModeOn } = this.props;

    if (!editModeOn) {
      return <span style={ dateStyle }>{ moment(value).format('ll') }</span>;
    }

    return (
      <div style={ wrapperStyle }>
        <DatePickerComponent
          dateFormat='ll'
          customInput={ <DatePickerButton/> }
          selected={ moment(value) }
          onChange={ this.handleChange }/>
      </div>
    );
  }
}

DatePicker.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  editModeOn: PropTypes.bool
};

export default DatePicker;
