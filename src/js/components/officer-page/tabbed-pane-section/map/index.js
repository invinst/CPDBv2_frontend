import React, { PropTypes, Component } from 'react';

import { TABLET, DESKTOP, EXTRA_WIDE } from 'utils/constants';
import { wrapperStyle } from './map.style';
import { champagneColor, greyishColor, brightOrangeTwoColor, clayGray, darkSapphireBlue } from 'utils/styles';
import ResponsiveStyleComponent from 'components/responsive/responsive-style-component';
import { mapboxgl } from 'utils/vendors';


const centerLat = 41.85677;
const centerLng = -87.6024055;
const zoom1 = 9;

export default class Map extends Component {
  componentWillReceiveProps(nextProps, nextState) {
    const { markers } = this.props;

    if (markers !== nextProps.markers) {
      nextProps.markers.map(marker => {
        this.addMarker(marker);
      });
    }
  }

  gotRef(el) {
    if (el && !this.map) {
      this.map = new mapboxgl.Map({
        container: el,
        style: 'mapbox://styles/mapbox/streets-v10',
        zoom: zoom1,
        center: [centerLng, centerLat],
        interactive: false
      });
    }
  }

  createMarkerHead(marker) {
    const markerHead = document.createElement('div');
    if (marker.kind === 'TRR') {
      markerHead.style.backgroundColor = greyishColor;
      markerHead.style.border = `solid 1px ${ clayGray }`;
    } else if (marker.kind === 'CR') {
      markerHead.style.border = `solid 1px ${ brightOrangeTwoColor }`;
      if (marker.finding === 'Sustained') {
        markerHead.style.backgroundColor = champagneColor;
      } else {
        markerHead.style.backgroundColor = 'white';
      }
    }
    markerHead.style.backgroundSize = 'cover';
    markerHead.style.width = '14px';
    markerHead.style.height = '14.2px';
    markerHead.style.borderRadius = '50%';
    return markerHead;
  }

  createMarkerLeg() {
    const markerLeg = document.createElement('div');
    markerLeg.style.width = '2px';
    markerLeg.style.height = '8px';
    markerLeg.style.border = `solid 1px ${ darkSapphireBlue }`;
    markerLeg.style.boxSizing = 'border-box';
    markerLeg.style.margin = '0 auto';
    return markerLeg;
  }

  addMarker(marker) {
    const markerEl = document.createElement('div');
    const markerHead = this.createMarkerHead(marker);
    const markerLeg = this.createMarkerLeg();

    markerEl.appendChild(markerHead);
    markerEl.appendChild(markerLeg);
    markerEl.style.paddingBottom = '15px';

    this.marker = new mapboxgl.Marker(markerEl);
    this.marker.setLngLat([marker.point.lon, marker.point.lat]);
    this.marker.addTo(this.map);
  }

  renderWithResponsiveStyle(style) {
    return (
      <div className='test--officer-map' ref={ this.gotRef.bind(this) } style={ style.wrapper } />
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
