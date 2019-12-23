import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import baseStyles from 'components/officer-page/tabbed-pane-section/timeline/item/showings/base-item.sass';
import styles from './year.sass';


export default function Year(props) {
  const { date, hasData } = props.item;

  return (
    <span className={ cx(baseStyles.baseItem, styles.year, { 'has-data': hasData }) }>
      <div className='item-content year-item-item-content'>
        <span className='item-date year-item-date'>{ date }</span>
        <br className='clearfix' />
      </div>
    </span>
  );
}

Year.propTypes = {
  item: PropTypes.shape({
    date: PropTypes.string,
    hasData: PropTypes.bool,
  }),
};
