import React, { PropTypes, Component } from 'react';

import { buttonStyle, iconStyle, dateStyle, hoveredButtonStyle } from './date-picker-button.style';
import HoverableButton from 'components/common/hoverable-button';


export default class DatePickerButton extends Component {
  render() {
    const { value, onClick } = this.props;

    return (
      <div>
        <span style={ dateStyle }>
          { value }
        </span>
        <HoverableButton
          onClick={ onClick }
          style={ {
            base: buttonStyle,
            hover: hoveredButtonStyle,
          } }>
          <span style={ iconStyle } />
        </HoverableButton>
      </div>
    );
  }
}

DatePickerButton.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
};
