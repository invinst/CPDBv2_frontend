import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import browserHistory from 'utils/history';
import cx from 'classnames';
import { isEmpty, isEqual } from 'lodash';
import isMobile from 'ismobilejs';

import { MAP_INFO, MAPBOX_STYLE, MAP_ITEMS } from 'utils/constants';
import { brightOrangeTwoColor, clayGray, greyishColor, champagneColor, accentColor } from 'utils/styles';
import { mapboxgl } from 'utils/vendors';
import Legend from './legend';
import MarkerTooltip from './marker-tooltip';
import styles from './allegations-map.sass';
import LoadingSpinner from 'components/common/loading-spinner';
import withLoadingSpinner from 'components/common/with-loading-spinner';


const MAPBOXGL_POINT_STYLE = {
  'circle-radius': 7,
  'circle-stroke-width': 1,
  'circle-color': [
    'match',
    ['get', 'pointType'],
    'FORCE', greyishColor,
    'CR', 'white',
    'SUSTAINED-CR', champagneColor,
    'transparent',
  ],
  'circle-stroke-color': [
    'case',
    ['boolean', ['feature-state', 'hover'], false],
    accentColor,
    [
      'match',
      ['get', 'pointType'],
      'FORCE', clayGray,
      'CR', brightOrangeTwoColor,
      'SUSTAINED-CR', brightOrangeTwoColor,
      'transparent',
    ],
  ],
};

export default class AllegationsMap extends Component {
  constructor(props) {
    super(props);
    this.initMapData();
    this.tooltip = new mapboxgl.Popup({ offset: 0, closeButton: false });
  }

  componentDidMount() {
    this.addMapLayersOnStyleLoaded(this.props.markerGroups);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { legend, markerGroups } = this.props;
    return !isEqual(legend, nextProps.legend) || !isEqual(markerGroups, nextProps.markerGroups);
  }

  componentDidUpdate(prevProps) {
    const { clearAllMarkers, markerGroups } = this.props;
    if (clearAllMarkers) {
      this.resetMap();
      this.addMapLayersOnStyleLoaded(markerGroups);
    } else {
      if (!isEqual(prevProps.markerGroups, markerGroups)) {
        this.addMapLayersOnStyleLoaded(markerGroups);
      }
    }
  }

  gotRef = (el) => {
    const { attributionControlPosition } = this.props;
    if (el && !this.map) {
      this.map = new mapboxgl.Map({
        container: el,
        style: MAPBOX_STYLE,
        zoom: MAP_INFO.ZOOM1,
        center: [MAP_INFO.CENTER_LNG, MAP_INFO.CENTER_LAT],
        attributionControl: false,
        interactive: true,
        scrollZoom: false,
      });
      this.map.addControl(new mapboxgl.AttributionControl(), attributionControlPosition);
      this.map.addControl(new mapboxgl.NavigationControl(), 'top-left');
    }
  };

  getUrl(marker) {
    if (marker.kind === 'CR') {
      return `/complaint/${marker.id}/`;
    } else if (marker.kind === 'FORCE') {
      return `/trr/${marker.id}/`;
    }
  }

  markerUid(marker) {
    return `${ marker.kind }-${ marker.id }`;
  }

  handleMarkerClick = e => {
    const eventFeature = e.features[0];
    const markerProperties = eventFeature.properties;

    const { handleClickCRMarker, handleClickTRRMarker } = this.props;
    if (markerProperties.kind === MAP_ITEMS.CR) {
      if (handleClickCRMarker) {
        handleClickCRMarker(markerProperties.id);
        handleClickTRRMarker(null);
        return;
      }
      browserHistory.push(markerProperties.url);
    } else if (markerProperties.kind === MAP_ITEMS.FORCE) {
      if (handleClickTRRMarker) {
        handleClickTRRMarker(markerProperties.id);
        handleClickCRMarker(null);
        return;
      }
      browserHistory.push(markerProperties.url);
    }
  };

  openTooltip = e => {
    const eventFeature = e.features[0];
    const coordinates = eventFeature.geometry.coordinates.slice();
    const markerProperties = eventFeature.properties;

    const tooltip = (
      <MarkerTooltip
        date={ markerProperties.date }
        category={ markerProperties.category }
        url={ markerProperties.url }
      />
    );

    this.tooltip.setLngLat(coordinates)
      .setHTML(ReactDOMServer.renderToString(tooltip))
      .addTo(this.map);
  };

  mapMarkersData(markers) {
    const data = [];
    (markers || []).forEach((marker, index) => {
      const markerUid = this.markerUid(marker);
      if (!this.currentMarkers.has(markerUid)) {
        this.currentMarkers.add(markerUid);
        data.push({
          type: 'Feature',
          properties: {
            id: marker.id,
            kind: marker.kind,
            pointType: marker.pointType || marker.kind,
            date: marker.date,
            category: marker.category,
            url: this.getUrl(marker),
          },
          geometry: {
            type: 'Point',
            coordinates: [marker.point.lon, marker.point.lat],
          },
          id: index,
        });
      }
    });
    return data;
  }

