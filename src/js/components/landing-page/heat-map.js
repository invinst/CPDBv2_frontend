import React, { Component } from 'react';

import { mapContainerStyle } from './heat-map.style';
import MapboxGL from 'components/common/mapbox-gl';


export default class HeatMap extends Component {
  render() {
    return (
      <MapboxGL style={ mapContainerStyle }/>
    );
  }
}
