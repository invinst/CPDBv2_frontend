import React, { PropTypes, Component } from 'react';

import { wrapperStyle, labelStyle, contentStyle } from './summary-row.style';


export default class SummaryRow extends Component {
  render() {
    const { label, children } = this.props;

    return (
      <div style={ wrapperStyle }>
        <div style={ labelStyle }>{ label }</div>
        <div style={ contentStyle }>{ children }</div>
      </div>
    );
  }
}

SummaryRow.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node
};
