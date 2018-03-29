import React, { Component, PropTypes } from 'react';

import {
  baseStyle,
  baseRankStyle,
  baseUnitStyle,
} from './base-item.style';


export default class BaseItem extends Component {
  constructor(props) {
    super(props);
    this.renderRankAndUnit = this.renderRankAndUnit.bind(this);
    this.renderShowing = this.renderShowing.bind(this);

    this.height = 58;
    this.className = '.test--timeline-item';
  }

  renderRankAndUnit() {
    const { isFirstRank, isLastRank, isFirstUnit, isLastUnit, rankDisplay, unitDisplay } = this.props.item;
    return (
      <span>
        <span
          style={ baseRankStyle(this.height, isFirstRank, isLastRank) }
          className='test--base-item-rank'
        >
          { rankDisplay }
        </span>
        <span
          style={ baseUnitStyle(this.height, isFirstUnit, isLastUnit) }
          className='test--base-item-unit'
        >
          { unitDisplay }
        </span>
      </span>
    );
  }

  renderShowing() {
    return null;
  }

  render() {
    return (
      <div style={ baseStyle(this.height) } className={ this.className }>
        { this.renderRankAndUnit() }
        { this.renderShowing() }
      </div>
    );
  }
}

BaseItem.propTypes = {
  item: PropTypes.shape({
    isFirstRank: PropTypes.bool,
    isLastRank: PropTypes.bool,
    isFirstUnit: PropTypes.bool,
    isLastUnit: PropTypes.bool,
    rankDisplay: PropTypes.string,
    unitDisplay: PropTypes.string,
  }),
};
