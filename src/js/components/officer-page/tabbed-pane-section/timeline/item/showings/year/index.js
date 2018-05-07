import React, { Component, PropTypes } from 'react';

import { clearFloatStyle, dateStyle, showingStyle } from './year.style';


export default class Year extends Component {
  render() {
    const { hasBorderBottom, item, baseStyles } = this.props;
    const { date, hasData } = item;
    const { baseWrapperShowingStyle, baseShowingStyle, baseDateStyle, } = baseStyles;

    return (
      <span style={ baseWrapperShowingStyle } className='test--timeline-year-item'>
        <div
          style={ { ...baseShowingStyle(hasBorderBottom), ...showingStyle(hasData) } }
          className='test--year-item-showing'
        >
          <span style={ { ...baseDateStyle, ...dateStyle(hasData) } } className='test--year-item-date'>{ date }</span>
          <br style={ clearFloatStyle } />
        </div>
      </span>
    );
  }
}

Year.propTypes = {
  item: PropTypes.shape({
    date: PropTypes.string,
    hasData: PropTypes.bool,
  }),
  hasBorderBottom: PropTypes.bool,
  baseStyles: PropTypes.object,
};
