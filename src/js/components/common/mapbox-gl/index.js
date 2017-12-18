import React, { PropTypes, Component } from 'react';

import { mapboxgl } from 'utils/vendors';


export default class MapboxGL extends Component {
  componentDidMount() {
    const {
      minZoom, maxZoom, scrollZoom, dragRotate,
      dragPan, defaultZoom, maxBounds, center
    } = this.props;

    this._mapBox = new mapboxgl.Map({
      minZoom,
      maxZoom,
      center,
      scrollZoom,
      dragRotate,
      dragPan,
      defaultZoom,
      maxBounds,
      container: this._mapContainer,
      style: this.props.mapStyle
    });
  }

  render() {
    return (
      <div ref={ (mapContainer) => { this._mapContainer = mapContainer; } }
        style={ this.props.style }/>
    );
  }
}

MapboxGL.propTypes = {
  mapStyle: PropTypes.string,
  style: PropTypes.object,
  minZoom: PropTypes.number,
  maxZoom: PropTypes.number,
  scrollZoom: PropTypes.bool,
  dragRotate: PropTypes.bool,
  dragPan: PropTypes.bool,
  defaultZoom: PropTypes.number,
  maxBounds: PropTypes.array,
  center: PropTypes.array
};

MapboxGL.defaultProps = {
  mapStyle: 'mapbox://styles/mapbox/dark-v9',
  minZoom: 10,
  maxZoom: 17,
  scrollZoom: true,
  dragRotate: false,
  dragPan: true,
  defaultZoom: 10,
  center: [-87.6024055, 41.85677],
  maxBounds: [
    [-88.53057861328125, 41.143501411390766],
    [-85.39947509765625, 42.474122772511485]
  ]
};
