import React, { Component, PropTypes } from 'react';

import { wrapperStyle, titleStyle, valueStyle } from './row.style';


export default class Row extends Component {
  render() {
    const { title, value, hideBorder } = this.props;

    return (
      <div style={ wrapperStyle(hideBorder) }>
        <div className='test--trr-location-row-title' style={ titleStyle }>
          { title }
        </div>
        <div className='test--trr-location-row-value' style={ valueStyle }>
          { value }
        </div>
      </div>
    );
  }
}

Row.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  hideBorder: PropTypes.bool,
};

Row.defaultProps = {
  hideBorder: false,
};
