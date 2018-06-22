import React, { PropTypes, Component } from 'react';

import { TABLET, DESKTOP, EXTRA_WIDE, MAP_INFO } from 'utils/constants';
import { wrapperStyle } from './cr-location-map.style';
import { markerRedColor } from 'utils/styles';
import ResponsiveStyleComponent from 'components/responsive/responsive-style-component';
import { mapboxgl } from 'utils/vendors';


export default class CRLocationMap extends Component {
  componentWillReceiveProps(nextProps, nextState) {
    const { lat, lng } = this.props;

    if (lat !== nextProps.lat || lng !== nextProps.lng) {
      this.addMarker(nextProps.lat, nextProps.lng);

      if (this.map.getZoom() === MAP_INFO.ZOOM2) {
        this.zoomOut();
      }
    }
  }

  gotRef(el) {
    if (el && !this.map) {
      const { lat, lng } = this.props;
      this.map = new mapboxgl.Map({
        container: el,
        style: 'mapbox://styles/mapbox/streets-v10',
        zoom: MAP_INFO.ZOOM1,
        center: [MAP_INFO.CENTER_LNG, MAP_INFO.CENTER_LAT],
        interactive: false
      });
      this.map.on('click', this.handleMapClick.bind(this));
      this.addMarker(lat, lng);
    }
  }

  addMarker(lat, lng) {
    if (!this.marker) {
      const markerEl = document.createElement('div');
      markerEl.style.backgroundColor = markerRedColor;
      markerEl.style.backgroundSize = 'cover';
      markerEl.style.width = '28px';
      markerEl.style.height = '28px';
      markerEl.style.borderRadius = '50%';
      markerEl.style.opacity = 0.5;

      this.marker = new mapboxgl.Marker(markerEl);
      this.marker.setLngLat([lng, lat]);
      this.marker.addTo(this.map);
    } else {
      this.marker.setLngLat([lng, lat]);
    }
  }

  handleMapClick(e) {
    if (this.map.getZoom() === MAP_INFO.ZOOM1) {
      this.zoomIn();
    } else {
      this.zoomOut();
    }
  }

  zoomIn() {
    const { lng, lat } = this.props;
    this.map.easeTo({
      center: [lng, lat],
      zoom: MAP_INFO.ZOOM2
    });
  }

  zoomOut() {
    this.map.easeTo({
      center: [MAP_INFO.CENTER_LNG, MAP_INFO.CENTER_LAT],
      zoom: MAP_INFO.ZOOM1
    });
  }

  renderWithResponsiveStyle(style) {
    return (
      <div className='test--cr-location-map' ref={ this.gotRef.bind(this) } style={ style.wrapper } />
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
