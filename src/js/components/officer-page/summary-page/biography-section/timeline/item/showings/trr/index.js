import React, { Component, PropTypes } from 'react';

import { categoryStyle, dateStyle, kindStyle, showingStyle, wrapperShowingStyle, } from './trr.style';


export default class Trr extends Component {
  render() {
    const { item, hasBorderBottom, baseStyles } = this.props;
    const {
      baseWrapperShowingStyle,
      baseShowingStyle,
      baseWrapperKindStyle,
      baseKindStyle,
      baseCategoryStyle,
      baseDateStyle,
    } = baseStyles;

    return (
      <span style={ { ...baseWrapperShowingStyle, ...wrapperShowingStyle } }>
        <span style={ { ...baseShowingStyle(hasBorderBottom), ...showingStyle } }>
          <div style={ baseWrapperKindStyle }>
            <span style={ { ...baseKindStyle, ...kindStyle } } className='test--trr-item-kind'>Force</span>
          </div>
          <span
            style={ { ...baseCategoryStyle, ...categoryStyle } }
            className='test--trr-item-category'
          >
            { item.category }
          </span>
          <span style={ { ...baseDateStyle, ...dateStyle } } className='test--trr-item-date'>{ item.date }</span>
        </span>
      </span>
    );
  }
}

Trr.propTypes = {
  item: PropTypes.object,
  hasBorderBottom: PropTypes.bool,
  baseStyles: PropTypes.object,
};
