import React, { Component, PropTypes } from 'react';

import styles from './marker-tooltip.sass';


export default class MarkerTooltip extends Component {
  render() {
    const { date, category, url } = this.props;
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
}

MarkerTooltip.propTypes = {
  date: PropTypes.string,
  category: PropTypes.string,
  url: PropTypes.string,
};
