import React, { PropTypes } from 'react';

import {
  categoryStyle,
  kindStyle,
  kindWrapperStyle,
  showingStyle,
  dateStyle,
  wrapperShowingStyle,
} from './award-item.style';
import BaseItem from '../base-item';


export default class AwardItem extends BaseItem {
  constructor(props) {
    super(props);

    this.height = 58;
  }

  renderShowing() {
    const { item, hasBorderBottom } = this.props;
    return (
      <span style={ wrapperShowingStyle }>
        <span style={ showingStyle(hasBorderBottom) }>
          <div style={ kindWrapperStyle }>
            <span style={ kindStyle } className='test--award-item-kind'>Award</span>
          </div>
          <span style={ categoryStyle } className='test--award-item-category'>{ item.category }</span>
          <span style={ dateStyle } className='test--award-item-date'>{ item.date }</span>
        </span>
      </span>
    );
  }
}

AwardItem.propTypes = {
  item: PropTypes.object,
  hasBorderBottom: PropTypes.bool,
};
