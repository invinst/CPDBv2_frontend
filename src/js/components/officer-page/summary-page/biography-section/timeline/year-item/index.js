import React, { Component, PropTypes } from 'react';

import {
  rankStyle,
  showingStyle,
  style,
  unitStyle,
  dateStyle,
  clearFloatStyle,
  wrapperShowingStyle,
} from './year-item.style';


export default class YearItem extends Component {
  render() {
    const { item } = this.props;
    const hasData = item.hasData;
    return (
      <div style={ style }>
        <span style={ rankStyle(hasData) }>{ item.rank }</span>
        <span style={ unitStyle(hasData) }>{ item.unitDescription }</span>
        <span style={ wrapperShowingStyle }>
          <div style={ showingStyle(hasData) }>
            <span style={ dateStyle(hasData) }>{ item.date }</span>
            <br style={ clearFloatStyle }/>
          </div>
        </span>
      </div>
    );
  }
}

YearItem.propTypes = {
  item: PropTypes.object
};
