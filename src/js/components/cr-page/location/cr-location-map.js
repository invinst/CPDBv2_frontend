import React, { PropTypes, Component } from 'react';
import 'mapbox.js';

import { MAPBOX_ACCESS_TOKEN, TABLET, DESKTOP, EXTRA_WIDE } from 'utils/constants';
import { wrapperStyle } from './cr-location-map.style';
import { markerRedColor } from 'utils/styles';
import ResponsiveStyleComponent from 'components/responsive/responsive-style-component';


const centerLat = 41.85677;
const centerLng = -87.6024055;
const zoom1 = 10;
const zoom2 = 14;

export default class CRLocationMap extends Component {
  componentWillReceiveProps(nextProps, nextState) {
    const { lat, lng } = this.props;

    if (lat !== nextProps.lat || lng !== nextProps.lng) {
      this.addMarker(nextProps.lat, nextProps.lng);

      if (this.map.getZoom() === zoom2) {
        this.zoomIn();
      }
    }
  }

  gotRef(el) {
    if (el && !this.map) {
      const { lat, lng } = this.props;
      global.L.mapbox.accessToken = MAPBOX_ACCESS_TOKEN;
      this.map = global.L.mapbox.map(el, 'mapbox.streets', {
        center: [centerLat, centerLng],
        zoom: zoom1,
        dragging: false,
        touchZoom: false,
        scrollWheelZoom: false,
        boxZoom: false,
        keyboard: false,
        doubleClickZoom: false,
        zoomControl: false,
        attributionControl: false
      });
      this.map.on('click', this.handleMapClick.bind(this));
      this.addMarker(lat, lng);
    }
  }

  addMarker(lat, lng) {
    const geojson = [{
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [lng, lat]
      },
      properties: {
        'marker-color': markerRedColor,
        'marker-size': 'small'
      }
    }];
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
    this.marker = global.L.mapbox.featureLayer().setGeoJSON(geojson).addTo(this.map);
  }

  handleMapClick(e) {
    if (this.map.getZoom() === zoom1) {
      this.zoomIn();
    } else {
      this.zoomOut();
    }
  }

  zoomIn() {
    const { lat, lng } = this.props;
    this.map.setView([lat, lng], zoom2);
  }

  zoomOut() {
    this.map.setView([centerLat, centerLng], zoom1);
  }

  renderWithResponsiveStyle(style) {
    return (
      <div className='test--cr-location-map' ref={ this.gotRef.bind(this) } style={ style.wrapper }>
      </div>
    );
  }

  render() {
    return (
      <ResponsiveStyleComponent
        responsiveStyle={ {
          [TABLET]: {
            wrapper: wrapperStyle.tablet
          },
          [DESKTOP]: {
            wrapper: wrapperStyle.desktop
          },
          [EXTRA_WIDE]: {
            wrapper: wrapperStyle.extraWide
          }
        } }>
        { this.renderWithResponsiveStyle.bind(this) }
      </ResponsiveStyleComponent>
    );
  }
}

CRLocationMap.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number
};
