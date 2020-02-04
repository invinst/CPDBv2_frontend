import 'mapbox-gl.css';
import muuri from 'muuri';

/* istanbul ignore next */
import TwitterWidgetsLoader from 'twitter-widgets';
import _mapboxgl from 'mapbox-gl';
import * as _toastify from 'react-toastify';
import sinon from 'sinon';
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
  const addSourceSpy = sinon.spy();
  const getSourceStub = sinon.stub().returns(undefined);
  const addLayerSpy = sinon.spy();
  const getLayerStub = sinon.stub().returns(undefined);
  const setFilterSpy = sinon.spy();
  const addControlStub = sinon.stub();
  const navigationControlSpy = sinon.spy();
  const attributionControlSpy = sinon.spy();
  const removeSpy = sinon.spy();
  const easeToSpy = sinon.spy();
  const getZoomStub = sinon.stub();
  const setLngLatStub = sinon.stub().returnsThis();
  const setHTMLStub = sinon.stub().returnsThis();
  const setPopupStub = sinon.stub().returnsThis();
  const addToStub = sinon.stub().returnsThis();
  const isStyleLoadedStub = sinon.stub();
  const resizeSpy = sinon.spy();
  const removeLayerSpy = sinon.spy();
  const removeSourceSpy = sinon.spy();
  const getCanvasSpy = sinon.stub().returns({ style: { cursor: undefined } });
  const setFeatureStateSpy = sinon.spy();
  const setMaxBoundsSpy = sinon.spy();
  const getBoundsSpy = sinon.spy();
  const dragPanSpy = {
    enable: sinon.spy(),
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
  const muuriAdd = sinon.spy();
  const muuriRemove = sinon.spy();
  const muuriDestroy = sinon.spy();
  const muuriOn = sinon.spy();
  class MuuriClass {
    constructor() {
      this.add = muuriAdd;
      this.remove = muuriRemove;
      this.on = muuriOn;
      this.destroy = muuriDestroy;
    }
  }

  _Muuri = MuuriClass;

  const toastSpy = sinon.spy();
  const cssTransitionStub = sinon.stub();
  cssTransitionStub.returnsArg(0);
  toastSpy.dismiss = sinon.spy();
  _Toastify = {
    toast: toastSpy,
    cssTransition: cssTransitionStub,
  };
}

export const mapboxgl = _mapboxgl;
export const Muuri = _Muuri;
export const Toastify = _Toastify;
