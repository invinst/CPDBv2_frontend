import React, { Component, PropTypes } from 'react';
import currencyFormatter from 'currency-formatter';

import { salaryStyle, salaryAmountStyle, popupStyle } from './salary.style';
import Popup from 'components/common/popup';


export default class Salary extends Component {
  render() {
    const { salary } = this.props;

    return (
      <div className='test--salary'>
        <span className='test--salary-amount' style={ salaryAmountStyle }>
          { typeof salary === 'string' ? salary : currencyFormatter.format(salary, { code: 'USD', precision: 0 }) }
        </span>
        <span style={ salaryStyle }> base salary</span>
        <Popup
          title='Salary Figures'
          text='Salary information is based on data provided by the Chicago Department of Human Resources. Salary
          data reflects base pay, but not overtime pay, which can make up a substantial amount of an officer’s pay.'
          style={ popupStyle }
        />
      </div>
    );
  }
}

Salary.propTypes = {
  salary: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
