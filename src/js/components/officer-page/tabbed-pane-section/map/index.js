import React, { Component, PropTypes } from 'react';
import { brightOrangeTwoColor, champagneColor, clayGray, darkSapphireBlue, greyishColor } from 'utils/styles';
import { mapboxgl } from 'utils/vendors';

import { mapStyle, wrapperStyle } from './map.style';
import Legend from './legend';


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

  render() {
    const { legend } = this.props;
    return (
      <div className='test--officer-map' style={ wrapperStyle }>
        <div ref={ this.gotRef.bind(this) } style={ mapStyle }/>
        <Legend legend={ legend } />
      </div>
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
