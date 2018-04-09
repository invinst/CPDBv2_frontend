import React, { Component, PropTypes } from 'react';

import { categoryStyle, dateStyle, kindStyle, showingStyle, wrapperShowingStyle, } from './award.style';


export default class Award extends Component {

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
            <span style={ { ...baseKindStyle, ...kindStyle } } className='test--award-item-kind'>Award</span>
          </div>
          <span
            style={ { ...baseCategoryStyle, ...categoryStyle } }
            className='test--award-item-category'
          >
            { item.category }
          </span>
          <span style={ { ...baseDateStyle, ...dateStyle } } className='test--award-item-date'>{ item.date }</span>
        </span>
      </span>
    );
  }
}

Award.propTypes = {
  item: PropTypes.object,
  hasBorderBottom: PropTypes.bool,
  baseStyles: PropTypes.object,
};
