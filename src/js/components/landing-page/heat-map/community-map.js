import React, { PropTypes, Component } from 'react';

import { clusterGeoJSONPath } from 'utils/static-assets';
import MapboxGL from 'components/common/mapbox-gl';
import { mapContainerStyle } from './community-map.style.js';


export default class CommunityMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverCommunity: 0
    };
  }

  shouldComponentUpdate(nextProps) {
    const { communityId, communitySource } = this.props;
    return (
      communityId !== nextProps.communityId ||
      !communitySource
    );
  }

  render() {
    const { hoverCommunity } = this.state;
    const { selectCommunity, communityId, communitySource } = this.props;

    /* istanbul ignore next */
    return (
      <MapboxGL
        style={ mapContainerStyle }
        onClick={ [
          [() => selectCommunity(0)],
          ['community-fill', e => selectCommunity(e.features[0].properties.id)]
        ] }
        onMouseMove={ [
          ['community-fill', e => this.setState({ hoverCommunity: e.features[0].properties.id })]
        ] }
        onMouseLeave={ [
          ['community-fill', e => this.setState({ hoverCommunity: 0 })]
        ] }
        filters={ [
          ['community-select', ['==', 'id', communityId]],
          ['community-hover', ['==', 'id', hoverCommunity]]
        ] }
        sources={ [
          { name: 'cluster', type: 'geojson', data: clusterGeoJSONPath },
          { name: 'community', type: 'geojson', data: communitySource },
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
                  [5000, 1]
                ]
              },
              'heatmap-intensity': {
                stops: [
                  [9, 20],
                  [17, 100]
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
                  [9, 14],
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
            filter: ['==', 'id', '']
          },
          {
            id: 'community-select',
            type: 'fill',
            source: 'community',
            paint: {
              'fill-color': '#007991',
              'fill-opacity': 0.5
            },
            filter: ['==', 'id', '']
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
    );
  }
}

CommunityMap.propTypes = {
  selectCommunity: PropTypes.func,
  communitySource: PropTypes.object,
  communityId: PropTypes.number
};

CommunityMap.defaultProps = {
  selectCommunity: () => {},
  communitySource: {
    type: 'FeatureCollection',
    features: []
  }
};
