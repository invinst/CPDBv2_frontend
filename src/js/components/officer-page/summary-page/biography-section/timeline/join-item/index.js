import React, { Component, PropTypes } from 'react';

import {
  rankStyle,
  showingStyle,
  style,
  unitStyle,
  dateStyle,
  wrapperShowingStyle,
  joinStyle,
} from './join-item.style';


export default class JointItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <div style={ style }>
        <span style={ rankStyle }>{ item.rank }</span>
        <span style={ unitStyle }>{ item.unitDescription }</span>
        <span style={ wrapperShowingStyle }>
          <span style={ showingStyle }>
            <span style={ joinStyle }>
              Joined Chicago Police Department with Unit {item.unitName} as a {item.rank}
            </span>
            <span style={ dateStyle }>{ item.date }</span>
          </span>
        </span>
      </div>
    );
  }
}

JointItem.propTypes = {
  item: PropTypes.object,
  oldUnitName: PropTypes.string,
};