  initMapData() {
    this.layerNames = [];
    this.currentMarkers = new Set();
    this.mapboxglLayerIndex = 0;
    this.firstLayer = {};
    this.hoveredState = {};
  }

  resetMap() {
    if (this.map.isStyleLoaded()) {
      this.layerNames.forEach((layerName) => {
        this.map.removeLayer(layerName);
        this.map.removeSource(layerName);
      });
    }
    this.initMapData();
  }

  addMapLayersOnStyleLoaded(markerGroups) {
    if (this.map.isStyleLoaded()) {
      this.addMapLayers(markerGroups);
    } else {
      this.map.on('idle', () => {
        this.addMapLayers(markerGroups);
      });
    }
  }

  addMapLayers(markerGroups) {
    Object.keys(markerGroups).forEach(
      (layerType) => this.addMapLayer(layerType, markerGroups[layerType])
    );
  }

  addMarkerHoverState(layerName, id) {
    this.removeMarkerHoverState();
    this.hoveredState = { source: layerName, id: id };
    this.map.setFeatureState(this.hoveredState, { hover: true });
  }

  removeMarkerHoverState() {
    if (!isEmpty(this.hoveredState)) {
      this.map.setFeatureState(this.hoveredState, { hover: false });
      this.hoveredState = {};
    }
  }

  addMapLayer(layerType, markers) {
    const markersData = this.mapMarkersData(markers);
    if (isEmpty(markersData))
      return;

    const layerName = `layer-${this.mapboxglLayerIndex}`;

    this.map.addSource(layerName, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: markersData,
      },
    });

    const aboveLayerName = layerType !== 'trrs' ? this.firstLayer['trrs'] || this.firstLayer[layerType] : undefined;
    this.map.addLayer({
      id: layerName,
      type: 'circle',
      paint: MAPBOXGL_POINT_STYLE,
      source: layerName,
    }, aboveLayerName);

    if (!this.firstLayer[layerType]) {
      this.firstLayer[layerType] = layerName;
    }

    this.layerNames.push(layerName);

    if (isMobile.tablet) {
      this.map.on('click', layerName, this.openTooltip);
    } else {
      this.map.on('mouseenter', layerName, (e) => {
        this.map.getCanvas().style.cursor = 'pointer';
        this.addMarkerHoverState(layerName, e.features[0].id);
        this.openTooltip(e);
      });

      this.map.on('mouseleave', layerName, () => {
        this.map.getCanvas().style.cursor = '';
        this.removeMarkerHoverState();
        this.tooltip.remove();
      });

      this.map.on('click', layerName, this.handleMarkerClick);
    }

    this.mapboxglLayerIndex += 1;
  }

  render() {
    const { mapCustomClassName, legend, showLegends, geographicDataLoading } = this.props;

    return (
      <div className={ cx(styles.map, mapCustomClassName) }>
        <div ref={ this.gotRef } className='map-tab'/>
        {
          showLegends ?
            <Legend legend={ legend } /> :
            geographicDataLoading && <LoadingSpinner className='data-loading-spinner' />
        }
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
  markerGroups: PropTypes.shape({
    crs: PropTypes.arrayOf(
      PropTypes.shape({
        point: PropTypes.shape({
          lat: PropTypes.number,
          lon: PropTypes.number,
        }),
        kind: PropTypes.string,
        pointType: PropTypes.string,
        finding: PropTypes.string,
        id: PropTypes.string,
        date: PropTypes.string,
        category: PropTypes.string,
      })
    ),
    trrs: PropTypes.arrayOf(
      PropTypes.shape({
        point: PropTypes.shape({
          lat: PropTypes.number,
          lon: PropTypes.number,
        }),
        kind: PropTypes.string,
        id: PropTypes.string,
        date: PropTypes.string,
        category: PropTypes.string,
      })
    ),
  }),
  handleClickCRMarker: PropTypes.func,
  handleClickTRRMarker: PropTypes.func,
  clearAllMarkers: PropTypes.bool,
  showLegends: PropTypes.bool,
  geographicDataLoading: PropTypes.bool,
  attributionControlPosition: PropTypes.string,
};

AllegationsMap.defaultProps = {
  legend: {},
  markerGroups: {
    crs: [],
    trrs: [],
  },
  clearAllMarkers: true,
  showLegends: true,
  attributionControlPosition: 'bottom-right',
};
export const AllegationsMapWithSpinner = withLoadingSpinner(AllegationsMap, styles.allegationMapLoading);
