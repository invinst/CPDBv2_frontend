import React, { Component, PropTypes } from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import { isEmpty, values, slice, isEqual } from 'lodash';

import { MAP_INFO, MAPBOX_STYLE } from 'utils/constants';
import { mapboxgl } from 'utils/vendors';
import Legend from './legend';
import MarkerTooltip from './marker-tooltip';
import Marker from './marker';
import styles from './allegations-map.sass';
import withLoadingSpinner from 'components/common/with-loading-spinner';

const MARKERS_PER_PAGE = 200;

export default class AllegationsMap extends Component {
  constructor(props) {
    super(props);
    this.currentMarkers = {};
  }

  componentDidMount() {
    this.loadMarkersPerPages();
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.clearAllMarkers) {
      values(this.currentMarkers).forEach(currentMarker => currentMarker.remove());
      this.currentMarkers = {};
      this.addMarkers(nextProps.markers);
    } else {
      if (!isEqual(nextProps.markers, this.props.markers)) {
        this.addMarkers(nextProps.markers);
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { legend, markers } = this.props;
    return legend !== nextProps.legend || markers !== nextProps.markers;
  }

  loadMarkersPerPages(startIndex=0) {
    const { markers } = this.props;

    slice(markers, startIndex, startIndex + MARKERS_PER_PAGE).forEach(marker => {
      this.addMarker(marker);
    });

    const nextStartIndex = startIndex + MARKERS_PER_PAGE;
    if (nextStartIndex < markers.length) {
      setTimeout(() => {
        this.loadMarkersPerPages(nextStartIndex);
      }, 1);
    }
  }

  gotRef(el) {
    if (el && !this.map) {
      this.map = new mapboxgl.Map({
        container: el,
        style: MAPBOX_STYLE,
        zoom: MAP_INFO.ZOOM1,
        center: [MAP_INFO.CENTER_LNG, MAP_INFO.CENTER_LAT],
        interactive: true,
        scrollZoom: false,
      });
      this.map.addControl(new mapboxgl.NavigationControl(), 'top-left');
    }
  }

  getUrl(marker) {
    if (marker.kind === 'CR') {
      return `/complaint/${marker.id}/`;
    } else if (marker.kind === 'FORCE') {
      return `/trr/${marker.id}/`;
    }
  }

  createPopup(marker) {
    const popup = new mapboxgl.Popup({ offset: 0, closeButton: false });
    const tooltip = (
      <MarkerTooltip
        date={ marker.date }
        category={ marker.category }
        url={ this.getUrl(marker) }
      />
    );
    popup.setHTML(ReactDOMServer.renderToString(tooltip));
    return popup;
  }

  markerUid(marker) {
    return `${ marker.kind }-${ marker.id }`;
  }

  addMarker(marker) {
    if (!isEmpty(this.currentMarkers[this.markerUid(marker)])) {
      return;
    }
    const { handleClickCRMarker, handleClickTRRMarker } = this.props;
    const popup = this.createPopup(marker);

    const markerEl = document.createElement('div');
    markerEl.className = `map-marker ${marker.kind.toLowerCase()}-marker`;
    this.marker = new mapboxgl.Marker(markerEl);
    this.marker.setLngLat([marker.point.lon, marker.point.lat]);
    this.marker.setPopup(popup);
    this.marker.addTo(this.map);
    this.currentMarkers[this.markerUid(marker)] = this.marker;

    ReactDOM.render(
      <Marker
        id={ marker.id }
        kind={ marker.kind }
        finding={ marker.finding }
        mapboxMarker={ this.marker }
        handleClickCRMarker={ handleClickCRMarker }
        handleClickTRRMarker={ handleClickTRRMarker }
      />,
      markerEl
    );
  }

  addMarkers(markers) {
    markers.forEach(marker => this.addMarker(marker));
  }

  render() {
    const { mapCustomClassName, legend } = this.props;

    return (
      <div className={ cx(styles.map, mapCustomClassName) }>
        <div ref={ this.gotRef.bind(this) } className='map-tab'/>
        <Legend legend={ legend } />
      </div>
    );
  }
}

AllegationsMap.propTypes = {
  mapCustomClassName: PropTypes.string,
  legend: PropTypes.shape({
    allegationCount: PropTypes.number,
    unsustainedCount: PropTypes.number,
    sustainedCount: PropTypes.number,
    useOfForceCount: PropTypes.number,
  }),
  markers: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        point: PropTypes.shape({
          lat: PropTypes.number,
          lon: PropTypes.number,
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
        ),
      })
    ),
    PropTypes.arrayOf(
      PropTypes.shape({
        point: PropTypes.shape({
          lat: PropTypes.number,
          lon: PropTypes.number,
        }),
        kind: PropTypes.string,
        id: PropTypes.string,
        category: PropTypes.string,
      })
    ),
  ]),
  handleClickCRMarker: PropTypes.func,
  handleClickTRRMarker: PropTypes.func,
  clearAllMarkers: PropTypes.bool,
};

AllegationsMap.defaultProps = {
  legend: {},
  markers: [],
  clearAllMarkers: true,
};
export const AllegationsMapWithSpinner = withLoadingSpinner(AllegationsMap, styles.allegationMapLoading);
