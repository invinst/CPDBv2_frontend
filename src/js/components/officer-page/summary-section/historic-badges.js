import React, { Component, PropTypes } from 'react';

import { historicBadgesStyle } from './historic-badges.style';


export default class HistoricBadges extends Component {
  render() {
    const { historicBadges } = this.props;

    return (historicBadges && historicBadges.length > 0) ? (
      <span className='test--historic-badges' style={ historicBadgesStyle }>
        Historic: { historicBadges.join(', ') }
      </span>
    ) : null;
  }
}

HistoricBadges.propTypes = {
  historicBadges: PropTypes.arrayOf(PropTypes.string),
};
