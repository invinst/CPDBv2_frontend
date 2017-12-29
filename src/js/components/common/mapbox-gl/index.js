import React, { PropTypes, Component } from 'react';
import { each } from 'lodash';

import { mapboxgl } from 'utils/vendors';


export default class MapboxGL extends Component {
  componentDidMount() {
    const {
      minZoom, maxZoom, scrollZoom, dragRotate, sources, onMouseMove,
      dragPan, defaultZoom, maxBounds, center, layers, onMouseLeave,
      onClick
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

    this._mapBox.on('load', () => {
      each(sources, ({ name, ...rest }) => this._mapBox.addSource(name, rest));
      each(layers, layer => this._mapBox.addLayer(layer));
      each(onMouseMove, ([name, func]) => this._mapBox.on('mousemove', name, e => func(e, this._mapBox)));
      each(onMouseLeave, ([name, func]) => this._mapBox.on('mouseleave', name, e => func(e, this._mapBox)));
      each(onClick, ([name, func]) => this._mapBox.on('click', name, e => func(e, this._mapBox)));
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
  center: PropTypes.array,
  onMouseMove: PropTypes.array,
  onMouseLeave: PropTypes.array,
  onClick: PropTypes.array,
  sources: PropTypes.array,
  layers: PropTypes.array
};

MapboxGL.defaultProps = {
  mapStyle: 'mapbox://styles/mapbox/light-v9',
  minZoom: 9,
  maxZoom: 17,
  scrollZoom: true,
  dragRotate: false,
  dragPan: true,
  defaultZoom: 9,
  center: [-87.4024055, 41.85677],
  maxBounds: [
    [-88.53057861328125, 41.143501411390766],
    [-85.39947509765625, 42.474122772511485]
  ],
  sources: [],
  layers: [],
  onMouseMove: [],
  onMouseLeave: [],
  onClick: []
};
