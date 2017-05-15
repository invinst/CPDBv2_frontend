import React, { Component, PropTypes } from 'react';

import { wrapperStyle, labelStyle, contentStyle } from './finding-row.style';


export default class FindingRow extends Component {
  render() {
    const { label, content } = this.props;
    return (
      <div style={ wrapperStyle }>
        <span className='test--row-label' style={ labelStyle }>{ label }</span>
        <span className='test--row-content' style={ contentStyle(content) }>{ content }</span>
      </div>
    );
  }
}

FindingRow.propTypes = {
  label: PropTypes.string,
  content: PropTypes.string
};
