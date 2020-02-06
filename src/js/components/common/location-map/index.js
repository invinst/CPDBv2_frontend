import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';

import { mapboxgl } from 'utils/vendors';
import { MAPBOX_STYLE } from 'utils/constants';
import styles from './location-map.sass';


const centerLat = 41.85677;
const centerLng = -87.6024055;
const zoom1 = 9;
const zoom2 = 13;
const scrollTopMargin = 20; // this value depends on the height of ShareableHeader

export default class LocationMap extends Component {
  constructor(props) {
    super(props);
    this.prevTop = 0;
    this.prevBottom = 0;
  }

  componentDidMount() {
    addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    const { lat, lng, customMarkerClassName } = this.props;

    if (prevProps.lat !== lat || prevProps.lng !== lng) {
      this.addMarker(lat, lng, customMarkerClassName);

      if (this.map.getZoom() === zoom2) {
        this.zoomOut();
      }
    }
  }

  componentWillUnmount() {
    removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = event => {
    /* istanbul ignore next */
    // Logic: zoom in the map if it closes to top or bottom of the current window
    if (this.map) {
      const { top, bottom } = this.map.getContainer().getBoundingClientRect();
      const isScrollDown = top - this.prevTop < 0 || this.prevTop == 0;
      const bottomCrossed = (this.prevBottom != 0) &&
        (this.prevBottom - window.innerHeight) * (bottom - window.innerHeight) <= 0;
      const topCrossed = (this.prevTop != 0) && (top - scrollTopMargin) * (this.prevTop - scrollTopMargin) <= 0;

      if (isScrollDown && (bottomCrossed || topCrossed)) {
        this.zoomIn();
      }

      if (!isScrollDown && (bottomCrossed || topCrossed)) {
        this.zoomOut();
      }

      this.prevTop = top;
      this.prevBottom = bottom;
    }
  };

  gotRef(el) {
    if (el && !this.map) {
      this.el = el;
      const { lat, lng, mapboxStyle, customMarkerClassName } = this.props;
      this.map = new mapboxgl.Map({
        container: el,
        style: mapboxStyle,
        zoom: zoom1,
        center: [centerLng, centerLat],
        interactive: false,
      });
      this.map.on('click', this.handleMapClick);
      this.addMarker(lat, lng, customMarkerClassName);
    }
  }

  addMarker(lat, lng, customMarkerClassName) {
    if (!this.marker) {
      const markerEl = document.createElement('div');
      markerEl.className = customMarkerClassName || 'default-marker';

      this.marker = new mapboxgl.Marker(markerEl);
      this.marker.setLngLat([lng, lat]);
      this.marker.addTo(this.map);
    } else {
      this.marker.setLngLat([lng, lat]);
    }
  }

  handleMapClick = (e) => {
    if (this.map.getZoom() === zoom1) {
      this.zoomIn();
    } else {
      this.zoomOut();
    }
  };

  zoomIn() {
    const { lng, lat } = this.props;
    this.map.easeTo({
      center: [lng, lat],
      zoom: zoom2,
    });
  }

  zoomOut() {
    this.map.easeTo({
      center: [centerLng, centerLat],
      zoom: zoom1,
    });
  }

  render() {

    return (
      <div
        className={ cx(styles.locationMap, this.props.className, 'test--location-map') }
        ref={ this.gotRef.bind(this) }
      />
    );
  }
}

LocationMap.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
  className: PropTypes.string,
  mapboxStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  customMarkerClassName: PropTypes.string,
};

LocationMap.defaultProps = {
  mapboxStyle: MAPBOX_STYLE,
};
