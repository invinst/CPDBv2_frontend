import React, { Component, PropTypes } from 'react';

import styles from './timeline-section.sass';


export default class TimelineSection extends Component {
  render() {
    const { officers } = this.props;

    return (
      <div className={ styles.timelineSection }>
        { officers }
      </div>
    );
  }
}

TimelineSection.propTypes = {
  officers: PropTypes.array,
};
