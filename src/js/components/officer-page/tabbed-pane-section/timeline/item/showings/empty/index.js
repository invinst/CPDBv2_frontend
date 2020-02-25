import React from 'react';
import cx from 'classnames';

import baseStyles from 'components/officer-page/tabbed-pane-section/timeline/item/showings/base-item.sass';
import styles from './empty.sass';


export default function Empty(props) {
  return (
    <span className={ cx(baseStyles.baseItem, styles.empty) }>
      <div className='item-content empty-showing'/>
    </span>
  );
}
