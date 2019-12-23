import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import baseStyles from 'components/officer-page/tabbed-pane-section/timeline/item/showings/base-item.sass';
import styles from './rank-change.sass';


export default function RankChange(props) {
  const { rank, oldRank, date } = props.item;

  return (
    <span className={ cx(styles.rankChange, baseStyles.baseItem) }>
      <span className='item-content rank-change-item-content'>
        <span className='rank-change-info'>
          <span className={ cx('old-rank', { 'unassigned': oldRank === 'Unknown' }) }>{ oldRank } → </span>
          <span className='new-rank'>{ rank }</span>
        </span>
        <span className='item-date rank-change-item-date'>{ date }</span>
      </span>
    </span>
  );
}

RankChange.propTypes = {
  item: PropTypes.object,
};
