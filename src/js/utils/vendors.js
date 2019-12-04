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

if (config.appEnv === 'live-test' || global.mocha !== undefined) {
  const addSourceSpy = spy();
  const getSourceStub = stub().returns(undefined);
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
    }
    on() {
      if (includes(['load', 'idle'], arguments[0])) {
        arguments[arguments.length - 1]();
      }
    }
  }

  class MockMarker {
    constructor() {
      this.setLngLat = setLngLatStub;
      this.addTo = addToStub;
      this.setPopup = setPopupStub;
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
  _mapboxgl._addLayerSpy = addLayerSpy;
  _mapboxgl._getLayerStub = getLayerStub;
  _mapboxgl._setFilterSpy = setFilterSpy;
  _mapboxgl._addControlStub = addControlStub;
  _mapboxgl._removeSpy = removeSpy;
  _mapboxgl._setLngLatStub = setLngLatStub;
  _mapboxgl._setHTMLStub = setHTMLStub;
  _mapboxgl._addToStub = addToStub;
  _mapboxgl._setFeatureState = setFeatureStateSpy;
  _mapboxgl._isStyleLoaded = isStyleLoadedStub;
  _mapboxgl.NavigationControl = navigationControlSpy;
  _mapboxgl.AttributionControl = attributionControlSpy;

  _mapboxgl._resetHistory = () => {
    mapboxgl._addSourceSpy.resetHistory();
    mapboxgl._getSourceStub.resetHistory();
    mapboxgl._addLayerSpy.resetHistory();
    mapboxgl._getLayerStub.resetHistory();
    mapboxgl._setFilterSpy.resetHistory();
    mapboxgl._addControlStub.resetHistory();
    mapboxgl._removeSpy.resetHistory();
    mapboxgl._setLngLatStub.resetHistory();
    mapboxgl._setHTMLStub.resetHistory();
    mapboxgl._addToStub.resetHistory();
    mapboxgl._isStyleLoaded.resetHistory();
    mapboxgl._setFeatureState.resetHistory();
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
  const cssTransitionSpy = stub();
  cssTransitionSpy.returnsArg(0);
  _Toastify = {
    toast: toastSpy,
    cssTransition: cssTransitionSpy,
  };
}

export const mapboxgl = _mapboxgl;
export const Muuri = _Muuri;
export const Toastify = _Toastify;
