import React, { Component, PropTypes } from 'react';
import ReactDOMServer from 'react-dom/server';
import { brightOrangeTwoColor, champagneColor, clayGray, darkSapphireBlue, greyishColor } from 'utils/styles';

import { mapboxgl } from 'utils/vendors';
import Legend from './legend';
import { mapStyle, wrapperStyle } from './map.style';
import MarkerTooltip from './marker-tooltip';


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
        interactive: true,
        scrollZoom: false,
      });
      this.map.addControl(new mapboxgl.NavigationControl(), 'top-left');
    }
  }

  createMarkerHead(marker) {
    const markerHead = document.createElement('div');
    markerHead.className = 'marker-head';
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

  addMarkerHeadHover(markerHead, marker) {
    markerHead.addEventListener('mouseenter', () => {
      if (!marker.getPopup().isOpen()) {
        marker.togglePopup();
      }
    });
    markerHead.addEventListener('mouseleave', () => {
      if (marker.getPopup().isOpen()) {
        marker.togglePopup();
      }
    });
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

    const popup = new mapboxgl.Popup({ offset: 25, closeButton: false });

    popup.setHTML(ReactDOMServer.renderToString(
      <MarkerTooltip
        kind={ marker.kind }
        id={ marker.id }
        category={ marker.category }
        coaccused={ marker.coaccused }
        victims={ marker.victims }
      />
    ));

    this.marker = new mapboxgl.Marker(markerEl);
    this.marker.setLngLat([marker.point.lon, marker.point.lat]);
    this.marker.setPopup(popup);
    this.marker.addTo(this.map);

    const markerHeadEl = markerEl.querySelector('.marker-head');
    this.addMarkerHeadHover(markerHeadEl, this.marker);

    markerEl.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
    });
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
      }),
      kind: PropTypes.string,
      finding: PropTypes.string,
      id: PropTypes.string,
      category: PropTypes.string,
      coaccused: PropTypes.number,
      victims: PropTypes.arrayOf(
        PropTypes.shape({
          gender: PropTypes.string,
          race: PropTypes.string,
          age: PropTypes.number,

        })
      )
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
