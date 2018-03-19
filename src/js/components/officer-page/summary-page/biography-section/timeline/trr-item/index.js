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
} from './trr-item.style';


export default class TRRItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <div style={ style }>
        <span style={ rankStyle }>{ item.rank }</span>
        <span style={ unitStyle }>{ item.unitDescription }</span>
        <span style={ wrapperShowingStyle }>
          <span style={ showingStyle }>
            <div style={ kindWrapperStyle }>
              <span style={ kindStyle }>Force</span>
            </div>
            <span style={ categoryStyle }>{ item.category }</span>
            <span style={ dateStyle }>{ item.date }</span>
          </span>
        </span>
      </div>
    );
  }
}

TRRItem.propTypes = {
  item: PropTypes.object
};
