import React, { Component } from 'react';

import { clusterGeoJSONPath, communityGeoJSONPath } from 'utils/static-assets';
import MapboxGL from 'components/common/mapbox-gl';
import SummaryPanel from './summary-panel';
import { mapContainerStyle, wrapperStyle } from './heat-map.style';


export default class HeatMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  render() {
    const { selected } = this.state;

    return (
      <div style={ wrapperStyle }>
        <MapboxGL style={ mapContainerStyle }
          onClick={ [
            ['community-fill', (e, map) => {
              map.setFilter('community-select', ['==', 'name', e.features[0].properties.name]);
              this.setState({
                selected: e.features[0].properties
              });
            }]
          ] }
          onMouseMove={ [
            ['community-fill', (e, map) =>
              map.setFilter('community-hover', ['==', 'name', e.features[0].properties.name])
            ]
          ] }
          onMouseLeave={ [
            ['community-fill', (e, map) =>
              map.setFilter('community-hover', ['==', 'name', ''])
            ]
          ] }
          sources={ [
            { name: 'cluster', type: 'geojson', data: clusterGeoJSONPath },
            { name: 'community', type: 'geojson', data: communityGeoJSONPath },
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
            },
            {
              id: 'community-hover',
              type: 'fill',
              source: 'community',
              paint: {
                'fill-color': '#007991',
                'fill-opacity': 0.3
              },
              filter: ['==', 'name', '']
            },
            {
              id: 'community-select',
              type: 'fill',
              source: 'community',
              paint: {
                'fill-color': '#007991',
                'fill-opacity': 0.5
              },
              filter: ['==', 'name', '']
            },
            {
              id: 'community-outline',
              type: 'line',
              source: 'community',
              paint: {
                'line-color': '#007991',
                'line-opacity': 0.8
              }
            },
            {
              id: 'community-fill',
              type: 'fill',
              source: 'community',
              paint: {
                'fill-color': '#007991',
                'fill-opacity': 0
              }
            }
          ] }
        />
        <SummaryPanel community={ selected }/>
      </div>
    );
  }
}
