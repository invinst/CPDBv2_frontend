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
        <span className='test--timeline-item-year' style={ yearStyle }>{ year }</span>
        <div style={ rowWithBorderStyle }>
          <span className='test--crs-label' style={ labelStyle }>CRs</span>
          <span className='test--crs-value' style={ valueStyle }>{ crs }</span>
        </div>
        <div style={ rowWithBorderStyle }>
          <span className='test--trrs-label' style={ labelStyle }>TRRs</span>
          <span className='test--trrs-value' style={ valueStyle }>0</span>
        </div>
        <div style={ rowStyle }>
          <span className='test--salary-label' style={ labelStyle }>Salary</span>
          <span className='test--salary-value' style={ valueStyle }>Data not available</span>
        </div>
      </div>
    );
  }
}

YearItem.propTypes = {
  item: PropTypes.object
};
