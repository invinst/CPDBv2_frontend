import React, { Component, PropTypes } from 'react';

import {
  categoryStyle,
  kindStyle,
  kindWrapperStyle,
  rankStyle,
  showingStyle,
  style,
  unitStyle,
  dateStyle,
  wrapperShowingStyle,
} from './award-item.style';


export default class AwardItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <div style={ style }>
        <span style={ rankStyle }>{ item.rank }</span>
        <span style={ unitStyle }>{ item.unitDescription }</span>
        <span style={ wrapperShowingStyle }>
          <span style={ showingStyle }>
            <div style={ kindWrapperStyle }>
              <span style={ kindStyle }>Award</span>
            </div>
            <span style={ categoryStyle }>{ item.category }</span>
            <span style={ dateStyle }>{ item.date }</span>
          </span>
        </span>
      </div>
    );
  }
}

AwardItem.propTypes = {
  item: PropTypes.object
};
