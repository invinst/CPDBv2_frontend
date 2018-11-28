import React, { Component, PropTypes } from 'react';
import currencyFormatter from 'currency-formatter';
import cx from 'classnames';

import Popup from 'components/common/popup';
import styles from './salary.sass';


export default class Salary extends Component {
  render() {
    const { salary, popup, pathName } = this.props;

    return (
      <div className={ cx(styles.salary, 'test--salary') }>
        <span className='salary-amount'>
          { typeof salary === 'string' ? salary : currencyFormatter.format(salary, { code: 'USD', precision: 0 }) }
        </span>
        <span className='base-salary'> base salary</span>
        <Popup
          { ...popup }
          url={ pathName }
          className='salary-popup'
        />
      </div>
    );
  }
}

Salary.propTypes = {
  salary: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  popup: PropTypes.object,
  pathName: PropTypes.string,
};
