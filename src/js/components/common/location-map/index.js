import React, { PropTypes, Component } from 'react';

import { wrapperStyle, defaultMarkerStyle } from './location-map.style';
import { mapboxgl } from 'utils/vendors';
import { render } from 'react-dom';


const centerLat = 41.85677;
const centerLng = -87.6024055;
const zoom1 = 9;
const zoom2 = 13;
const scrollTopMargin = 20; // this value depends on the height of ShareableHeader

export default class LocationMap extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.prevTop = 0;
    this.prevBottom = 0;
  }

  componentDidMount() {
    addEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { lat, lng } = this.props;

    if (lat !== nextProps.lat || lng !== nextProps.lng) {
      this.addMarker(nextProps.lat, nextProps.lng, nextProps.markerEl);

      if (this.map.getZoom() === zoom2) {
        this.zoomOut();
      }
    }
  }
  componentWillUnmount() {
    removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
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
  }

  gotRef(el) {
    if (el && !this.map) {
      this.el = el;
      const { lat, lng, mapboxStyle, markerEl } = this.props;
      this.map = new mapboxgl.Map({
        container: el,
        style: mapboxStyle,
        zoom: zoom1,
        center: [centerLng, centerLat],
        interactive: false
      });
      this.map.on('click', this.handleMapClick.bind(this));
      this.addMarker(lat, lng, markerEl);
    }
  }

  addMarker(lat, lng, markerEl) {
    if (!this.marker) {
      const placeholder = document.createElement('div');
      const markerDOM = render(
        markerEl || <div className='test--default-marker' style={ defaultMarkerStyle } />,
        placeholder
      );

      this.marker = new mapboxgl.Marker(markerDOM);
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

  render() {

    return (
      <div
        className='test--location-map'
        ref={ this.gotRef.bind(this) }
        style={ { ...wrapperStyle, ...this.props.extraStyle } }
      />
    );
  }
}

LocationMap.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
  extraStyle: PropTypes.object,
  mapboxStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  markerEl: PropTypes.element,
};

LocationMap.defaultProps = {
  mapboxStyle: 'mapbox://styles/mapbox/streets-v10',
  extraStyle: {},
  markerEl: null,
};
