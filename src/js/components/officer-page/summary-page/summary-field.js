import React, { Component, PropTypes } from 'react';

import { wrapperStyle, labelStyle, valueStyle } from './summary-field.style';


export default class SummaryField extends Component {
  render() {
    const { label, value } = this.props;

    return (
      <div style={ wrapperStyle }>
        <span className='test--field-label' style={ labelStyle }>{ label }</span>
        <span className='test--field-value' style={ valueStyle }>{ value }</span>
      </div>
    );
  }
}

SummaryField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string
};
