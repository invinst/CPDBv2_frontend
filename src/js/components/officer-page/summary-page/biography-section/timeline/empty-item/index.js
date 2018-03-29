import React, { PropTypes } from 'react';

import {
  showingStyle,
  wrapperShowingStyle,
} from './empty-item.style';
import BaseItem from '../base-item';


export default class EmptyItem extends BaseItem {
  constructor(props) {
    super(props);

    this.height = 32;
    this.className = 'test--timeline-empty-item';
  }

  renderShowing() {
    const { hasBorderBottom } = this.props;

    return (
      <span style={ wrapperShowingStyle } className='test--empty-item-showing'>
        <div style={ showingStyle(hasBorderBottom) }/>
      </span>
    );
  }
}

EmptyItem.propTypes = {
  hasBorderBottom: PropTypes.bool,
};
