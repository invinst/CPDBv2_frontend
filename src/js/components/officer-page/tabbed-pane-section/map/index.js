import React, { Component, PropTypes } from 'react';
import ReactDOMServer from 'react-dom/server';

import { MAP_INFO, MAP_ITEMS } from 'utils/constants';
import { mapboxgl } from 'utils/vendors';
import Legend from './legend';
import { mapStyle, wrapperStyle } from './map.style';
import MarkerTooltip from './marker-tooltip';
import { accentColor, brightOrangeTwoColor, champagneColor, clayGray, greyishColor } from 'utils/styles';
import SimpleMarkerTooltip from './simple-marker-tooltip';


export default class Map extends Component {
  gotRef(el) {
    if (el && !this.map) {
      this.map = new mapboxgl.Map({
        container: el,
        style: 'mapbox://styles/mapbox/light-v9',
        zoom: MAP_INFO.ZOOM1,
        center: [MAP_INFO.CENTER_LNG, MAP_INFO.CENTER_LAT],
        interactive: true,
        scrollZoom: false,
      });
      this.map.addControl(new mapboxgl.NavigationControl(), 'top-left');

      this.props.markers.map(marker => {
        this.addMarker(marker);
      });
    }
  }

  createMarkerHead(marker) {
    const markerHead = document.createElement('div');
    markerHead.className = 'marker-head';
    if (marker.kind === MAP_ITEMS.FORCE) {
      markerHead.style.backgroundColor = greyishColor;
      markerHead.style.border = `solid 1px ${ clayGray }`;
    } else if (marker.kind === MAP_ITEMS.CR) {
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
    markerHead.style.boxSizing = 'border-box';
    markerHead.style.cursor = 'pointer';
    return markerHead;
  }

  addMarkerHeadHover(markerHead, marker, kind, markerEl) {
    markerHead.addEventListener('mouseenter', () => {
      if (!marker.getPopup().isOpen()) {
        marker.togglePopup();
        markerHead.style.borderColor = accentColor;
        markerEl.style.zIndex = '10';
      }
    });
    markerHead.addEventListener('mouseleave', () => {
      if (marker.getPopup().isOpen()) {
        marker.togglePopup();
        markerEl.style.zIndex = '0';
        if (kind === MAP_ITEMS.CR) {
          markerHead.style.borderColor = brightOrangeTwoColor;
        } else if (kind === MAP_ITEMS.FORCE) {
          markerHead.style.borderColor = clayGray;
        }
      }
    });
  }

  addTooltip(marker) {
    if (marker.kind === MAP_ITEMS.CR) {
      return (
        <MarkerTooltip
          kind={ marker.kind }
          id={ marker.id }
          category={ marker.category }
          coaccused={ marker.coaccused }
          victims={ marker.victims }
        />
      );
    } else if (marker.kind === MAP_ITEMS.FORCE) {
      return (
        <SimpleMarkerTooltip
          kind='TRR'
          id={ marker.id }
          category={ marker.category }
        />
      );
    }
  }

  addMarker(marker) {
    const markerEl = document.createElement('div');
    markerEl.setAttribute('className', 'test--marker');
    const markerHead = this.createMarkerHead(marker);

    markerEl.appendChild(markerHead);

    const popup = new mapboxgl.Popup({ offset: 0, closeButton: false });
    popup.setHTML(ReactDOMServer.renderToString(
      this.addTooltip(marker)
    ));

    this.marker = new mapboxgl.Marker(markerEl);
    this.marker.setLngLat([marker.point.lon, marker.point.lat]);
    this.marker.setPopup(popup);
    this.marker.addTo(this.map);

    const markerHeadEl = markerEl.querySelector('.marker-head');
    this.addMarkerHeadHover(markerHeadEl, this.marker, marker.kind, markerEl);

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
