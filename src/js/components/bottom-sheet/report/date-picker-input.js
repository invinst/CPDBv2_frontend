import React, { Component, PropTypes } from 'react';
import DatePickerComponent from 'react-datepicker';
import moment from 'moment';

import { inputStyle, inputEditStyle } from './date-picker-input.style';

export default class DatePickerInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.props.onChange(value.format('YYYY-MM-DD'));
  }

  render() {
    const { editModeOn, value } = this.props;
    const style = editModeOn ? inputEditStyle : inputStyle;

    return (
      <DatePickerComponent
        dateFormat='ll'
        customInput={ <input style={ style }/> }
        disabled={ !editModeOn }
        selected={ moment(value) }
        onChange={ this.handleChange }/>
    );
  }
}

DatePickerInput.propTypes = {
  editModeOn: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func
};
