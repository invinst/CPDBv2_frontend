import React, { Component, PropTypes } from 'react';

import { salaryStyle, salaryAmountStyle } from './salary.style';


export default class Salary extends Component {
  render() {
    const { salary } = this.props;

    return (
      <div className='test--salary'>
        <span className='test--salary-amount' style={ salaryAmountStyle }>{ `$${salary}` }</span>
        <span style={ salaryStyle }> base salary</span>
      </div>
    );
  }
}

Salary.propTypes = {
  salary: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
