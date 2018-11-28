import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import Row from './row';
import styles from './legend.sass';


export default class Legend extends Component {

  render() {
    const { legend } = this.props;
    return (
      <div className={ cx(styles.legend, 'test--legend') }>
        <Row
          className='unsustained-complaint'
          text='Unsustained Complaint'
          number={ legend.unsustainedCount }
        />
        <Row
          className='sustained-complaint'
          text='Sustained Allegation'
          number={ legend.sustainedCount }
        />
        <Row
          className='use-of-force-report'
          text='Use of Force Report'
          number={ legend.useOfForceCount }
        />
      </div>
    );
  }
}

Legend.propTypes = {
  legend: PropTypes.shape({
    unsustainedCount: PropTypes.number,
    sustainedCount: PropTypes.number,
    useOfForceCount: PropTypes.number
  }),
};

Legend.defaultProps = {
  legend: {
    unsustainedCount: 0,
    sustainedCount: 0,
    useOfForceCount: 0
  },
};
