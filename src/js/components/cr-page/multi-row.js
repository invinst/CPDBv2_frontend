import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';

import { wrapperStyle, labelStyle, contentStyle, contentRowStyle } from './multi-row.style';


export default class MultiRow extends Component {
  render() {
    const { label, contents } = this.props;

    if (!contents || contents.length === 0) return null;

    return (
      <div style={ wrapperStyle }>
        <div style={ labelStyle }>{ label }</div>
        <div style={ contentStyle }>
        { map(contents, (content, index) => (
          <div key={ index } style={ contentRowStyle }>{ content }</div>
        )) }
        </div>
      </div>
    );
  }
}

MultiRow.propTypes = {
  label: PropTypes.string,
  contents: PropTypes.array
};
