import React, { Component, PropTypes } from 'react';

import CommunityRacePopulation
  from 'components/landing-page/heat-map/summary-panel/community-dropdown/community-race-population';
import { geoInfoStyle } from './geo-info-widget.style';


export default class GeoInfoWidget extends Component {
  render() {
    const { raceCount } = this.props;
    return !!(raceCount && raceCount.length > 0) && (
      <CommunityRacePopulation { ...this.props } extraStyle={ geoInfoStyle }/>
    );
  }
}

GeoInfoWidget.propTypes = {
  raceCount: PropTypes.array.isRequired,
};
