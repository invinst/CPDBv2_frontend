import React, { PropTypes } from 'react';

import CommunityRacePopulation
  from 'components/landing-page/heat-map/summary-panel/community-dropdown/community-race-population';
import { geoInfoStyle } from './geo-info-widget.style';


export default function GeoInfoWidget(props) {
  const { raceCount } = props;
  return !!(raceCount && raceCount.length > 0) && (
    <CommunityRacePopulation { ...props } extraStyle={ geoInfoStyle }/>
  );
}

GeoInfoWidget.propTypes = {
  raceCount: PropTypes.array.isRequired,
};
