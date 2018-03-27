import React, { PropTypes } from 'react';

import {
  showingStyle,
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
    const { hasBorderBottom, item } = this.props;
    const { date, hasData } = item;

    return (
      <span style={ wrapperShowingStyle }>
        <div style={ showingStyle(hasData, hasBorderBottom) } className='test--year-item-showing'>
          <span style={ dateStyle(hasData) } className='test--year-item-date'>{ date }</span>
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
  }),
  hasBorderBottom: PropTypes.bool,
};
