import React, { PropTypes } from 'react';

import {
  showingStyle,
  dateStyle,
  wrapperShowingStyle,
  joinStyle,
} from './joined-item.style';
import BaseItem from '../base-item';


export default class JoinedItem extends BaseItem {
  constructor(props) {
    super(props);

    this.className = 'test--timeline-joined-item';
  }

  renderShowing() {
    const { item, hasBorderBottom } = this.props;
    return (
      <span style={ wrapperShowingStyle }>
        <span style={ showingStyle(hasBorderBottom) }>
          <span style={ joinStyle } className='test--joined-item-join'>
            Joined Chicago Police Department { item.unitName ? `with Unit ${item.unitName} ` : '' }as a {item.rank}
          </span>
          <span style={ dateStyle } className='test--joined-item-date'>{ item.date }</span>
        </span>
      </span>
    );
  }
}

JoinedItem.propTypes = {
  item: PropTypes.object,
  oldUnitName: PropTypes.string,
  hasBorderBottom: PropTypes.bool,
};
