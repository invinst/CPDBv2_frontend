import 'mapbox-gl.css';
import muuri from 'muuri';

/* istanbul ignore next */
import TwitterWidgetsLoader from 'twitter-widgets';
import _mapboxgl from 'mapbox-gl';
import * as _toastify from 'react-toastify';
import { spy, stub } from 'sinon';
import { includes } from 'lodash';

import config from 'config';
import { MAPBOX_ACCESS_TOKEN } from 'utils/constants';

let _Muuri = muuri;
let _Toastify = _toastify;

export function loadTwitter(cb) {
  if (global.Mocha !== undefined) {
    const mockTwttr = {
      widgets: {
        createTimeline: () => {},
      },
    };
    cb(mockTwttr);
  } else {
    /* istanbul ignore next */
    TwitterWidgetsLoader.load(cb);
  }
}

_mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

if (config.appEnv === 'integration-test' || global.mocha !== undefined) {
  const addSourceSpy = spy();
  const getSource = (source) => source === 'unknown source' ? undefined : source;
  const getSourceStub = spy(getSource);
  const addLayerSpy = spy();
  const getLayerStub = stub().returns(undefined);
  const setFilterSpy = spy();
  const addControlStub = stub();
  const navigationControlSpy = spy();
  const attributionControlSpy = spy();
  const removeSpy = spy();
  const easeToSpy = spy();
  const getZoomStub = stub();
  const setLngLatStub = stub().returnsThis();
  const setHTMLStub = stub().returnsThis();
  const setPopupStub = stub().returnsThis();
  const addToStub = stub().returnsThis();
  const isStyleLoadedStub = stub();
  const resizeSpy = spy();
  const removeLayerSpy = spy();
  const removeSourceSpy = spy();
  const getCanvasSpy = stub().returns({ style: { cursor: undefined } });
  const setFeatureStateSpy = spy();
  const setMaxBoundsSpy = spy();
  const getBoundsSpy = spy();
  const dragPanSpy = {
    enable: spy(),
  };

  class MockMap {
    constructor() {
      this.addSource = addSourceSpy;
      this.getSource = getSourceStub;
      this.getZoom = getZoomStub;
      this.addLayer = addLayerSpy;
      this.easeTo = easeToSpy;
      this.getLayer = getLayerStub;
      this.setFilter = setFilterSpy;
      this.addControl = addControlStub;
      this.remove = removeSpy;
      this.resize = resizeSpy;
      this.isStyleLoaded = isStyleLoadedStub;
      this.removeLayer = removeLayerSpy;
      this.removeSource = removeSourceSpy;
      this.getCanvas = getCanvasSpy;
      this.setFeatureState = setFeatureStateSpy;
      this.setMaxBounds = setMaxBoundsSpy;
      this.getBounds = getBoundsSpy;
      this.dragPan = dragPanSpy;
    }
    on() {
      if (includes(['load', 'idle'], arguments[0])) {
        arguments[arguments.length - 1]();
      }
    }
  }

  class MockMarker {
    constructor(element) {
      this.setLngLat = setLngLatStub;
      this.addTo = addToStub;
      this.setPopup = setPopupStub;
      this.element = element;
      this.remove = removeSpy;
    }
  }

  class MockPopup {
    constructor() {
      this.setLngLat = setLngLatStub;
      this.setHTML = setHTMLStub;
      this.addTo = addToStub;
      this.remove = removeSpy;
    }
  }

  _mapboxgl.Map = MockMap;
  _mapboxgl.Marker = MockMarker;
  _mapboxgl.Popup = MockPopup;
  _mapboxgl._addSourceSpy = addSourceSpy;
  _mapboxgl._getSourceStub = getSourceStub;
  _mapboxgl._getZoomStub = getZoomStub;
  _mapboxgl._addLayerSpy = addLayerSpy;
  _mapboxgl._easeToSpy = easeToSpy;
  _mapboxgl._getLayerStub = getLayerStub;
  _mapboxgl._setFilterSpy = setFilterSpy;
  _mapboxgl._addControlStub = addControlStub;
  _mapboxgl._removeSpy = removeSpy;
  _mapboxgl._resizeSpy = resizeSpy;
  _mapboxgl._isStyleLoadedStub = isStyleLoadedStub;
  _mapboxgl._removeLayerSpy = removeLayerSpy;
  _mapboxgl._removeSourceSpy = removeSourceSpy;
  _mapboxgl._setLngLatStub = setLngLatStub;
  _mapboxgl._getCanvasSpy = getCanvasSpy;
  _mapboxgl._setFeatureStateSpy = setFeatureStateSpy;
  _mapboxgl._setMaxBoundsSpy = setMaxBoundsSpy;
  _mapboxgl._getBoundsSpy = getBoundsSpy;
  _mapboxgl._dragPanSpy = dragPanSpy;
  _mapboxgl._setHTMLStub = setHTMLStub;
  _mapboxgl._addToStub = addToStub;
  _mapboxgl.NavigationControl = navigationControlSpy;
  _mapboxgl.AttributionControl = attributionControlSpy;

  _mapboxgl._resetHistory = () => {
    mapboxgl._addSourceSpy.resetHistory();
    mapboxgl._getSourceStub.resetHistory();
    mapboxgl._getZoomStub.resetHistory();
    mapboxgl._addLayerSpy.resetHistory();
    mapboxgl._easeToSpy.resetHistory();
    mapboxgl._getLayerStub.resetHistory();
    mapboxgl._setFilterSpy.resetHistory();
    mapboxgl._addControlStub.resetHistory();
    mapboxgl._removeSpy.resetHistory();
    mapboxgl._resizeSpy.resetHistory();
    mapboxgl._isStyleLoadedStub.resetHistory();
    mapboxgl._removeLayerSpy.resetHistory();
    mapboxgl._removeSourceSpy.resetHistory();
    mapboxgl._setLngLatStub.resetHistory();
    mapboxgl._getCanvasSpy.resetHistory();
    mapboxgl._setFeatureStateSpy.resetHistory();
    mapboxgl._setMaxBoundsSpy.resetHistory();
    mapboxgl._getBoundsSpy.resetHistory();
    mapboxgl._dragPanSpy.enable.resetHistory();
    mapboxgl._setHTMLStub.resetHistory();
    mapboxgl._addToStub.resetHistory();
  };
}

if (global.mocha !== undefined) {
  const muuriAdd = spy();
  const muuriRemove = spy();
  const muuriDestroy = spy();
  const muuriOn = spy();
  class MuuriClass {
    constructor() {
      this.add = muuriAdd;
      this.remove = muuriRemove;
      this.on = muuriOn;
      this.destroy = muuriDestroy;
    }
  }

  _Muuri = MuuriClass;

  const toastSpy = spy();
  const cssTransitionStub = stub();
  cssTransitionStub.returnsArg(0);
  toastSpy.dismiss = spy();
  _Toastify = {
    toast: toastSpy,
    cssTransition: cssTransitionStub,
  };
}

export const mapboxgl = _mapboxgl;
export const Muuri = _Muuri;
export const Toastify = _Toastify;
