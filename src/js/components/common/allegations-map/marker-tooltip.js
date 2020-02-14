import PropTypes from 'prop-types';
import React from 'react';

import styles from './marker-tooltip.sass';


export default function MarkerTooltip(props) {
  const { date, category, url } = props;
  return (
    <a href={ url } className={ styles.markerTooltip }>
      <div className='marker-tooltip-date'>
        { date }
      </div>
      <div className='marker-tooltip-category'>
        { category }
      </div>
    </a>
  );
}

MarkerTooltip.propTypes = {
  date: PropTypes.string,
  category: PropTypes.string,
  url: PropTypes.string,
};
