import React, { PropTypes } from 'react';

import {
  categoryStyle,
  kindStyle,
  kindWrapperStyle,
  showingStyle,
  dateStyle,
  wrapperShowingStyle,
} from './trr-item.style';
import BaseItem from '../base-item';


export default class TRRItem extends BaseItem {
  constructor(props) {
    super(props);

    this.height = 58;
    this.className = 'test--timeline-trr-item';
  }

  renderShowing() {
    const { item, hasBorderBottom } = this.props;
    return (
      <span style={ wrapperShowingStyle }>
        <span style={ showingStyle(hasBorderBottom) }>
          <div style={ kindWrapperStyle }>
            <span style={ kindStyle } className='test--trr-item-kind'>Force</span>
          </div>
          <span style={ categoryStyle } className='test--trr-item-category'>{ item.category }</span>
          <span style={ dateStyle } className='test--trr-item-date'>{ item.date }</span>
        </span>
      </span>
    );
  }
}

TRRItem.propTypes = {
  item: PropTypes.object,
  hasBorderBottom: PropTypes.bool,
};
