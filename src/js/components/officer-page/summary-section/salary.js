import React, { Component, PropTypes } from 'react';
import currencyFormatter from 'currency-formatter';
import { get } from 'lodash';

import { salaryStyle, salaryAmountStyle, popupStyle } from './salary.style';
import Popup from 'components/common/popup';
import { POPUP_NAMES } from 'utils/constants';


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
          { ...get(popup, POPUP_NAMES.OFFICER.SALARY) }
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
