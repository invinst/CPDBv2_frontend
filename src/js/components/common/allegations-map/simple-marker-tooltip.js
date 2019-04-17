import React, { Component, PropTypes } from 'react';

import styles from './simple-marker-tooltip.sass';


export default class SimpleMarkerTooltip extends Component {
  render() {
    const { kind, id, category } = this.props;
    return (
      <div className={ styles.simpleMarkerTooltip }>
        <div className='simple-marker-tooltip-row'>
          <div className='simple-marker-tooltip-title'>
            { kind } { id }
          </div>
          <div className='simple-marker-tooltip-category'>
            { category }
          </div>
        </div>
      </div>
    );
  }
}

SimpleMarkerTooltip.propTypes = {
  kind: PropTypes.string,
  id: PropTypes.string,
  category: PropTypes.string,
};
