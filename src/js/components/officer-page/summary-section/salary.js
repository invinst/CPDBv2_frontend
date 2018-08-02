import React, { Component, PropTypes } from 'react';
import currencyFormatter from 'currency-formatter';

import { salaryStyle, salaryAmountStyle, popupStyle } from './salary.style';
import Popup from 'components/common/popup';


export default class Salary extends Component {
  render() {
    const { salary, popup } = this.props;

    return (
      <div className='test--salary'>
        <span className='test--salary-amount' style={ salaryAmountStyle }>
          { typeof salary === 'string' ? salary : currencyFormatter.format(salary, { code: 'USD', precision: 0 }) }
        </span>
        <span style={ salaryStyle }> base salary</span>
        <Popup
          { ...popup }
          position='relative'
          style={ popupStyle }
        />
      </div>
    );
  }
}

Salary.propTypes = {
  salary: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  popup: PropTypes.object,
};
