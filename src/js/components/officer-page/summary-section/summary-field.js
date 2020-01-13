import PropTypes from 'prop-types';
import React from 'react';

import styles from './summary-field.sass';


export default function SummaryField(props) {
  const { label, value, style, children } = props;

  return (
    <div className={ styles.summaryField } style={ { ...style } }>
      <span className='summary-field-label'>{ label }</span>
      <div className='summary-field-info'>
        <span className='summary-field-value'>{ value }</span>
        <span className='summary-field-extra-info'>{ children }</span>
      </div>
    </div>
  );
}

SummaryField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.element]),
  style: PropTypes.object,
  children: PropTypes.node,
};
