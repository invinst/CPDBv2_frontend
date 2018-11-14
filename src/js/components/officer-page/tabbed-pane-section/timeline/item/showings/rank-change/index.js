import React, { PropTypes, Component } from 'react';

import {
  dateStyle,
  newRankStyle,
  oldRankStyle,
  showingStyle,
  rankChangeStyle,
  wrapperShowingStyle,
} from './rank-change.style';


export default class RankChange extends Component {
  render() {
    const { hasBorderBottom } = this.props;
    const { rank, oldRank, date } = this.props.item;
    const { baseWrapperShowingStyle, baseShowingStyle, baseDateStyle } = this.props.baseStyles;

    return (
      <span style={ { ...baseWrapperShowingStyle, ...wrapperShowingStyle } }>
        <span style={ { ...baseShowingStyle(hasBorderBottom), ...showingStyle } }>
          <span style={ rankChangeStyle } className='test--rank-change-item-content'>
            <span style={ oldRankStyle(oldRank === 'Unknown') }>{ oldRank } → </span>
            <span style={ newRankStyle }>{ rank }</span>
          </span>
          <span style={ { ...baseDateStyle, ...dateStyle } } className='test--rank-change-item-date'>{ date }</span>
        </span>
      </span>
    );
  }
}

RankChange.propTypes = {
  item: PropTypes.object,
  hasBorderBottom: PropTypes.bool,
  baseStyles: PropTypes.object,
};
