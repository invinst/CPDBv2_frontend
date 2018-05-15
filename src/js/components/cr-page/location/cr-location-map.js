import React, { PropTypes, Component } from 'react';

import { TABLET, DESKTOP, EXTRA_WIDE } from 'utils/constants';
import { wrapperStyle } from './cr-location-map.style';
import { markerRedColor } from 'utils/styles';
import ResponsiveStyleComponent from 'components/responsive/responsive-style-component';
import { mapboxgl } from 'utils/vendors';


const centerLat = 41.85677;
const centerLng = -87.6024055;
const zoom1 = 9;
const zoom2 = 13;

export default class CRLocationMap extends Component {
  componentWillReceiveProps(nextProps, nextState) {
    const { lat, lng } = this.props;

    if (lat !== nextProps.lat || lng !== nextProps.lng) {
      this.addMarker(nextProps.lat, nextProps.lng);

      if (this.map.getZoom() === zoom2) {
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
        zoom: zoom1,
        center: [centerLng, centerLat],
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
      markerEl.style.width = '14px';
      markerEl.style.height = '14px';
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
    if (this.map.getZoom() === zoom1) {
      this.zoomIn();
    } else {
      this.zoomOut();
    }
  }

  zoomIn() {
    const { lng, lat } = this.props;
    this.map.easeTo({
      center: [lng, lat],
      zoom: zoom2
    });
  }

  zoomOut() {
    this.map.easeTo({
      center: [centerLng, centerLat],
      zoom: zoom1
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
