import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import styles from './history-badges.sass';


export default class HistoricBadges extends Component {
  render() {
    const { historicBadges } = this.props;

    return (historicBadges && historicBadges.length > 0) ? (
      <span className={ cx(styles.historicBadges, 'test--historic-badges') }>
        Historic: { historicBadges.join(', ') }
      </span>
    ) : null;
  }
}

HistoricBadges.propTypes = {
  historicBadges: PropTypes.arrayOf(PropTypes.string),
};
