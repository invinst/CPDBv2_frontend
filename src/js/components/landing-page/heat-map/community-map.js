import React, { PropTypes, Component } from 'react';
import MediaQuery from 'react-responsive';

import MapboxGL from 'components/common/mapbox-gl';
import { mapContainerStyle } from './community-map.style.js';


export default class CommunityMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverCommunity: 0,
    };
    this.renderMap = this.renderMap.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { communityId, communitySource, clusterSource } = this.props;
    return (
      communityId !== nextProps.communityId || !communitySource || !clusterSource
    );
  }

  renderMap(center) {
    const { hoverCommunity } = this.state;
    const { selectCommunity, communityId, communitySource, clusterSource } = this.props;

    /* istanbul ignore next */
    return (
      <MapboxGL
        style={ mapContainerStyle }
        center={ center }
        onClick={ [
          [() => selectCommunity(0)],
          ['community-fill', e => selectCommunity(e.features[0].properties.id)],
        ] }
        onMouseMove={ [
          ['community-fill', e => this.setState({ hoverCommunity: e.features[0].properties.id })],
        ] }
        onMouseLeave={ [
          ['community-fill', e => this.setState({ hoverCommunity: 0 })],
        ] }
        filters={ [
          ['community-select', ['==', 'id', communityId]],
          ['community-hover', ['==', 'id', hoverCommunity]],
        ] }
        sources={ [
          { name: 'cluster', type: 'geojson', data: clusterSource },
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
                  [5000, 1],
                ],
              },
              'heatmap-intensity': {
                stops: [
                  [9, 20],
                  [17, 100],
                ],
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
                1.0, 'rgba(255, 0, 0, 0.8)',
              ],
              'heatmap-radius': {
                stops: [
                  [9, 14],
                  [17, 20],
                ],
              },
              'heatmap-opacity': {
                default: 1,
                stops: [
                  [9, 1],
                  [17, 1],
                ],
              },
            },
          },
          {
            id: 'community-hover',
            type: 'fill',
            source: 'community',
            paint: {
              'fill-color': '#007991',
              'fill-opacity': 0.3,
            },
            filter: ['==', 'id', ''],
          },
          {
            id: 'community-select',
            type: 'fill',
            source: 'community',
            paint: {
              'fill-color': '#007991',
              'fill-opacity': 0.5,
            },
            filter: ['==', 'id', ''],
          },
          {
            id: 'community-outline',
            type: 'line',
            source: 'community',
            paint: {
              'line-color': '#007991',
              'line-opacity': 0.8,
            },
          },
          {
            id: 'community-fill',
            type: 'fill',
            source: 'community',
            paint: {
              'fill-color': '#007991',
              'fill-opacity': 0,
            },
          },
        ] }
      />
    );
  }
  render() {
    const resolutions = [768, 992, 1024, 1200];
    return (
      <div>
        <MediaQuery maxWidth={ resolutions[0] }>
          { this.renderMap([-87.47907983271159, 41.86012230755162]) }
        </MediaQuery>
        <MediaQuery minWidth={ resolutions[0] + 1 } maxWidth={ resolutions[1] }>
          { this.renderMap([-87.5632245630726, 41.853104149715875]) }
        </MediaQuery>
        <MediaQuery minWidth={ resolutions[1] + 1 } maxWidth={ resolutions[2] }>
          { this.renderMap([-87.53747434840545, 41.8538337882795]) }
        </MediaQuery>
        <MediaQuery minWidth={ resolutions[2] + 1 } maxWidth={ resolutions[3] }>
          { this.renderMap([-87.50531065944494, 41.851330986659406]) }
        </MediaQuery>
        <MediaQuery minWidth={ resolutions[3] + 1 }>
          { this.renderMap([-87.43069204745467, 41.84894137599454]) }
        </MediaQuery>
      </div>
    );
  }
}

CommunityMap.propTypes = {
  selectCommunity: PropTypes.func,
  communitySource: PropTypes.object,
  communityId: PropTypes.number,
  clusterSource: PropTypes.object,
};

CommunityMap.defaultProps = {
  selectCommunity: () => {},
  communitySource: {
    type: 'FeatureCollection',
    features: [],
  },
};
