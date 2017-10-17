import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';

import { wrapperStyle, labelStyle, contentStyle, contentRowStyle, lastRowStyle } from './multi-row.style';


export default class MultiRow extends Component {
  render() {
    const { label, contents } = this.props;

    if (!contents || contents.length === 0) return null;

    return (
      <div style={ wrapperStyle }>
        <div className='test--row-label' style={ labelStyle }>{ label }</div>
        <div className='test--row-content' style={ contentStyle }>
          {
            map(contents, (content, index) => {
              const style = (index === contents.length - 1 ? lastRowStyle : contentRowStyle);
              return (
                <div className='test--row-content-item' key={ index } style={ style }>{ content }</div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

MultiRow.propTypes = {
  label: PropTypes.string,
  contents: PropTypes.array
};
