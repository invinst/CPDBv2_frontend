import React, { PropTypes, Component } from 'react';

import { buttonStyle, dateStyle } from './date-picker-button.style';


export default class DatePickerButton extends Component {
  render() {
    const { value, onClick } = this.props;

    return (
      <div>
        <span style={ dateStyle }>
          { value }
        </span>
        <div style={ buttonStyle } onClick={ onClick }>
          +
        </div>
      </div>
    );
  }
}

DatePickerButton.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string
};
