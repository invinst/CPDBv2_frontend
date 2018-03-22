import React, { PropTypes } from 'react';

import {
  rankStyle,
  showingStyle,
  style,
  unitStyle,
  dateStyle,
  clearFloatStyle,
  wrapperShowingStyle,
} from './year-item.style';
import BaseItem from '../base-item';


export default class YearItem extends BaseItem {
  constructor(props) {
    super(props);

    const { hasData } = this.props.item;
    this.height = hasData ? 64 : 32;
  }

  renderShowing() {
    const { date, hasData } = this.props.item;
    return (
      <span style={ wrapperShowingStyle }>
        <div style={ showingStyle(hasData) }>
          <span style={ dateStyle(hasData) }>{ date }</span>
          <br style={ clearFloatStyle }/>
        </div>
      </span>
    );
  }
}

YearItem.propTypes = {
  item: PropTypes.shape({
    rank: PropTypes.string,
    unitDescription: PropTypes.string,
    date: PropTypes.string,
    hasData: PropTypes.bool,
  })
};
