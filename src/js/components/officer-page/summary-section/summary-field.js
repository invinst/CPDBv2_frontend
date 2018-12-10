import React, { Component, PropTypes } from 'react';

import styles from './summary-field.sass';


export default class SummaryField extends Component {
  render() {
    const { label, value, style, children } = this.props;

    return (
      <div className={ styles.summaryField } style={ { ...style } }>
        <span className='summary-field-label'>{ label }</span>
        <span className='summary-field-value'>{ value }</span>
        <span className='summary-field-extra-info'> { children } </span>
      </div>
    );
  }
}

SummaryField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object,
  children: PropTypes.node,
};
