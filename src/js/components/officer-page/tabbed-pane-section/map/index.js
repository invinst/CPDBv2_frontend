import React, { PropTypes, Component } from 'react';

import { TABLET, DESKTOP, EXTRA_WIDE } from 'utils/constants';
import { wrapperStyle } from './map.style';
import { markerRedColor } from 'utils/styles';
import ResponsiveStyleComponent from 'components/responsive/responsive-style-component';
import { mapboxgl } from 'utils/vendors';


const centerLat = 41.85677;
const centerLng = -87.6024055;
const zoom1 = 9;

export default class Map extends Component {
  constructor(state) {
    super(state);
    this.gotRef = this.gotRef.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.renderWithResponsiveStyle = this.renderWithResponsiveStyle.bind(this);
  }

  gotRef(el) {
    console.log(this.props);
    if (el && !this.map) {
      const { markers } = this.props;
      this.map = new mapboxgl.Map({
        container: el,
        style: 'mapbox://styles/mapbox/streets-v10',
        zoom: zoom1,
        center: [centerLng, centerLat],
        interactive: false
      });
      markers.map(marker => this.addMarker(marker.lat, marker.lon));
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

  renderWithResponsiveStyle(style) {
    return (
      <div className='test--officer-map' ref={ this.gotRef } style={ style.wrapper } />
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
        { this.renderWithResponsiveStyle }
      </ResponsiveStyleComponent>
    );
  }
}

Map.propTypes = {
  legend: PropTypes.shape({
    allegationCount: PropTypes.number,
    sustainedCount: PropTypes.number,
    useOfForceCount: PropTypes.number
  }),
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      point: PropTypes.shape({
        lat: PropTypes.number,
        lon: PropTypes.number
      })
    })
  ),
};

Map.defaultProps = {
  legend: {
    allegationCount: 0,
    sustainedCount: 0,
    useOfForceCount: 0
  },
  markers: []
};
