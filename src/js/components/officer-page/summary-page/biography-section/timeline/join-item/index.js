import React, { PropTypes } from 'react';

import {
  showingStyle,
  dateStyle,
  wrapperShowingStyle,
  joinStyle,
} from './join-item.style';
import BaseItem from '../base-item';


export default class JointItem extends BaseItem {
  renderShowing() {
    const { item } = this.props;
    console.log(item)
    return (
      <span style={ wrapperShowingStyle }>
        <span style={ showingStyle }>
          <span style={ joinStyle }>
            Joined Chicago Police Department with Unit {item.unitName} as a {item.rank}
          </span>
          <span style={ dateStyle }>{ item.date }</span>
        </span>
      </span>
    );
  }
}

JointItem.propTypes = {
  item: PropTypes.object,
  oldUnitName: PropTypes.string,
};
