import React, { Component, PropTypes } from 'react';

import styles from './marker-tooltip.sass';


export default class MarkerTooltip extends Component {
  render() {
    const { date, category } = this.props;
    return (
      <div className={ styles.markerTooltip }>
        <div className='marker-tooltip-date'>
          { date }
        </div>
        <div className='marker-tooltip-category'>
          { category }
        </div>
      </div>
    );
  }
}

MarkerTooltip.propTypes = {
  date: PropTypes.string,
  category: PropTypes.string,
};
