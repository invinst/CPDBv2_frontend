import React, { Component } from 'react';

import { clusterGeoJSONPath, neighborhoodGeoJSONPath } from 'utils/static-assets';
import MapboxGL from 'components/common/mapbox-gl';
import { mapContainerStyle } from './heat-map.style';


export default class HeatMap extends Component {
  render() {
    return (
      <MapboxGL style={ mapContainerStyle }
        sources={ [
          { name: 'cluster', type: 'geojson', data: clusterGeoJSONPath },
          { name: 'neighborhood', type: 'geojson', data: neighborhoodGeoJSONPath },
        ] }
        layers={ [
          {
            id: 'complaints-heat',
            type: 'heatmap',
            source: 'cluster',
            paint: {
              'heatmap-weight': {
                property: 'weight',
                type: 'exponential',
                stops: [
                  [0, 0],
                  [6, 1]
                ]
              },
              'heatmap-intensity': {
                stops: [
                  [9, 0.09],
                  [17, 3]
                ]
              },
              'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0, 'rgba(33,102,172,0)',
                0.2, 'rgba(0, 0, 255, 0.4)',
                0.4, 'rgba(0,255,255, 0.5)',
                0.6, 'rgba(0, 255, 0, 0.6)',
                0.8, 'rgba(255, 255, 0, 0.7)',
                1.0, 'rgba(255, 0, 0, 0.8)'
              ],
              'heatmap-radius': {
                stops: [
                  [9, 10],
                  [17, 20]
                ]
              },
              'heatmap-opacity': {
                default: 1,
                stops: [
                  [9, 1],
                  [17, 1]
                ]
              },
            }
          }
        ] }
      />
    );
  }
}
