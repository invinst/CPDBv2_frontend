import React, { Component, PropTypes } from 'react';

import { wrapperStyle, labelStyle, valueStyle, descriptionStyle } from './summary-field.style';


export default class SummaryField extends Component {
  render() {
    const { label, value, style, description } = this.props;

    return (
      <div style={ { ...wrapperStyle, ...style } }>
        <span className='test--field-label' style={ labelStyle }>{ label }</span>
        <span className='test--field-value' style={ valueStyle }>{ value }</span>
        <span className='test--field-description' style={ descriptionStyle }>{ description }</span>
      </div>
    );
  }
}

SummaryField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  description: PropTypes.string,
  style: PropTypes.object
};
