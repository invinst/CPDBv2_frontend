import 'mapbox-gl.css';
import muuri from 'muuri';

/* istanbul ignore next */
import TwitterWidgetsLoader from 'twitter-widgets';
import _mapboxgl from 'mapbox-gl';
import * as _toastify from 'react-toastify';
import { spy, stub } from 'sinon';

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
  const getSourceSpy = stub().returns(undefined);
  const addLayerSpy = spy();
  const getLayerSpy = stub().returns(undefined);
  const setFilterSpy = spy();
  const addControlSpy = spy();
  const navigationControlSpy = spy();
  const removeSpy = spy();
  const easeToSpy = spy();
  const getZoomStub = stub();
  const setLngLatSpy = spy();
  const setPopupSpy = spy();
  const addToSpy = spy();
  const resizeSpy = spy();

  class MockMap {
    constructor() {
      this.addSource = addSourceSpy;
      this.getSource = getSourceSpy;
      this.getZoom = getZoomStub;
      this.addLayer = addLayerSpy;
      this.easeTo = easeToSpy;
      this.getLayer = getLayerSpy;
      this.setFilter = setFilterSpy;
      this.addControl = addControlSpy;
      this.remove = removeSpy;
      this.resize = resizeSpy;
    }
    on() {
      arguments[arguments.length - 1]();
    }
  }

  class MockMarker {
    constructor() {
      this.setLngLat = setLngLatSpy;
      this.addTo = addToSpy;
      this.setPopup = setPopupSpy;
      this.remove = removeSpy;
    }
  }

  _mapboxgl.Map = MockMap;
  _mapboxgl.Marker = MockMarker;
  _mapboxgl._addSourceSpy = addSourceSpy;
  _mapboxgl._getSourceSpy = getSourceSpy;
  _mapboxgl._addLayerSpy = addLayerSpy;
  _mapboxgl._getLayerSpy = getLayerSpy;
  _mapboxgl._setFilterSpy = setFilterSpy;
  _mapboxgl._addControlSpy = addControlSpy;
  _mapboxgl._removeSpy = removeSpy;
  _mapboxgl.NavigationControl = navigationControlSpy;
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
