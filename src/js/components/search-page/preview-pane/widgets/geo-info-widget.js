import React, { Component } from 'react';

import CommunityRacePopulation
  from 'components/landing-page/heat-map/summary-panel/community-dropdown/community-race-population';
import { geoInfoStyle } from './geo-info-widget.style';


export default class GeoInfoWidget extends Component {
  render() {
    return <CommunityRacePopulation { ...this.props } extraStyle={ geoInfoStyle }/>;
  }
}
