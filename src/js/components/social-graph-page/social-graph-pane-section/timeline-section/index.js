import React, { Component, PropTypes } from 'react';

import styles from './timeline-section.sass';
import AllegationRow from './allegation-row';


export default class TimelineSection extends Component {
  render() {
    const { allegations } = this.props;

    return (
      <div className={ styles.timelineSection }>
        {
          allegations.map((allegation) => (<AllegationRow key={ allegation.crid } allegation={ allegation } />))
        }
      </div>
    );
  }
}

TimelineSection.propTypes = {
  allegations: PropTypes.array,
};

TimelineSection.defaultProps = {
  allegations: [],
};
