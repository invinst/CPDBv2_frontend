import React, { PropTypes, Component } from 'react';

import styles from './summary-row.sass';
import cx from 'classnames';


export default class SummaryRow extends Component {
  render() {
    const { label, className, children } = this.props;

    return (
      <div className={ cx(styles.summaryRow, className) }>
        <div className='summary-label'>{ label }</div>
        <div className='summary-content'>{ children }</div>
      </div>
    );
  }
}

SummaryRow.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node
};
