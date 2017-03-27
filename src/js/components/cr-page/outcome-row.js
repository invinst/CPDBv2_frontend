import React, { Component, PropTypes } from 'react';

import { wrapperStyle, labelStyle, contentStyle } from './outcome-row.style';


export default class OutcomeRow extends Component {
  render() {
    const { label, content } = this.props;
    return (
      <div style={ wrapperStyle }>
        <span style={ labelStyle }>{ label }</span>
        <span style={ contentStyle }>{ content }</span>
      </div>
    );
  }
}

OutcomeRow.propTypes = {
  label: PropTypes.string,
  content: PropTypes.string
};
