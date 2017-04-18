import React, { PropTypes, Component } from 'react';

import {
  yearStyle, labelStyle, valueStyle, rowStyle, rowWithBorderStyle
} from './year-item.style';

export default class YearItem extends Component {
  render() {
    const { item } = this.props;
    const { year, crs } = item;
    return (
      <div>
        <span style={ yearStyle }>{ year }</span>
        <div style={ rowWithBorderStyle }>
          <span style={ labelStyle }>CRs</span>
          <span style={ valueStyle }>{ crs }</span>
        </div>
        <div style={ rowWithBorderStyle }>
          <span style={ labelStyle }>TRRs</span>
          <span style={ valueStyle }>0</span>
        </div>
        <div style={ rowStyle }>
          <span style={ labelStyle }>Salary</span>
          <span style={ valueStyle }>Data not available</span>
        </div>
      </div>
    );
  }
}

YearItem.propTypes = {
  item: PropTypes.object
};
