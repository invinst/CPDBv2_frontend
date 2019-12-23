import React, { PropTypes } from 'react';
import cx from 'classnames';

import baseStyles from 'components/officer-page/tabbed-pane-section/timeline/item/showings/base-item.sass';
import styles from './award.sass';


export default function Award(props) {
  const { item } = props;

  return (
    <span className={ baseStyles.baseItem }>
      <span className={ cx('item-content', styles.award) }>
        <div className='item-wrapper-kind'>
          <span className='item-kind award-item-kind'>Award</span>
        </div>
        <span className='item-category award-item-category'>
          { item.category }
        </span>
        <span className='item-date award-item-date'>{ item.date }</span>
      </span>
    </span>
  );
}

Award.propTypes = {
  item: PropTypes.object,
};
